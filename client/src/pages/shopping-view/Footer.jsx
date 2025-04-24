import React from "react";
import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    // <footer className="bg-green-50 text-gray-700 py-10 px-4 md:px-16">
    //   <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-10 md:gap-20">
    //     {/* Brand Info */}
    //     <div className="md:w-1/2">
    //       <Link
    //         to="/shop/home"
    //         className="text-xl font-bold mb-3 flex items-center gap-1 cursor-pointer"
    //       >
    //         <Leaf className="h-6 w-6" />
    //         <span className="font-bold">VrakshEarth</span>
    //       </Link>
    //       <p className="text-sm">
    //         We bring nature to your doorstep with hand-picked plants and small
    //         trees, perfect for homes, offices, and gardens. Trusted by green
    //         lovers across the country, we make plant shopping simple, joyful,
    //         and eco-friendly.
    //       </p>
    //     </div>

    //     {/* Links Section */}
    //     <div className="flex flex-col sm:flex-row sm:gap-16 gap-8 justify-between sm:items-start">
    //       {/* Quick Links */}
    //       <div>
    //         <h3 className="text-base font-bold mb-3">Quick Links</h3>
    //         <ul className="space-y-2 text-sm cursor-pointer [&>li:hover]:text-red-500 [&>li:hover]:underline">
    //           <li>Contect Us</li>
    //           <li>
    //             <Link
    //               to="/shop/about"
    //               className="text-gray-700 hover:text-red-600"
    //             >
    //               About Us
    //             </Link>
    //           </li>
    //           <li>Privacy Policy</li>
    //           <li>Terms of Service</li>
    //         </ul>
    //       </div>

    //       {/* Need Help */}
    //       <div>
    //         <h3 className="text-base font-bold mb-3">Need help?</h3>
    //         <ul className="space-y-2 text-sm cursor-pointer [&>li:hover]:text-red-500 [&>li:hover]:underline">
    //           <li>Support</li>
    //           <li>Request a Demo</li>
    //           <li>FAQs</li>
    //           <li>Contact Form</li>
    //         </ul>
    //       </div>

    //       {/* Follow Us */}
    //       <div>
    //         <h3 className="text-base font-bold mb-3">Follow Us</h3>
    //         <ul className="space-y-2 text-sm cursor-pointer [&>li:hover]:text-red-500 [&>li:hover]:underline">
    //           <li>Instagram</li>
    //           <li>Twitter</li>
    //           <li>Facebook</li>
    //           <li>YouTube</li>
    //         </ul>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Footer Bottom */}
    //   <div className="border-t border-gray-300 mt-10 pt-5 text-center text-sm">
    //     Copyright 2025 © PlantBasket All Right Reserved.
    //   </div>
    // </footer>


<footer className="bg-green-50 text-gray-700 py-10 px-4 sm:px-8 lg:px-16">
  <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between gap-10 lg:gap-20">
    {/* Brand Info */}
    <div className="lg:w-1/2 space-y-4">
      <Link
        to="/shop/home"
        className="text-xl font-bold flex items-center gap-1 cursor-pointer"
      >
        <Leaf className="h-6 w-6" />
        <span className="font-bold">VrakshEarth</span>
      </Link>
      <p className="text-sm leading-relaxed">
        We bring nature to your doorstep with hand-picked plants and small trees,
        perfect for homes, offices, and gardens. Trusted by green lovers across
        the country, we make plant shopping simple, joyful, and eco-friendly.
      </p>
    </div>

    {/* Links Section */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:mt-0 w-full lg:w-1/2">
      {/* Quick Links */}
      <div>
        <h3 className="text-base font-bold mb-3">Quick Links</h3>
        <ul className="space-y-2 text-sm cursor-pointer [&>li:hover]:text-red-500 [&>li:hover]:underline">
          <li>Contact Us</li>
          <li>
            <Link to="/shop/about" className="text-gray-700 hover:text-red-600">
              About Us
            </Link>
          </li>
          <li>Privacy Policy</li>
          <li>Terms of Service</li>
        </ul>
      </div>

      {/* Need Help */}
      <div>
        <h3 className="text-base font-bold mb-3">Need help?</h3>
        <ul className="space-y-2 text-sm cursor-pointer [&>li:hover]:text-red-500 [&>li:hover]:underline">
          <li>Support</li>
          <li>Request a Demo</li>
          <li>FAQs</li>
          <li>Contact Form</li>
        </ul>
      </div>

      {/* Follow Us */}
      <div>
        <h3 className="text-base font-bold mb-3">Follow Us</h3>
        <ul className="space-y-2 text-sm cursor-pointer [&>li:hover]:text-red-500 [&>li:hover]:underline">
          <li>Instagram</li>
          <li>Twitter</li>
          <li>Facebook</li>
          <li>YouTube</li>
        </ul>
      </div>
    </div>
  </div>

  {/* Footer Bottom */}
  <div className="border-t border-gray-300 mt-10 pt-5 text-center text-sm">
    Copyright 2025 © VrakshEarth All Right Reserved.
  </div>
</footer>

  );
};

export default Footer;
