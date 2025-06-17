import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaSnapchat,
  FaHome,
  FaBuilding,
  FaGlobe,
  FaWalking,
  FaQrcode,
} from "react-icons/fa";
import { SiJusteat, SiQuora } from "react-icons/si";
import { MdRealEstateAgent } from "react-icons/md";

const fieldStyles = {
  Facebook: "bg-blue-100 text-blue-800 border-blue-300",
  Instagram: "bg-pink-100 text-pink-800 border-pink-300",
  Twitter: "bg-sky-100 text-sky-800 border-sky-300",
  LinkedIn: "bg-blue-200 text-blue-900 border-blue-400",
  YouTube: "bg-red-100 text-red-800 border-red-300",
  Snapchat: "bg-yellow-100 text-yellow-800 border-yellow-300",
  Housing: "bg-green-100 text-green-800 border-green-300",
  MagicBricks: "bg-purple-100 text-purple-800 border-purple-300",
  "99Acres": "bg-emerald-100 text-emerald-800 border-emerald-300",
  QuickerHomes: "bg-orange-100 text-orange-800 border-orange-300",
  "Just Lead": "bg-pink-200 text-pink-900 border-pink-400",
  Website: "bg-gray-100 text-gray-800 border-gray-300",
  "Direct/Walkin": "bg-indigo-100 text-indigo-800 border-indigo-300",
  "QR Code": "bg-zinc-100 text-zinc-800 border-zinc-300",
};

const socialMediaData = [
  { name: "Facebook", icon: <FaFacebookF />, customers: 58 },
  { name: "Instagram", icon: <FaInstagram />, customers: 45 },
  { name: "Twitter", icon: <FaTwitter />, customers: 32 },
  { name: "LinkedIn", icon: <FaLinkedin />, customers: 72 },
  { name: "YouTube", icon: <FaYoutube />, customers: 99 },
  { name: "Snapchat", icon: <FaSnapchat />, customers: 12 },
];

const thirdPartyData = [
  { name: "Housing", icon: <FaHome />, customers: 40 },
  { name: "MagicBricks", icon: <MdRealEstateAgent />, customers: 33 },
  { name: "99Acres", icon: <FaBuilding />, customers: 25 },
  { name: "QuickerHomes", icon: <SiQuora />, customers: 15 },
  { name: "Just Lead", icon: <SiJusteat />, customers: 22 },
];

const otherSourcesData = [
  { name: "Website", icon: <FaGlobe />, customers: 19 },
  { name: "Direct/Walkin", icon: <FaWalking />, customers: 27 },
  { name: "QR Code", icon: <FaQrcode />, customers: 11 },
];

const CardList = ({ title, data }) => (
  <div>
    <h3 className="text-sm font-semibold text-gray-700 mb-3">{title}</h3>
    <div className="flex flex-col gap-2">
      {data.map((item, index) => (
        <div
          key={index}
          className={`flex items-center justify-between border rounded-md p-2 text-xs shadow-sm hover:shadow-md transition ${
            fieldStyles[item.name] || "bg-white text-black border-gray-200"
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-white shadow text-[12px]">
              {item.icon}
            </div>
            <span className="font-medium">{item.name}</span>
          </div>
          <span className="font-bold">{item.customers}</span>
        </div>
      ))}
    </div>
  </div>
);

const SocialMediaStatus = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Leads from Source</h2>
        <select className="text-xs border border-gray-300 px-2 py-1 rounded-full outline-none hover:border-gray-400 transition">
          <option>Till Date</option>
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
        </select>
      </div>

      {/* Card Sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <CardList title="Social Profiles" data={socialMediaData} />
        <CardList title="Third Party" data={thirdPartyData} />
        <CardList title="Other Sources" data={otherSourcesData} />
      </div>
    </div>
  );
};

export default SocialMediaStatus;
