const Footer = () => {
    return (
        <footer className={'p-6 bg-gray-800 text-gray-300'}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">&copy; 2025 Clipote. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-sm hover:underline">Privacy Policy</a>
              <a href="#" className="text-sm hover:underline">Terms of Service</a>
              <a href="#" className="text-sm hover:underline">Support</a>
            </div>
          </div>
        </div>
      </footer>
    )
}

export default Footer;