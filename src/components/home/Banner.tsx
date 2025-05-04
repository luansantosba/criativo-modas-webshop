
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Banner as BannerType } from "@/lib/types";

interface BannerProps {
  banners: BannerType[];
}

const Banner: React.FC<BannerProps> = ({ banners }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Auto rotate banners every 5 seconds
    const intervalId = setInterval(() => {
      setActiveIndex((current) => (current + 1) % banners.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [banners.length]);

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % banners.length);
  };

  const goToPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? banners.length - 1 : current - 1
    );
  };

  return (
    <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
      {/* Banners */}
      <div className="absolute w-full h-full">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${banner.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white">
              <h2 className="text-2xl md:text-4xl font-bold mb-2">
                {banner.title}
              </h2>
              <p className="text-lg md:text-xl mb-4">{banner.subtitle}</p>
              <Button
                className="bg-white text-black hover:bg-gray-200"
                onClick={() => {
                  const element = document.querySelector(banner.link);
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Ver produtos
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/50 hover:bg-white/80 rounded-full"
        onClick={goToPrevious}
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/50 hover:bg-white/80 rounded-full"
        onClick={goToNext}
      >
        <ArrowRight className="h-6 w-6" />
      </Button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === activeIndex ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setActiveIndex(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Banner;
