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

  useEffect(() => {
    const debounceTime = setTimeout(() => {
      if (query.length > 2) {
        axios
          .get(`https://kitsu.io/api/edge/manga?filter[text]=${query}`)
          .then((response) => {
            setResults(response.data.data);
          })
          .catch((error) => console.error("Error fetching manga:", error));
      } else {
        setResults([]);
      }
    }, 400);

    return () => clearTimeout(debounceTime);
  }, [query]);

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
      className="relative w-full sm:w-auto mb-4 sm:mb-0 search-container"
      onBlur={() => {
        setTimeout(() => {
          setIsFocused(false);
        }, 100);
      }}>
      
      <div className="px-2 w-full sm:w-64 bg-gray-800 text-white rounded-lg flex items-center gap-2">
        <SearchIcon />
        <input
          type="text"
          placeholder="Search manga..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className="py-2 bg-transparent border-none focus:outline-none placeholder-gray-400"
        />
      </div>
      {results.length > 0 && isFocused && (
        <div className="custom-scroll absolute mt-2 w-full bg-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700 z-50">
          {results.map((manga) => (
            <Link
              href={`/manga/${manga.attributes.slug}`}
              key={manga.id}
              className="flex items-center p-2 hover:bg-gray-600 cursor-pointer"
              >
              <Image
                width={30}
                height={30}
                src={manga.attributes.posterImage.tiny}
                alt={manga.attributes.canonicalTitle}
                className="w-10 h-14 object-cover mr-2 rounded"
              />
              <span className="text-white">
                {manga.attributes.canonicalTitle}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
