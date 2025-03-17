from urllib.parse import urljoin
from bs4 import BeautifulSoup
from flask import Flask, request, jsonify
from flask_cors import CORS
import ssl
import socket
import requests
import datetime
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)  # Enable CORS

SQLI_PAYLOADS = [
    "' OR '1'='1",
    "' OR '1'='1' --",
    "' UNION SELECT null, version() --"
]
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:5173"],  
        "methods": ["POST", "OPTIONS"],  
        "allow_headers": ["Content-Type"] 
    }
})

load_dotenv()


SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
SENDER_EMAIL = os.getenv('EMAIL_ADDRESS')
SENDER_PASSWORD = os.getenv('EMAIL_PASSWORD')  



# Common XSS payloads
XSS_PAYLOADS = [
    "<script>alert('XSS')</script>",
    '"><script>alert(1)</script>',
    "<img src=x onerror=alert('XSS')>"
]

def send_phishing_email(recipient_email):
    try:
        msg = MIMEMultipart()
        msg['From'] = SENDER_EMAIL
        msg['To'] = recipient_email
        msg['Subject'] = "🎁 Amazon Mega Sale – 80% OFF! Today Only!🎉"

        # HTML Email Body
        body = """\
        <html>
        <body>
            <p>Dear Customer,</p>

            <p>Hurry! Amazon is offering an exclusive, limited-time sale – <b>up to 80% OFF</b> on all products! 🔥</p>

            <p><strong>🎁Special Offer for You:</strong></p>
            <ul>
                <li>✅ Get massive discounts on the latest collection</li>
                <li>🚚 Free shipping on orders above $50</li>
                <li>⏳ Hurry! Only available for the next 24 hours!</li>
            </ul>

            <p>🛒 Click below to claim your discount before it's too late!</p>

            <p><a href="https://example.com" style="background-color: #ff9900; color: white; padding: 10px 15px; text-decoration: none; font-weight: bold; border-radius: 5px;">👉 Claim Your Offer Now</a></p>

            <p><b>Don't miss out! This offer expires soon!</b></p>

            <hr>

            <p><strong>⚠️ Note:</strong> This email is part of a security awareness training exercise. Please do not click any links or provide any information.</p>

            <p>Regards,<br>CyberSecurity Team</p>
        </body>
        </html>
        """

        msg.attach(MIMEText(body, 'html'))  # Send email as HTML

        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(SENDER_EMAIL, SENDER_PASSWORD)
        server.send_message(msg)
        server.quit()

        return True
    except Exception as e:
        print(f"Error sending to {recipient_email}: {str(e)}")
        return False


