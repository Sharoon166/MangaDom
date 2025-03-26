  "use client";
  import Image from "next/image";
  import { useEffect, useState, use } from "react";
  import axios from "axios";
  import { Skeleton } from "@/components/ui/skeleton";
  import { Badge } from "@/components/ui/badge";
  import { ScrollArea } from "@/components/ui/scroll-area";
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
  import { Button } from "@/components/ui/button";
  import { Separator } from "@/components/ui/separator";
  import { Heart, Share2, ExternalLink, ArrowLeft } from "lucide-react";
  import Link from "next/link";
  import { useRouter } from "next/navigation";

  export default function CharacterPage({ params }) {
    const router = useRouter();
    const param = use(params);
    const charID = param.charID;
    const [character, setCharacter] = useState(null);
    const [mediaAppearances, setMediaAppearances] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchCharacter = async () => {
        try {
          setLoading(true);
          const response = await axios.get(
            `https://kitsu.io/api/edge/characters/${charID}`,
            {
              params: {
                "fields[characters]": "slug,names,canonicalName,malId,image,description,otherNames",
                "include": "mediaCharacters.media"
              },
            }
          );

          const characterData = response.data.data;
          if (characterData.attributes.description === null) {
            characterData.attributes.description = "No description available for this character.";
          }
          setCharacter(characterData);

          // Process included media appearances if available
          if (response.data.included) {
            const mediaData = response.data.included
              .filter(item => item.type === 'manga')
              .map(item => ({
                id: item.id,
                title: item.attributes.canonicalTitle || item.attributes.titles?.en_jp || 'Unknown Title',
                posterImage: item.attributes.posterImage?.medium || '/manga-placeholder.jpg',
                slug: item.attributes.slug
              }));
            setMediaAppearances(mediaData);
          }
        } catch (error) {
          console.error("Error fetching character data:", error);
          setError("Failed to load character data");
        } finally {
          setLoading(false);
        }
      };

      fetchCharacter();
    }, [charID]);

    if (loading) {
      return (
        <div className="min-h-screen p-8">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Image Skeleton */}
              <div className="w-full lg:w-1/3">
                <Skeleton className="w-full aspect-[2/3] rounded-xl" />
              </div>

              {/* Content Skeleton */}
              <div className="w-full lg:w-2/3 space-y-6">
                <Skeleton className="h-12 w-3/4 rounded-lg" />
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-4 w-5/6 rounded" />
                  <Skeleton className="h-4 w-4/5 rounded" />
                  <Skeleton className="h-4 w-3/4 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (error || !character) {
      return (
        <div className="min-h-screen flex items-center justify-center ">
          <Card className="w-full max-w-md bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-red-400">Error Loading Character</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-6">{error || "Character not found"}</p>
              <div className="flex gap-4">
                <Button onClick={() => window.location.reload()} variant="default">
                  Try Again
                </Button>
                <Button variant="outline" onClick={() => router.back()}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    const formatDescription = (text) => {
      if (!text) return "No description available.";
      return text.split('\n').map((paragraph, i) => (
        <p key={i} className="mb-4 last:mb-0">{paragraph}</p>
      ));
    };

    return (
      <div className="min-h-screen  text-gray-100">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb navigation */}
          <div className="mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => router.back()}
              className="text-gray-400 hover:text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">
            {/* Character Image Card */}
            <div className="w-full lg:w-1/3 xl:w-1/4">
              <Card className="bg-gray-800/60 border-gray-700 overflow-hidden">
                <div className="relative group">
                  <Image
                    src={character.attributes.image?.original || "/character-placeholder.jpg"}
                    alt={character.attributes.canonicalName || "Character"}
                    width={400}
                    height={600}
                    className="w-full aspect-[2/3] object-cover object-center h-full
                  "
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>

                <CardContent className="p-6">
                  <h1 className="text-2xl font-bold tracking-wide mb-4">
                    {character.attributes.canonicalName}
                  </h1>

                  <Separator className="my-4 bg-gray-700" />

                  <div className="space-y-4">
                    {character.attributes.names && (
                      <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-gray-400">Names</h3>
                        {character.attributes.names?.en && (
                          <div>
                            <span className="text-sm text-gray-400">English: </span>
                            <span className="text-sm">{character.attributes.names.en}</span>
                          </div>
                        )}
                        {character.attributes.names?.ja_jp && (
                          <div>
                            <span className="text-sm text-gray-400">Japanese: </span>
                            <span className="text-sm">{character.attributes.names.ja_jp}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {character.attributes.otherNames?.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-400 mb-2">Also Known As</h3>
                        <div className="flex flex-wrap gap-2">
                          {character.attributes.otherNames.map((name, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <Separator className="my-4 bg-gray-700" />

                  <div className="flex justify-between">
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      <Heart className="h-4 w-4 mr-2" /> Favorite
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      <Share2 className="h-4 w-4 mr-2" /> Share
                    </Button>
                  </div>

                  {character.attributes.malId && (
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <a
                        href={`https://myanimelist.net/character/${character.attributes.malId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" /> View on MyAnimeList
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Character Details */}
            <div className="w-full lg:w-2/3 xl:w-3/4">
              <Tabs defaultValue="about" className="w-full">
                <TabsList className="bg-gray-800/60 border-gray-700 mb-6">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="appearances">Appearances</TabsTrigger>
                  <TabsTrigger value="gallery">Gallery</TabsTrigger>
                </TabsList>

                <TabsContent value="about">
                  <Card className="bg-gray-800/60 border-gray-700">
                    <CardHeader>
                      <CardTitle>Character Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[calc(100vh-350px)] pr-4">
                        <div className="prose prose-invert max-w-none">
                          {formatDescription(character.attributes.description)}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="appearances">
                  <Card className="bg-gray-800/60 border-gray-700">
                    <CardHeader>
                      <CardTitle>Media Appearances</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {mediaAppearances.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                          {mediaAppearances.map((media) => (
                            <Link href={`/manga/${media.id}`} key={media.id}>
                              <div className="group bg-gray-900/60 rounded-lg overflow-hidden transition-transform hover:scale-105">
                                <div className="relative h-56">
                                  <Image
                                    src={media.posterImage}
                                    alt={media.title}
                                    fill
                                    className="object-cover transition-opacity group-hover:opacity-80"
                                  />
                                </div>
                                <div className="p-4">
                                  <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-blue-400">{media.title}</h3>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <p className="text-gray-400 text-lg">No media appearances found for this character.</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>              <TabsContent value="gallery">
                  <Card className="bg-gray-800/60 border-gray-700">
                    <CardHeader>
                      <CardTitle>Character Gallery</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <p className="text-gray-400">Gallery feature coming soon!</p>
                        <Button variant="outline" className="mt-4">Request Images</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Related Characters Section */}
              <Card className="bg-gray-800/60 border-gray-700 mt-6">
                <CardHeader>
                  <CardTitle>Related Characters</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-4">
                    <p className="text-gray-400">Related characters will be displayed here in the future.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
