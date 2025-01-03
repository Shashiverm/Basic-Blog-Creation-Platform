//import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-blue-800 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Blog Maker</h3>
            <p className="text-blue-100">Share your stories with the world.</p>
            <div className="flex space-x-4">
              <a href="https://github.com/Shashiverm" className="hover:text-blue-200 transition-colors" target="_blank">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-blue-200 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/shashikantkumargaya/" className="hover:text-blue-200 transition-colors" target="_blank">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-blue-100 hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="/create" className="text-blue-100 hover:text-white transition-colors">Write a Post</a>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Newsletter</h3>
            <p className="text-blue-100">Stay updated with our latest posts.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-l-md w-full focus:outline-none text-gray-800"
              />
              <button
                type="submit"
                className="bg-blue-500 px-4 py-2 rounded-r-md hover:bg-blue-400 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-blue-500 mt-8 pt-8 text-center text-blue-100">
          <p>&copy; {new Date().getFullYear()} Blog App. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};



export default Footer;