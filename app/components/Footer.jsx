"use client";
import React from "react";
import { FaInstagram, FaTelegram, FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
// import DarkThem from "../../public/DarkThem.png"; 
import LightTheme from "../../public/LightTheme.png";

const Footer = () => {
    const navLinks = [
  'Home',
  'Education',
  'Health',
  'Science',
  'Technology',
  'Culture',
  'Entertainment',
  'Food',
  'Lifestyle',
  'Others',
  'About',
];

  return (
    <footer className="bg-black text-white pt-10 pb-6  px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
        {/* Logo & About */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left gap-4">
          <Image src={LightTheme} alt="Logo" width={96} height="auto" />
          <h1 className="text-3xl font-bold">BlogNow</h1>
          <p className="text-gray-400 text-sm">
            BlogNow is your go-to platform for fresh blogs and breaking headlines across culture, science, politics, travel, and more. Our mission is to inform, inspire, and ignite meaningful conversations—one article at a time.
          </p>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-center gap-4 text-3xl lg:items-start">
          <h2 className="text-lg font-semibold">Follow Us</h2>
          <div className="flex gap-4">
            <FaWhatsapp className="hover:text-green-400 cursor-pointer transition" />
            <FaTelegram className="hover:text-blue-400 cursor-pointer transition" />
            <FaInstagram className="hover:text-pink-400 cursor-pointer transition" />
          </div>
        </div>

        {/* Footer Pages */}
        <div className="flex flex-col gap-2 items-center lg:items-start">
          <h2 className="text-lg font-semibold">Links</h2>
          <Link href="/about-us" className="hover:text-gray-300 text-sm">About</Link>
          <Link href="/contact-us" className="hover:text-gray-300 text-sm">Contact</Link>
          <Link href="/privacy-us" className="hover:text-gray-300 text-sm">Privacy Policy</Link>
          <Link href="/term-us" className="hover:text-gray-300 text-sm">Terms of Service</Link>
        </div>

        {/* Categories */}
        <div className="flex flex-col gap-2 items-center lg:items-start">
          <h2 className="text-lg font-semibold">Categories</h2>
          <ul className="text-sm space-y-1">
            {navLinks.map((link) => {
              const path =
                link.toLowerCase() === "home"
                  ? "/"
                  : `/${link.toLowerCase()}`;
              return (
                <li key={link}>
                  <Link href={path} className="hover:text-[#6c47ff] transition">
                    {link}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-1 text-sm text-gray-400 items-center lg:items-start">
          <h2 className="text-lg font-semibold text-white mb-1">Location</h2>
          <p>Aerocity Financial Office, Delhi</p>
          <p>Email: aryanrastogi@google.com</p>
          <p>Phone: 9827826282</p>
          <p>Fax: 78987689</p>
        </div>
      </div>

      <div className="text-center text-gray-500 text-xs mt-10">
        © {new Date().getFullYear()} BlogNow. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
