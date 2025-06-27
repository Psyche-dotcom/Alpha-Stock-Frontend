"use client";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";

const socialLinks = [
  { icon: <FaFacebookF />, url: "https://facebook.com" },
  { icon: <FaTwitter />, url: "https://twitter.com" },
  { icon: <FaInstagram />, url: "https://instagram.com" },
  { icon: <FaTiktok />, url: "https://tiktok.com" },
  { icon: <FaYoutube />, url: "https://youtube.com" },
];

export default function SocialIcons() {
  return (
    <div className="bg-white rounded-xl px-6 py-3 flex gap-4 items-center shadow-sm">
      {socialLinks.map(({ icon, url }, index) => (
        <a
          key={index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#3d2a10] text-lg hover:scale-110 transition-transform"
        >
          {icon}
        </a>
      ))}
    </div>
  );
}
