"use client"
import React from "react";
import Link from "next/link";
import {
  FaUserCircle,
  FaTachometerAlt,
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaUpload,
} from "react-icons/fa";

const Sidebar = ({ user }) => {
  return (
    <div className="fixed h-full left-0 top-0 w-1/5 flex bg-purple-700 text-white flex-col p-4 rounded-r-lg">
      <div className="flex items-center space-x-4 p-4">
        <FaUserCircle size={36} />
        <div>
          <h2 className="font-semibold text-lg">{user.name}</h2>
          <p>REC</p>
        </div>
      </div>
      <nav className="flex-1 mt-4">
        <ul className="space-y-2">
          <li className="flex items-center p-2 hover:bg-purple-500 cursor-pointer">
            <FaTachometerAlt className="mr-2" />
            <Link href="/admin/dashboard" legacyBehavior>
              <a className="text-white">Dashboard</a>
            </Link>
          </li>
          <li className="flex items-center p-2 hover:bg-purple-500 cursor-pointer">
            <FaChalkboardTeacher className="mr-2" />
            <Link href="/admin/faculty" legacyBehavior>
              <a className="text-white">Add Achievement</a>
            </Link>
          </li>
          <li className="flex items-center p-2 hover:bg-purple-500 cursor-pointer">
            <FaCalendarAlt className="mr-2" />
            <Link href="/admin/event" legacyBehavior>
              <a className="text-white">Events</a>
            </Link>
          </li>
          <li className="flex items-center p-2 hover:bg-purple-500 cursor-pointer">
            <FaUpload className="mr-2" />
            <Link href="/admin/upload" legacyBehavior>
              <a className="text-white">Upload</a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

Sidebar.defaultProps = {
  user: {
    name: "Guest",
  },
};

export default Sidebar;
