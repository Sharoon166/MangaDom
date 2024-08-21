import Carousal from "@/components/Carousel";
import GenreSection from "@/components/GenreSection";
import MustRead from "@/components/MustRead";

const page = async () => {
  return (
    <div>
      <Carousal />
      <div className="container mx-auto px-6">
        <MustRead />
        <GenreSection />        
  
      </div>
    </div>
  );
};

export default page;
