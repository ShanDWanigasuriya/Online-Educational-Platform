import React from "react";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-black">
      <div className="border border-[#0000000e] dark:border-[#ffffff1e]" />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Social Links Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Social Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white flex items-center"
                >
                  <FaFacebookF className="mr-2" />
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white flex items-center"
                >
                  <FaTwitter className="mr-2" />
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white flex items-center"
                >
                  <FaInstagram className="mr-2" />
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.github.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white flex items-center"
                >
                  <FaGithub className="mr-2" />
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              About
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about">
                  <span className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white cursor-pointer">
                    Our Story
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy">
                  <span className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white cursor-pointer">
                    Privacy Policy
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/faq">
                  <span className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white cursor-pointer">
                    FAQ
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          {/* Quick Links Section */}
          <div className="col-span-1 md:col-span">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/courses">
                  <span className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white cursor-pointer">
                    Courses
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/profile">
                  <span className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white cursor-pointer">
                    My Account
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/course-dashboard">
                  <span className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white cursor-pointer">
                    Course Dashboard
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          {/* Contact Info Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Contact Info
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Call Us: +94 77 615 2536
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Address: SLIIT Malabe Campus, New Kandy Rd, Malabe 10115
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Mail Us: academyiq.lk@gmail.com
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-gray-300 dark:border-gray-800 text-center text-gray-600 dark:text-white">
          <p className="py-4">
            &copy; {new Date().getFullYear()} Academy IQ. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
