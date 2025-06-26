
import { useState, useEffect } from 'react';
import PinEntry from '@/components/PinEntry';
import AnniversaryCounter from '@/components/AnniversaryCounter';
import PhotoGallery from '@/components/PhotoGallery';
import PhotoBooth from '@/components/PhotoBooth';
import { Heart, Sparkles } from 'lucide-react';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPhotoBooth, setShowPhotoBooth] = useState(false);

  useEffect(() => {
    // Check if user was previously authenticated
    const auth = localStorage.getItem('anniversary_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuth = (success: boolean) => {
    setIsAuthenticated(success);
    if (success) {
      localStorage.setItem('anniversary_auth', 'true');
    }
  };

  if (!isAuthenticated) {
    return <PinEntry onAuth={handleAuth} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100">
      {/* Header */}
      <header className="text-center py-12 px-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Heart className="text-rose-500 animate-pulse" size={32} />
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
            Our Love Story
          </h1>
          <Heart className="text-rose-500 animate-pulse" size={32} />
        </div>
        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
          Celebrating the beautiful journey of our love, starting from July 5th, 2021
        </p>
      </header>

      {/* Anniversary Counter */}
      <section className="px-4 mb-16">
        <AnniversaryCounter startDate="2021-06-26" />
      </section>

      {/* Navigation Buttons */}
      <section className="px-4 mb-16">
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <button
            onClick={() => setShowPhotoBooth(false)}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              !showPhotoBooth
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Heart size={20} />
              Photo Gallery
            </div>
          </button>
          <button
            onClick={() => setShowPhotoBooth(true)}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              showPhotoBooth
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Sparkles size={20} />
              Photo Booth
            </div>
          </button>
        </div>
      </section>

      {/* Content Area */}
      <section className="px-4 pb-16">
        {showPhotoBooth ? <PhotoBooth /> : <PhotoGallery />}
      </section>

      {/* Footer */}
      <footer className="text-center py-8 px-4 border-t border-pink-200 bg-white/50">
        <p className="text-gray-600">
          Made with <Heart className="inline text-rose-500" size={16} /> for our special day
        </p>
      </footer>
    </div>
  );
};

export default Index;
