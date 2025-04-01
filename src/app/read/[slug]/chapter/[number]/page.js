"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Loading from "@/Loading";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

// Component to display manga chapter images
const ChapterContent = ({ chapterImages, dataSaver = false }) => {
  const [loadedImages, setLoadedImages] = useState([]);

  const handleImageLoad = (index) => {
    setLoadedImages((prev) => [...prev, index]);
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col items-center">
        {chapterImages.map((image, index) => (
          <div key={index} className="mb-4 w-full max-w-3xl relative">
            {!loadedImages.includes(index) && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                <div className="animate-pulse">
                  Loading image {index + 1}...
                </div>
              </div>
            )}
            <Image
              src={image}
              alt={`Page ${index + 1}`}
              width={dataSaver ? 800 : 1200}
              height={dataSaver ? 1200 : 1800}
              className="w-full h-auto"
              priority={index < 3}
              onLoad={() => handleImageLoad(index)}
              unoptimized={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const ChapterNavigation = ({
  prevChapter,
  nextChapter,
  mangaSlug,
  currentChapter,
  mangaTitle,
  allChapters,
}) => {
  const currentIndex = allChapters.findIndex(
    (ch) => ch.attributes.chapter === currentChapter
  );

  return (
    <div className="my-8 bg-background p-4 rounded-lg border shadow-lg z-10">
      <div className="flex justify-center mb-2">
        <span className="text-sm text-muted-foreground">
          {mangaTitle} - Chapter {currentChapter}
        </span>
      </div>

      <Pagination>
        <PaginationContent>
          {prevChapter ? (
            <PaginationItem>
              <PaginationPrevious
                href={`/read/${mangaSlug}/chapter/${prevChapter}`}
              />
            </PaginationItem>
          ) : (
            <PaginationItem>
              <PaginationPrevious
                href="#"
                className="pointer-events-none opacity-50"
              />
            </PaginationItem>
          )}

          {/* Previous chapters */}
          {currentIndex > 2 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {/* Show nearby chapters */}
          {allChapters
            .slice(Math.max(0, currentIndex - 1), currentIndex)
            .map((chapter) => (
              <PaginationItem key={chapter.id}>
                <PaginationLink
                  href={`/read/${mangaSlug}/chapter/${chapter.attributes.chapter}`}
                >
                  {chapter.attributes.chapter}
                </PaginationLink>
              </PaginationItem>
            ))}

          {/* Current chapter */}
          <PaginationItem>
            <PaginationLink isActive>{currentChapter}</PaginationLink>
          </PaginationItem>

          {/* Next chapters */}
          {allChapters
            .slice(currentIndex + 1, currentIndex + 2)
            .map((chapter) => (
              <PaginationItem key={chapter.id}>
                <PaginationLink
                  href={`/read/${mangaSlug}/chapter/${chapter.attributes.chapter}`}
                >
                  {chapter.attributes.chapter}
                </PaginationLink>
              </PaginationItem>
            ))}

          {currentIndex + 2 < allChapters.length && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {nextChapter ? (
            <PaginationItem>
              <PaginationNext
                href={`/read/${mangaSlug}/chapter/${nextChapter}`}
              />
            </PaginationItem>
          ) : (
            <PaginationItem>
              <PaginationNext
                href="#"
                className="pointer-events-none opacity-50"
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>

      <div className="flex justify-center mt-2">
        <Button asChild variant="outline">
          <Link href={`/manga/${mangaSlug}`}>Back to Details</Link>
        </Button>
      </div>
    </div>
  );
};

const ReaderSettings = ({
  dataSaver,
  setDataSaver,
  readingDirection,
  setReadingDirection,
}) => {
  return (
    <div className="flex justify-between items-center mb-6 p-4 bg-muted rounded-lg">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="data-saver"
            checked={dataSaver}
            onCheckedChange={setDataSaver}
          />
          <Label htmlFor="data-saver">Data Saver</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Label htmlFor="reading-direction">Reading Direction</Label>
          <select
            id="reading-direction"
            value={readingDirection}
            onChange={(e) => setReadingDirection(e.target.value)}
            className="bg-background border rounded-md px-3 py-1 text-sm"
          >
            <option value="vertical">Vertical</option>
            <option value="horizontal">Horizontal</option>
            <option value="rtl">Right to Left</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default function ChapterPage() {
  const params = useParams();
  const router = useRouter();
  const [mangaData, setMangaData] = useState(null);
  const [chapterData, setChapterData] = useState(null);
  const [chapterImages, setChapterImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataSaver, setDataSaver] = useState(false);
  const [readingDirection, setReadingDirection] = useState("vertical");
  const [allChapters, setAllChapters] = useState([]);
  const contentRef = useRef(null);
  const [retryCount, setRetryCount] = useState(0);

  async function findMangaBySlug(slug) {
    try {
      // First try direct lookup by slug
      const response = await fetch(
        `/api/manga/proxy?url=${encodeURIComponent(
          "https://api.mangadex.org/manga?originalLanguage[]=ja&availableTranslatedLanguage[]=en&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&includes[]=cover_art&includes[]=author&order[relevance]=desc&limit=5&title=" +
            slug
        )}`,
        {
          headers: {
            Accept: "application/json",
          },
          cache: "no-store",
          next: { revalidate: 60 }, // Revalidate every minute
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      if (data.data && data.data.length > 0) {
        const exactMatch = data.data.find(
          (manga) =>
            manga.attributes.title.en?.toLowerCase() ===
              slug.replace(/-/g, " ").toLowerCase() ||
            Object.values(manga.attributes.title).some(
              (title) =>
                title.toLowerCase() === slug.replace(/-/g, " ").toLowerCase()
            )
        );

        if (exactMatch) return exactMatch;
        return data.data[0];
      }

      // If not found, try searching with different parameters
      const fallbackResponse = await fetch(
        `https://api.mangadex.org/manga?originalLanguage[]=ja&availableTranslatedLanguage[]=en&includes[]=cover_art&includes[]=author&order[relevance]=desc&limit=5&title=${encodeURIComponent(
          slug.replace(/-/g, " ")
        )}`,
        {
          headers: {
            Accept: "application/json",
          },
          cache: "no-store",
        }
      );

      if (!fallbackResponse.ok) {
        throw new Error(`API error: ${fallbackResponse.status}`);
      }

      const fallbackData = await fallbackResponse.json();

      if (fallbackData.data && fallbackData.data.length > 0) {
        return fallbackData.data[0];
      }

      throw new Error("Manga not found");
    } catch (error) {
      console.error("Error in findMangaBySlug:", error);
      throw error;
    }
  }

  useEffect(() => {
    async function fetchChapterFromMangaDex() {
      try {
        setLoading(true);

        // Step 1: Find the manga by slug
        const manga = await findMangaBySlug(params.slug);
        const mangaId = manga.id;

        // Get manga title and cover
        const title =
          manga.attributes.title.en || Object.values(manga.attributes.title)[0];

        let coverFileName = null;
        const coverArt = manga.relationships.find(
          (rel) => rel.type === "cover_art"
        );
        if (coverArt) {
          coverFileName = coverArt.attributes?.fileName;
        }

        const coverUrl = coverFileName
          ? `https://uploads.mangadex.org/covers/${mangaId}/${coverFileName}`
          : null;

        setMangaData({
          id: mangaId,
          title,
          coverUrl,
        });

        // Step 2: Get chapters for this manga
        const chaptersResponse = await fetch(
          `https://api.mangadex.org/manga/${mangaId}/feed?translatedLanguage[]=en&order[volume]=asc&order[chapter]=asc&limit=100`,
          {
            headers: {
              Accept: "application/json",
            },
            cache: "no-store",
          }
        );

        if (!chaptersResponse.ok) {
          throw new Error(
            `Failed to fetch chapters: ${chaptersResponse.status}`
          );
        }

        const chaptersData = await chaptersResponse.json();

        if (!chaptersData.data || chaptersData.data.length === 0) {
          throw new Error("No chapters found");
        }

        // Filter to get only chapters with data
        const validChapters = chaptersData.data.filter(
          (chapter) =>
            chapter.attributes.pages > 0 && chapter.attributes.chapter
        );

        if (validChapters.length === 0) {
          throw new Error("No readable chapters found");
        }

        // Store all chapters for pagination
        setAllChapters(validChapters);

        // Find the requested chapter
        const chapterNumber = params.number;
        const chapterIndex = validChapters.findIndex(
          (chapter) => chapter.attributes.chapter === chapterNumber
        );

        if (chapterIndex === -1) {
          // If chapter not found, redirect to the first chapter
          const firstChapter = validChapters[0].attributes.chapter;
          router.replace(`/read/${params.slug}/chapter/${firstChapter}`);
          return;
        }

        const chapter = validChapters[chapterIndex];
        const chapterId = chapter.id;

        // Get previous and next chapter numbers
        const prevChapter =
          chapterIndex > 0
            ? validChapters[chapterIndex - 1].attributes.chapter
            : null;

        const nextChapter =
          chapterIndex < validChapters.length - 1
            ? validChapters[chapterIndex + 1].attributes.chapter
            : null;

        setChapterData({
          id: chapterId,
          title: chapter.attributes.title || `Chapter ${chapterNumber}`,
          number: chapterNumber,
          prevChapter,
          nextChapter,
          volume: chapter.attributes.volume,
          pages: chapter.attributes.pages,
        });

        // Step 3: Get chapter pages
        const pagesResponse = await fetch(
          `https://api.mangadex.org/at-home/server/${chapterId}`,
          {
            headers: {
              Accept: "application/json",
            },
            cache: "no-store",
          }
        );

        if (!pagesResponse.ok) {
          throw new Error(`Failed to fetch pages: ${pagesResponse.status}`);
        }

        const pagesData = await pagesResponse.json();

        if (!pagesData.chapter) {
          throw new Error("Chapter pages not found");
        }

        // Create full image URLs
        const baseUrl = pagesData.baseUrl;
        const chapterHash = pagesData.chapter.hash;

        // Choose between data-saver and regular quality
        const imageQuality = dataSaver ? "data-saver" : "data";
        const pageFilenames = dataSaver
          ? pagesData.chapter.dataSaver
          : pagesData.chapter.data;

        const imageUrls = pageFilenames.map(
          (filename) => `${baseUrl}/${imageQuality}/${chapterHash}/${filename}`
        );

        setChapterImages(imageUrls);
      } catch (error) {
        console.error("Error fetching chapter:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchChapterFromMangaDex();
  }, [params.slug, params.number, dataSaver, router, retryCount]);

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    setRetryCount((prev) => prev + 1);
  };

  if (loading) {
    return <Loading />;
  }

  if (error || !chapterData) {
    return (
      <div className="container mx-auto px-4 py-8 flex flex-col justify-center items-center min-h-screen">
        <div className="text-xl text-destructive mb-4">
          {error || "Chapter not found"}
        </div>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Button onClick={handleRetry}>Retry Loading</Button>
          <Button asChild>
            <Link href={`/manga/${params.slug}`}>Go to Manga Details</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
        <div className="mt-8 p-4 bg-muted rounded-lg max-w-lg text-center">
          <p className="text-sm text-muted-foreground">
            We're having trouble connecting to MangaDex. This could be due to
            network issues, API rate limiting, or the manga may not be
            available. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`container mx-auto px-4 py-8 ${
        readingDirection === "rtl" ? "rtl" : "ltr"
      }`}
      ref={contentRef}
    >
      <ReaderSettings
        dataSaver={dataSaver}
        setDataSaver={setDataSaver}
        readingDirection={readingDirection}
        setReadingDirection={setReadingDirection}
      />

      <h1 className="text-2xl font-bold mb-6 text-center">
        {mangaData?.title} - {chapterData.title}
      </h1>

      <ChapterContent chapterImages={chapterImages} dataSaver={dataSaver} />

      <ChapterNavigation
        prevChapter={chapterData.prevChapter}
        nextChapter={chapterData.nextChapter}
        mangaSlug={params.slug}
        currentChapter={chapterData.number}
        mangaTitle={mangaData?.title}
        allChapters={allChapters}
      />

      {/* Reading progress */}
      <div className="flex justify-center pointer-events-none">
        <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm">
          {chapterImages.length > 0
            ? `${chapterData.number} • ${chapterImages.length} Chapters`
            : "Loading pages..."}
        </div>
      </div>
    </div>
  );
}
