import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h3 className="text-2xl font-bold mb-3"> PetAdopt</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            We connect loving families with pets in need of a home. 
            Every pet deserves love and care. Join us and make a difference!
          </p>
          <div className="flex gap-4 mt-5">
            <FaFacebook className="text-2xl hover:text-blue-400 cursor-pointer transition" />
            <FaTwitter className="text-2xl hover:text-sky-400 cursor-pointer transition" />
            <FaInstagram className="text-2xl hover:text-pink-400 cursor-pointer transition" />
            <FaYoutube className="text-2xl hover:text-red-400 cursor-pointer transition" />
          </div>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li className="flex items-center gap-2">
              <MdEmail className="text-blue-400 text-lg" />
              petadopt@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <MdPhone className="text-green-400 text-lg" />
              +880 1234-567890
            </li>
            <li className="flex items-center gap-2">
              <MdLocationOn className="text-red-400 text-lg" />
              Dhaka, Bangladesh
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Working Hours</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="flex justify-between">
              <span>Saturday - Thursday</span>
              <span>9:00 AM - 6:00 PM</span>
            </li>
            <li className="flex justify-between">
              <span>Friday</span>
              <span>Closed</span>
            </li>
          </ul>
          <div className="mt-5 p-3 bg-gray-800 rounded-lg text-sm text-gray-400">
             Over <span className="text-white font-bold">500+</span> pets adopted successfully!
          </div>
        </div>

      </div>
      <div className="border-t border-gray-700 py-4 text-center text-gray-500 text-sm">
        © 2025 PetAdopt. All rights reserved.
      </div>
    </footer>
  );
}