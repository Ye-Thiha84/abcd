
import { Heart, Camera } from 'lucide-react';

const PhotoGallery = () => {
  // Placeholder photos - using the available placeholder images
  const photos = [
    {
      id: 1,
      src: "two.jpg",
      caption: "Our first date"
    },
    {
      id: 2,
      src: "one.jpg",
      caption: "Working together"
    },
    {
      id: 3,
      src: "three.jpg",
      caption: "Lazy Sunday mornings"
    },
    {
      id: 4,
      src: "five.jpg",
      caption: "Our cozy home"
    },
    {
      id: 5,
      src: "seven.jpg",
      caption: "Anniversary dinner"
    },
    {
      id: 6,
      src: "six.jpg",
      caption: "Travel adventures"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Camera className="text-rose-500" size={32} />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Our Beautiful Memories
          </h2>
          <Camera className="text-rose-500" size={32} />
        </div>
        <p className="text-gray-600 text-lg">
          A collection of moments that make our love story special
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 text-white">
                  <Heart className="text-rose-400" size={16} />
                  <p className="font-medium">{photo.caption}</p>
                </div>
              </div>
            </div>

            {/* Floating heart */}
            <Heart 
              className="absolute top-4 right-4 text-white opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-300 drop-shadow-lg" 
              size={24} 
            />
          </div>
        ))}
      </div>

      <div className="text-center mt-12 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-pink-200">
        <p className="text-gray-700 text-lg">
          Each photo tells a story of our love 📸
        </p>
        <p className="text-gray-600 mt-2">
          These are placeholder images - replace them with your real memories!
        </p>
      </div>
    </div>
  );
};

export default PhotoGallery;
