import { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "./hooks/header.jsx";
import Main from "./hooks/main.jsx";
import Footer from "./hooks/footer.jsx";

const pageContent = {
  "/": {
    title: "Home",
    subtitle: "Welcome to Clipote - AI Text Summarization Tool",
  },
  "/form": {
    title: "Text Summarizer",
    subtitle: "Condense your text into clear, concise summaries.",
  },
  "/about": {
    title: "About Us",
    subtitle: "Our Mission and Technology",
    description: `Clipote is an innovative AI-driven platform that helps users extract 
      key insights from lengthy documents. Our technology ensures accurate 
      and efficient summarization across multiple content types.`,
  },
  "/contact": {
    title: "Contact Us",
    subtitle: "Get in touch with our team",
    contactInfo: {
      email: "support@clipote.com",
      phone: "+1 (555) 123-4567",
      address: "123 Tech Lane, Innovation City, CA 94000",
    },
  },
};

const Section = ({ children, className }) => (
  <section className={`max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg ${className}`}>
    {children}
  </section>
);

const App = () => {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  const currentPage = pageContent[location.pathname] || pageContent["/"];

  return (
    <div className={`min-h-screen flex flex-col transition-all duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <Header toggleDarkMode={() => setDarkMode(!darkMode)} />

      {/* Page Banner */}
      <div className="flex-grow px-6 sm:px-8 lg:px-12">
        <section className="text-center py-10">
          <h1 className="text-4xl font-bold">{currentPage.title}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">{currentPage.subtitle}</p>
        </section>

        {/* About Page Content */}
        {location.pathname === "/about" && (
          <Section>
            <p className="text-black-700 dark:text-black-300 leading-relaxed">{currentPage.description}</p>
          </Section>
        )}

        {/* Contact Page Content */}
        {location.pathname === "/contact" && (
          <Section>
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p><strong>Email:</strong> {currentPage.contactInfo.email}</p>
            <p><strong>Phone:</strong> {currentPage.contactInfo.phone}</p>
            <p><strong>Address:</strong> {currentPage.contactInfo.address}</p>
          </Section>
        )}

        {/* Main Component */}
        <main className="py-10">
          <Main />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default App;