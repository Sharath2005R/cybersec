import { Mail, Linkedin, Github, User } from "lucide-react";

export function Contact() {
  return (
    <main className="flex-1">
      <section className="py-10">
        {" "}
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>{" "}
          <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg p-8 mb-6">
            {" "}
            <div className="flex items-center justify-center mb-6">
              {" "}
              <div className="text-center">
                <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Rohans S Martin</h3>
                <p className="text-gray-300 mb-3">Developer</p>
                <div className="flex items-center justify-center space-x-4">
                  <a
                    href="mailto:contact@securescanner.dev"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Mail className="w-6 h-6" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/rohans-s-martin-72aa261aa/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a
                    href="https://github.com/rohanssmartin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-gray-300">
                Have questions about our security scanning service? Feel free to
                reach out!
              </p>
            </div>
          </div>


          <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg p-8 mb-6">
            {" "}
            <div className="flex items-center justify-center mb-6">
              {" "}
              <div className="text-center">
                <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Nivea Sebastian</h3>
                <p className="text-gray-300 mb-3">Developer</p>
                <div className="flex items-center justify-center space-x-4">
                  <a
                    href="mailto:contact@securescanner.dev"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Mail className="w-6 h-6" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/rohans-s-martin-72aa261aa/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a
                    href="https://github.com/rohanssmartin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-gray-300">
                Have questions about our security scanning service? Feel free to
                reach out!
              </p>
            </div>
          </div>


          

          
          {/* Developer Card 2 */}
          <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg p-8">
            {" "}
            <div className="flex items-center justify-center mb-6">
              <div className="text-center">
                <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Sharath R</h3>
                <p className="text-gray-300 mb-3">Developer</p>
                <div className="flex items-center justify-center space-x-4">
                  <a
                    href="mailto:contact@securescanner.dev"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Mail className="w-6 h-6" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/sharath-r-ba1853288/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a
                    href="https://github.com/Sharath2005R"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-gray-300">
                Have questions about our security scanning service? Feel free to
                reach out!
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
