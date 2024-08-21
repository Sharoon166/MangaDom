"use client";
import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { Calendar, ChevronLeft, ChevronRight, Star } from "lucide-react";
import Link from "next/link";

const GenreCarousel = ({ genre, data }) => {
  console.log(genre)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    slidesToScroll: 2,
    containScroll: "trimSnaps",
    align: "center",
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative embla">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold">{genre}</h2>
        <div className="flex space-x-2 z-10">
          <button
            className={`p-2 bg-gray-800 text-white rounded-full shadow-lg transition-opacity duration-300 ${
              !prevBtnEnabled ? "opacity-50" : "hover:bg-gray-700"
            }`}
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}>
            <ChevronLeft />
          </button>
          <button
            className={`p-2 bg-gray-800 text-white rounded-full shadow-lg transition-opacity duration-300 ${
              !nextBtnEnabled ? "opacity-50" : "hover:bg-gray-700"
            }`}
            onClick={scrollNext}
            disabled={!nextBtnEnabled}>
            <ChevronRight />
          </button>
        </div>
      </div>

      <div className="embla__viewport overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex">
          {data?.map((manga, index) => (
            <Link
              href={`/manga/${manga?.attributes?.slug}`}
              className="embla__slide flex-shrink-0 w-[200px] p-4"
              key={manga.id}>
              <div className="relative embla__slide__inner h-full overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Image
                  src={manga?.attributes?.posterImage?.original}
                  alt={manga?.attributes?.canonicalTitle}
                  width={300}
                  height={450}
                  className="h-full rounded-lg object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-end p-4 text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <h2 className="font-semibold mb-2">
                    {manga?.attributes?.titles?.en ||
                      manga?.attributes?.canonicalTitle ||
                      "N/A"}
                  </h2>
                  <p className="text-sm mb-1 flex items-center gap-1">
                    <Star className="fill-yellow-400 stroke-none" />{" "}
                    {manga?.attributes.averageRating || "N/A"}
                  </p>
                  <p className="text-sm flex items-center gap-1">
                    <Calendar /> {manga?.attributes.startDate || "Unknown"}
                  </p>
                </div>
              </div>
            </Link>
          ))}
          <div
          
            className="embla__slide flex justify-center
          items-center w-[200px] p-4">
            <Link
              href={ `genre/${genre}`}
              className="text-[#0ACF83] transition-colors duration-300 font-semibold">
              <div className="border-2 border-current rounded-full p-2">
                <ChevronRight />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenreCarousel;
