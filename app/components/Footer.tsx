import React from 'react';
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';

const SocialIcon = ({ Icon, href }) => (
    <a href={href} className="text-gray-400 hover:text-purple-500 transition-colors duration-300">
        <Icon className="h-6 w-6" />
    </a>
);

export const Footer = () => (
    <footer className="bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-purple-400">Nex-AI</h3>
                    <p className="text-gray-400">Empowering businesses with AI-driven insights and strategies.</p>
                </div>
                <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-purple-400">Quick Links</h4>
                    <ul className="space-y-2">
                        <li><a href="/" className="text-gray-400 hover:text-white transition-colors duration-300">Home</a></li>
                        <li><a href="/about" className="text-gray-400 hover:text-white transition-colors duration-300">About</a></li>
                        <li><a href="/services" className="text-gray-400 hover:text-white transition-colors duration-300">Services</a></li>
                        <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors duration-300">Contact</a></li>
                    </ul>
                </div>
                <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-purple-400">Connect with Us</h4>
                    <div className="flex space-x-4">
                        <SocialIcon Icon={FaFacebookF} href="#" />
                        <SocialIcon Icon={FaTwitter} href="#" />
                        <SocialIcon Icon={FaYoutube} href="#" />
                        <SocialIcon Icon={FaInstagram} href="#" />
                        <SocialIcon Icon={FaLinkedinIn} href="#" />
                        <SocialIcon Icon={FaGithub} href="#" />
                    </div>
                </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-800 text-center">
                <p className="text-gray-400">© 2024 Nex-AI. All rights reserved.</p>
            </div>
        </div>
    </footer>
);

export default Footer;