@app.route('/send-emails', methods=['POST', 'OPTIONS'])
def send_emails():
    
    if request.method == 'OPTIONS':
        return '', 204

    try:
        data = request.get_json()
        emails = data.get('emails', [])
        
        if not emails:
            return jsonify({"message": "No email addresses provided"}), 400

        results = {
            "success": [],
            "failed": []
        }

        for email in emails:
            if send_phishing_email(email.strip()):
                results["success"].append(email)
            else:
                results["failed"].append(email)

        
        total = len(emails)
        success_count = len(results["success"])
        
        message = f"Successfully sent {success_count} out of {total} emails"
        if results["failed"]:
            message += f". Failed to send to {len(results['failed'])} recipients."

        return jsonify({
            "message": message,
            "results": results
        })

    except Exception as e:
        return jsonify({"message": f"Server error: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
    
def scan_ssl(url):
    try:
        if not url:
            return {"error": "URL is required"}, 400

        print(f"Received URL: {url}")  # Debugging

        # Extract hostname from URL
        hostname = url.replace("https://", "").replace("http://", "").split("/")[0]

        # SSL Scan Logic
        context = ssl.create_default_context()
        conn = context.wrap_socket(socket.socket(socket.AF_INET), server_hostname=hostname)
        conn.settimeout(5)  
        conn.connect((hostname, 443))
        cert = conn.getpeercert()

        # Extract certificate details
        valid_from = datetime.datetime.strptime(cert['notBefore'], "%b %d %H:%M:%S %Y GMT")
        valid_to = datetime.datetime.strptime(cert['notAfter'], "%b %d %H:%M:%S %Y GMT")
        issuer = dict(x[0] for x in cert["issuer"])["organizationName"]
        subject = dict(x[0] for x in cert["subject"])["commonName"]
        serial_number = cert.get("serialNumber", "N/A")

        # Check if the certificate is expired
        current_time = datetime.datetime.utcnow()
        is_secure = current_time < valid_to  

        response_data = {
            "domain": hostname,
            "valid_from": valid_from.strftime("%B %d, %Y"),
            "valid_to": valid_to.strftime("%B %d, %Y"),
            "issuer": issuer,
            "subject": subject,
            "serial_number": serial_number,
            "secure": is_secure
        }

        print(f"Response Data: {response_data}")  # Debugging
        return response_data, 200  # ✅ Return a dictionary and status code

    except socket.gaierror:
        return {"error": "Invalid domain name"}, 400
    except ssl.SSLError:
        return {"error": "SSL certificate error"}, 500
    except Exception as e:
        print(f"Error: {e}")  # Debugging
        return {"error": str(e)}, 500
    
def scan_sqli(url):
    """Scans the given URL and its forms for SQL Injection vulnerabilities."""
    vulnerabilities = []

    # Test URL parameters for SQL Injection
    for payload in SQLI_PAYLOADS:
        try:
            response = requests.get(url + "?test=" + payload, timeout=5)
            if "mysql" in response.text.lower() or "syntax" in response.text.lower():
                vulnerabilities.append({
                    "type": "URL Parameter",
                    "location": "test",
                    "payload": payload,
                    "vulnerable": True
                })
                break  # Stop after first match
        except requests.RequestException:
            pass

    # Test forms for SQL Injection
    try:
        response = requests.get(url, timeout=5)
        soup = BeautifulSoup(response.text, "html.parser")
        forms = soup.find_all("form")

        for form in forms:
            action = form.get("action")
            form_url = urljoin(url, action) if action else url
            inputs = form.find_all("input")

            for input_tag in inputs:
                input_name = input_tag.get("name")
                if input_name:
                    for payload in SQLI_PAYLOADS:
                        data = {input_name: payload}
                        test_response = requests.post(form_url, data=data)
                        if "mysql" in test_response.text.lower() or "syntax" in test_response.text.lower():
                            vulnerabilities.append({
                                "type": "Form Input",
                                "location": input_name,
                                "payload": payload,
                                "vulnerable": True
                            })
                            break  # Stop after first match
    except requests.RequestException:
        pass

    return {"sqli_vulnerabilities": vulnerabilities or []}, 200


def check_cors_misconfiguration(url):
    try:
        response = requests.options(url, timeout=5)  # Send an OPTIONS request
        cors_headers = {
            "Access-Control-Allow-Origin": response.headers.get("Access-Control-Allow-Origin", "Missing"),
            "Access-Control-Allow-Methods": response.headers.get("Access-Control-Allow-Methods", "Missing"),
            "Access-Control-Allow-Credentials": response.headers.get("Access-Control-Allow-Credentials", "Missing")
        }

        misconfigured = cors_headers["Access-Control-Allow-Origin"] == "*"

        return {
            "url": url,
            "cors_headers": cors_headers,
            "misconfigured": misconfigured,
            "message": "⚠️ CORS is misconfigured!" if misconfigured else "✅ CORS appears secure."
        }, 200

    except requests.RequestException as e:
        return {"error": f"Failed to fetch CORS headers: {e}"}, 500


def scan_xss(url):
    """ Scans the given URL and its forms for XSS vulnerabilities. """
    vulnerabilities = []

    # Test URL parameters for XSS
    for payload in XSS_PAYLOADS:
        try:
            response = requests.get(url + "?q=" + payload, timeout=5)
            if payload in response.text:
                vulnerabilities.append({
                    "type": "URL Parameter",
                    "location": "q",
                    "payload": payload,
                    "vulnerable": True
                })
                break  # Stop after first match
        except requests.RequestException:
            pass

    # Test forms for XSS
    try:
        response = requests.get(url, timeout=5)
        soup = BeautifulSoup(response.text, "html.parser")
        forms = soup.find_all("form")

        for form in forms:
            action = form.get("action")
            form_url = urljoin(url, action) if action else url
            inputs = form.find_all("input")

            for input_tag in inputs:
                input_name = input_tag.get("name")
                if input_name:
                    for payload in XSS_PAYLOADS:
                        data = {input_name: payload}
                        test_response = requests.post(form_url, data=data)
                        if payload in test_response.text:
                            vulnerabilities.append({
                                "type": "Form Input",
                                "location": input_name,
                                "payload": payload,
                                "vulnerable": True
                            })
                            break
    except requests.RequestException:
        pass

    return {"xss_vulnerabilities": vulnerabilities or []}, 200

def check_security_headers(url):
    
    SECURITY_HEADERS = [
    "Strict-Transport-Security",
    "Content-Security-Policy",
    "X-Frame-Options",
    "X-Content-Type-Options",
    "Referrer-Policy",
    "Permissions-Policy"
]
    try:
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        }
        response = requests.get(url, headers=headers, timeout=5, allow_redirects=True)
        site_headers = response.headers

        result = {"url": url, "headers": {}}

        for header in SECURITY_HEADERS:
            if header in site_headers:
                value = site_headers[header]
                if header == "Strict-Transport-Security" and "max-age" not in value:
                    result["headers"][header] = "Present but missing max-age"
                elif header == "Content-Security-Policy" and "default-src 'self'" not in value:
                    result["headers"][header] = "Weak policy - does not restrict default sources"
                else:
                    result["headers"][header] = value
            else:
                result["headers"][header] = "Missing"
        
        return result, 200
    
    except requests.exceptions.Timeout:
        return {"error": "Request Timed Out"}, 500
    except requests.exceptions.ConnectionError:
        return {"error": "Failed to connect to the server"}, 500
    except requests.exceptions.SSLError:
        return {"error": "SSL Certificate Error"}, 500
    except requests.exceptions.RequestException as e:
        return {"error": f"Error fetching headers: {e}"}, 500
        
    
@app.route("/scan", methods=["POST"])
def main():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid request format"}), 400

    scan_id = data.get("id")
    url = data.get("url")

    if not url or not scan_id:
        return jsonify({"error": "Missing parameters"}), 400

    try:
        scan_id = int(scan_id)  # Ensure scan_id is an integer
    except ValueError:
        return jsonify({"error": "Invalid ID format"}), 400

    # Process scan based on ID
    if scan_id == 1:
        response, status_code = scan_sqli(url)
        return jsonify(response), status_code
    elif scan_id == 2:
        response, status_code = scan_xss(url)
        return jsonify(response), status_code
    elif scan_id == 3:
        response, status_code = scan_ssl(url)
        return jsonify(response), status_code
    elif scan_id == 4:
         response, status_code = check_security_headers(url)
         return jsonify(response), status_code
    elif scan_id == 5:
        response, status_code = check_cors_misconfiguration(url)
        return jsonify(response), status_code
    elif scan_id == 6:
        return jsonify({"message": f"Scanning for Buffer Overflow on {url}"})
    else:
        return jsonify({"error": "Invalid vulnerability ID"}), 400

if __name__ == "__main__":
    app.run(debug=True)
