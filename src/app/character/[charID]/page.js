"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CharacterPage({ params }) {
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await axios.get(
          `https://kitsu.io/api/edge/characters/${params.charID}`,
          {
            params: {
              "fields[characters]":
                "slug,names,canonicalName,malId,image,description",
            },
          }
        );
        setCharacter(response.data.data);
      } catch (error) {
        console.error("Error fetching character data:", error);
      }
    };

    fetchCharacter();
  }, [params.charID]);

  if (!character)
    return (
      <div className="h-screen flex items-center justify-center">
        <div class="flex-col gap-4 w-full flex items-center justify-center">
          <div class="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
            <div class="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen text-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="md:px-20 flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-[20%] relative">
            <div className="sticky top-4">
              <Image
                src={character.attributes.image?.original || "/placeholder.jpg"}
                alt={character.attributes.canonicalName || "Character Image"}
                width={400}
                height={600}
                className="w-full max-w-[300px] mx-auto aspect-[9/16] rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gray-900/80 p-2 rounded-b-2xl">
                <h2 className="text-base font-semibold">
                  {character.attributes.canonicalName}
                </h2>
                <p className="text-xs text-gray-300">
                  {character.attributes.names.en}
                </p>
                <p className="text-xs text-gray-300">
                  {character.attributes.names.ja_jp}
                </p>
                {character.attributes.otherNames?.length > 0 && (
                  <div className="mt-1">
                    <p className="text-xs text-gray-300 font-semibold">
                      Other Names:
                    </p>
                    <ul className="text-xs text-gray-300 list-disc list-inside">
                      {character.attributes.otherNames.map((name, index) => (
                        <li key={index}>{name}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <p className="text-xxs text-gray-400 mt-1">
                  MAL ID: {character.attributes.malId}
                </p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[80%] space-y-8">
            <div className="px-4 py-6 backdrop-blur-sm bg-white/10 rounded-xl">
              <h1 className="text-4xl font-bangers tracking-wide font-semibold text-gray-200 drop-shadow-[0_0_10px_#fff7]">
                {character.attributes.canonicalName}
              </h1>
              <p className="mt-4 text-gray-300 leading-relaxed text-sm rounded-xl">
                {character.attributes.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
