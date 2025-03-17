export function Footer() {
  return (
    <footer className="bg-gray-900 py-8">
      <div className="container mx-auto px-4 text-center text-gray-400">
        <p>© 2024 SecureScanner. All rights reserved.</p>
        <div className="flex items-center justify-center gap-4 mt-4">
          <a href="#privacy" className="hover:text-blue-400 transition-colors">
            Privacy Policy
          </a>
          <a href="#terms" className="hover:text-blue-400 transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
