const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Store Hours */}
          <div>
            <h3 className="text-xl font-bold mb-4">Store Hours</h3>
            <p className="text-gray-400">Sunday – Friday: 08h00 – 17h00</p>
            <p className="text-gray-400">Saturday: Closed</p>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-xl font-bold mb-4">Information</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Terms & Conditions</li>
              <li>Delivery & Returns</li>
              <li>Privacy Policy</li>
              <li>My Account</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Customer Service</h3>
            <p className="text-gray-400">+971-503842297</p>
            <p className="text-gray-400">info@juliastore.com</p>
            <p className="text-gray-400 mt-4">
              Office DMCC, Business Bay<br />
              Dubai, UAE
            </p>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-gray-500">
          © 2025 Dara Devtech. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
