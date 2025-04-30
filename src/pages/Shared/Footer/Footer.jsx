import { Link } from "react-router-dom";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaYoutubeSquare,
  FaInstagramSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-100 to-white text-teal-700 pt-10 pb-6 px-4 md:px-16 shadow-inner">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold text-teal-600 mb-2">MedCamp</h2>
          <p className="text-sm text-gray-600">
            Bringing care closer to the community through well-organized medical
            camps.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center">
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-emerald-600">
                Home
              </Link>
            </li>
            <li>
              <Link to="/camps" className="hover:text-emerald-600">
                Available Camps
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-emerald-600">
                Join Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="text-center">
          <h4 className="font-semibold mb-3">Contact</h4>
          <p className="text-sm text-gray-600">Email: support@medcamp.org</p>
          <p className="text-sm text-gray-600">Phone: +880 1681-171757</p>
          <p className="text-sm text-gray-600">
            Location: Nikunja 2, Khilkhet, Dhaka
          </p>
        </div>

        {/* Social Media */}
        <div className="text-right">
          <h4 className="font-semibold mb-3">Follow Us</h4>
          <div className="flex space-x-4 text-xl justify-end">
            <a href="#" className="hover:text-blue-500" aria-label="Facebook">
              <FaFacebookSquare />
            </a>
            <a href="#" className="hover:text-sky-500" aria-label="Twitter">
              <FaTwitterSquare />
            </a>
            <a href="#" className="hover:text-red-500" aria-label="YouTube">
              <FaYoutubeSquare />
            </a>
            <a href="#" className="hover:text-pink-600" aria-label="Instagram">
              <FaInstagramSquare />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center mt-10 text-sm text-gray-500 border-t pt-4">
        © {new Date().getFullYear()} MedCamp. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
