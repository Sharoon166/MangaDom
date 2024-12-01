import Image from "next/image";
import { Calendar, Info, Shield, Star } from "lucide-react";
import { getMangaCharacters, getMangaData } from "@/lib/actions";
import Link from "next/link";
import Loading from "@/Loading"; // Importing Loading component

const MangaPage = async ({ params }) => {
  const { mangaName } = params;
  const manga = await getMangaData(mangaName);
  if (!manga) return <Loading />; // Using Loading component when manga is not found

  const characters = await getMangaCharacters(manga?.id);
  return (
    <div className="min-h-screen text-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="relative h-96 mb-12 rounded-3xl overflow-hidden shadow-2xl">
          <Image
            src={
              manga?.attributes?.coverImage?.original ||
              "/cover_placeholder.jpeg"
            }
            alt={`${manga.attributes.canonicalTitle} Cover`}
            className="object-cover object-center"
            fill
            placeholder="blur"
            blurDataURL="/cover_placeholder.jpeg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent"></div>
        </div>
        <div className="md:px-20 flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-[20%]">
            <Image
              src={manga?.attributes?.posterImage?.original}
              alt={`${manga.attributes.canonicalTitle} Poster`}
              width={400}
              height={600}
              className="w-full max-w-[300px] mx-auto aspect-[9/16] rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300"
            />
          </div>
          <div className="w-full lg:w-[80%] space-y-8">
            <div className="px-6 py-8 backdrop-blur-sm bg-white/10 rounded-xl">
              <h1 className="text-6xl font-bangers tracking-wide font-semibold text-gray-200 drop-shadow-[0_0_10px_#fff7]">
                {manga.attributes?.titles?.en}
              </h1>
              <p className="text-sm font-bangers">
                {manga.attributes?.titles?.ja_jp}
              </p>
              <p className="mt-8 text-gray-300 leading-relaxed text-lg rounded-xl line-clamp-6">
                {manga.attributes.synopsis}
              </p>
            
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-pink-500/30 to-blue-500/30 p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 backdrop-blur-md">
                <h2 className="text-lg font-semibold mb-2 flex items-center">
                  <Calendar className="mr-2 text-pink-400" size={20} />
                  Start Date
                </h2>
                <p className="text-gray-200 text-sm">
                  {manga.attributes.startDate}
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-500/30 to-indigo-500/30 p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 backdrop-blur-md">
                <h2 className="text-lg font-semibold mb-2 flex items-center">
                  <Info className="mr-2 text-blue-400" size={20} />
                  Status
                </h2>
                <p className="text-gray-200 text-sm">
                  {manga.attributes.status}
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-500/30 to-teal-500/30 p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 backdrop-blur-md">
                <h2 className="text-lg font-semibold mb-2 flex items-center">
                  <Shield className="mr-2 text-green-400" size={20} />
                  Age Rating
                </h2>
                <p className="text-gray-200 text-sm">
                  {manga.attributes.ageRating}
                </p>
              </div>
              <div className="bg-gradient-to-br from-yellow-500/30 to-orange-500/30 p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 backdrop-blur-md">
                <h2 className="text-lg font-semibold mb-2 flex items-center">
                  <Star className="mr-2 text-yellow-400" size={20} />
                  Average Rating
                </h2>
                <p className="text-gray-200 text-sm">
                  {manga.attributes.averageRating}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-3xl font-semibold font-bangers tracking-widest mb-4">
            Characters
          </h2>
          <div className="flex flex-wrap gap-6">
            
            {characters?.map((character) => (
              <Link
              href={`/character/${character?.id}`}
              key={character.id}
              className="rounded-lg relative group"
              >
              
                {character.attributes.image && (
                  <img
                    src={character.attributes.image.original}
                    alt={character.attributes.canonicalName}
                    className="w-40 aspect-[9/16] object-cover object-top rounded-lg"
                  />
                )}
                <div className="absolute bottom-0 left-0 right-0 h-full w-full bg-black/40 opacity-0 group-hover:opacity-100 group-hover:backdrop-blur-sm flex justify-center items-center font-semibold">
                  {character.attributes.canonicalName}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MangaPage;