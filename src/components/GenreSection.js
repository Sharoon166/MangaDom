import { getMangaByGenre, getMangaData } from "@/lib/actions";
import GenreCarousel from "./GenreCarousel";
import { genreSections } from "@/constants";

const promises = genreSections.map((genre) => getMangaByGenre(genre.slug));
const GenreSection = async () => {
    const data = await Promise.all(promises);

  return data.map((genre,idx) => (
    <div key={idx}>
      <GenreCarousel genre={genreSections[idx].name} data={genre} />
    </div>
  ));
};

export default GenreSection;
