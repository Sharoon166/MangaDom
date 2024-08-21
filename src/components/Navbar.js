import React from "react";

import { PawPrint, BookOpen, Info } from "lucide-react";
import SearchBar from "./Search";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="search-container bg-gradient-to-r from-gray-800 to-gray-900 p-4 shadow-lg">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <Link href="/">
  <img src="/favicon.ico" alt="MangaDom" className="h-16 w-16 sm:mb-0" />        </Link>
        <SearchBar />
        <ul className="flex space-x-4 sm:space-x-6">
          <li>
            <Link
              href="https://animadom.vercel.app"
              className="text-white hover:text-yellow-300 transition-colors duration-300"
              title="Explore Anime Universe"
              target="_blank"
            >
              <PawPrint size={24} />{" "}
            </Link>
          </li>
          <li>
            <Link
              href="/genres"
              className="text-white hover:text-yellow-300 transition-colors duration-300"
              title="Discover Manga Genres"
            >
              <BookOpen size={24} />
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="text-white hover:text-yellow-300 transition-colors duration-300"
              title="Learn About MangaDom"
            >
              <Info size={24} />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
