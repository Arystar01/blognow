'use client'
import React, { useState } from 'react'
import SearchBar from '@/app/components/SearchBar'
import Link from 'next/link'
import { HiMenuAlt4 } from 'react-icons/hi'
import { IoClose } from 'react-icons/io5'
import { useUser, useClerk, SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { FaUserCircle } from "react-icons/fa";


const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const { user } = useUser();
const { signOut } = useClerk();

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  const navLinks = [
    'Home',
    'Culture',
    'Economy',
    'Politics',
    'Science',
    'Technology',
    'Travel',
    'World',
    'About',
  ]

  const toggleMobileNav = () => setIsMobileNavOpen(!isMobileNavOpen)

  return (
    <>
      <nav className="fixed top-0 z-50 w-full flex justify-between items-center px-6 py-4 bg-white dark:bg-black text-black dark:text-white shadow-md h-28 border-b-gray-200">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-2xl sm:text-3xl">BlogNow</span>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex md:text-xl gap-6 text-2xl font-medium">
          {navLinks.map(link => {
            const path = link.toLowerCase() === 'home' ? '/' : `/${link.toLowerCase()}`
            return (
              <li key={link}>
                <Link href={path} className="hover:text-[#6c47ff] transition">
                  {link}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Search + Auth + Hamburger */}
        <div className="flex items-center gap-4 text-2xl">
          <SearchBar className="hidden md:block" />

          <SignedOut>
            <SignInButton mode="modal">
              <button className="text-sm font-medium text-[#6c47ff] hover:underline">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="bg-[#6c47ff] text-white rounded-full text-sm font-medium px-4 py-2 hover:bg-[#5834e0] transition">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="text-3xl focus:outline-none"
              >
                <FaUserCircle />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded shadow z-150">
                  <ul className="flex flex-col text-left text-sm">
                    <li>
                      <Link
                        href={`/profile/${user?.id}`}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setIsDropdownOpen(false);
                          signOut();
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </SignedIn>


          {/* Hamburger Icon - Mobile Only */}
          <button onClick={toggleMobileNav} className="md:hidden text-4xl">
            <HiMenuAlt4 />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-1/2 bg-white dark:bg-red-200 shadow-lg transform transition-transform duration-300 z-40 md:hidden ${isMobileNavOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        {/* Close Button */}
        <div className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-gray-700">
          <span className="font-bold text-xl">Menu</span>
          <button onClick={toggleMobileNav} className="text-3xl">
            <IoClose />
          </button>
        </div>

        {/* Mobile Nav Links */}
        <ul className="flex flex-col gap-4 text-lg font-medium p-6">
          {navLinks.map(link => {
            const path = link.toLowerCase() === 'home' ? '/' : `/${link.toLowerCase()}`
            return (
              <li key={link}>
                <Link
                  href={path}
                  onClick={toggleMobileNav}
                  className="transition block text-black dark:text-white hover:text-[#6c47ff]"
                >
                  {link}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Overlay */}
      {isMobileNavOpen && (
        <div
          onClick={toggleMobileNav}
          className="fixed inset-0  bg-opacity-50 z-30 md:hidden"
        />
      )}
    </>
  )
}

export default Navbar
