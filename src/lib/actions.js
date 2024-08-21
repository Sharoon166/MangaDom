"use server";
import axios from "axios";

export async function getMangaData(mangaName) {
  try {
    const response = await axios.get("https://kitsu.io/api/edge/manga", {
      params: {
        "filter[text]": mangaName,
        "page[limit]": 1,
        "fields[manga]":
          "canonicalTitle,coverImage,startDate,endDate,averageRating,synopsis,chapterCount,volumeCount,titles,posterImage,status,ageRating,slug",
      },
    });
    return response.data.data[0];
  } catch (error) {
    console.error("Error fetching manga data:", error);
    return null;
  }
}

export async function getMangaByGenre(genre, limit = 14) {
  try {
    const response = await axios.get("https://kitsu.io/api/edge/manga", {
      params: {
        sort: "-userCount",
        "filter[genres]": genre,
        "page[limit]": limit,
        "fields[manga]":
          "titles,coverImage,posterImage,averageRating,synopsis,chapterCount,startDate,slug",
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching manga by genre:", error);
    return null;
  }
}

export async function getMangaCharacters(mangaId) {
  try {
    const mangaCharacters = await axios.get(
      `https://kitsu.io/api/edge/manga/${mangaId}/characters`,
      {
        params: {
          sort: "role",
          "page[limit]": 20,
          "fields[characters]": "id",
        },
      }
    );

    const promises = [];
    for (const character of mangaCharacters.data.data) {
      promises.push(
        axios.get(
          `https://kitsu.io/api/edge/media-characters/${character.id}/character`,
          {
            params: {
              "fields[characters]":
                "slug,names,canonicalName,malId,image",
            },
          }
        )
      );
    }
    const characterResponse = await Promise.all(promises);
    const characters = characterResponse.map(
      (character) => character.data.data
    );
    return characters;
  } catch (error) {
    console.error("Error fetching character data:", error);
    return null;
  }
}

export async function getTrendingManga() {
  try {
    const response = await axios.get(
      "https://kitsu.io/api/edge/trending/manga",
      {
        params: {
          limit: 10,
          "fields[manga]":
            "canonicalTitle,coverImage,startDate,averageRating,posterImage,chapterCount",
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching trending manga:", error);
    return null;
  }
}
