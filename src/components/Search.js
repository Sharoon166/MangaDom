"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { SearchIcon } from "lucide-react";
import Link from "next/link";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  // Debounce API calls to avoid too many requests
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (query.length > 2) {
        const formattedQuery = query.replace(/\s+/g, '-'); // Replace spaces with hyphens
        console.log(formattedQuery)
        axios
          .get(`https://kitsu.io/api/edge/manga?filter[text]=${formattedQuery}`)
          .then((response) => setResults(response.data.data || []))
          .catch((error) => console.error("Error fetching manga:", error));
      } else {
        setResults([]);
      }
    }, 400);

    return () => clearTimeout(debounceTimeout);
  }, [query]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".search-container")) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative w-full sm:w-80 mb-4 search-container"
      onFocus={() => setIsFocused(true)}
    >
      {/* Search Input and Button */}
      <div className="flex items-center gap-2">
        <div className="px-2 flex-grow bg-gray-800 text-white rounded-lg flex items-center gap-2">
          <SearchIcon className="text-gray-400" />
          <input
            type="text"
            placeholder="Search manga..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="py-2 bg-transparent border-none focus:outline-none placeholder-gray-400 w-full transition duration-300 ease-in-out"
          />
        </div>
        <Link
          href={`/search/${query.replace(/\s+/g, '-')}`} // Replace spaces with hyphens in the link
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 hover:shadow-lg transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Search
        </Link>
      </div>

      {/* Dropdown Results */}
      {results.length > 0 && isFocused && (
        <div className="absolute mt-2 w-full bg-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto z-50 custom-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700 transition-all duration-300 ease-in-out">
          {results.map((manga) => (
            <Link
              href={`/manga/${manga.attributes.slug}`}
              key={manga.id}
              className="flex items-center p-2 hover:bg-gray-600 transition duration-200 ease-in-out"
              tabIndex={0} // Make link focusable for accessibility
              onClick={() => setIsFocused(false)} // Close dropdown on selection
            >
              <Image
                width={40}
                height={60}
                src={
                  manga.attributes.posterImage?.tiny ||
                  "/fallback-image.jpg" // Replace with a local fallback image
                }
                alt={manga.attributes.canonicalTitle || "Manga Image"}
                className="w-10 h-14 object-cover mr-2 rounded transition-transform duration-200 ease-in-out transform hover:scale-105"
              />
              <span className="text-white">
                {manga.attributes.canonicalTitle || "Unknown Title"}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
