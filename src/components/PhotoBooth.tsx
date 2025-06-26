
import { useState, useRef } from 'react';
import { Camera, Upload, Download, Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const PhotoBooth = () => {
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);
  const [isCamera, setIsCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCamera(true);
      }
    } catch (error) {
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please upload a photo instead.",
        variant: "destructive",
      });
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      setIsCamera(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Flip the image horizontally for selfie effect
        ctx.scale(-1, 1);
        ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
        
        const photoData = canvas.toDataURL('image/jpeg');
        setCapturedPhotos(prev => [photoData, ...prev]);
        
        toast({
          title: "Photo Captured! 📸",
          description: "Beautiful memory saved!",
        });
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setCapturedPhotos(prev => [result, ...prev]);
        toast({
          title: "Photo Uploaded! 📱",
          description: "Memory added to our collection!",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadPhoto = (photoData: string, index: number) => {
    const link = document.createElement('a');
    link.href = photoData;
    link.download = `anniversary-photo-${index + 1}.jpg`;
    link.click();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sparkles className="text-purple-500" size={32} />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Photo Booth
          </h2>
          <Sparkles className="text-purple-500" size={32} />
        </div>
        <p className="text-gray-600 text-lg">
          Capture new memories or upload your favorite photos
        </p>
      </div>

      {/* Camera/Upload Section */}
      <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-pink-200">
        <div className="text-center">
          {!isCamera ? (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={startCamera}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Camera className="mr-2" size={20} />
                  Start Camera
                </Button>
                
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Upload className="mr-2" size={20} />
                  Upload Photo
                </Button>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="relative inline-block rounded-2xl overflow-hidden shadow-2xl">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full max-w-md h-auto transform scale-x-[-1]"
                />
                <div className="absolute inset-0 border-4 border-gradient-to-r from-purple-500 to-pink-500 rounded-2xl pointer-events-none"></div>
              </div>
              
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={capturePhoto}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Camera className="mr-2" size={20} />
                  Capture
                </Button>
                
                <Button
                  onClick={stopCamera}
                  variant="outline"
                  className="border-gray-300 hover:bg-gray-50 font-semibold py-3 px-6 rounded-xl"
                >
                  Stop Camera
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Captured Photos */}
      {capturedPhotos.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Our Photo Booth Memories
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capturedPhotos.map((photo, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105"
              >
                <img
                  src={photo}
                  alt={`Captured photo ${index + 1}`}
                  className="w-full aspect-square object-cover"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-white">
                      <Heart className="text-rose-400" size={16} />
                      <span className="text-sm font-medium">Memory #{capturedPhotos.length - index}</span>
                    </div>
                    
                    <Button
                      onClick={() => downloadPhoto(photo, index)}
                      size="sm"
                      className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                    >
                      <Download size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default PhotoBooth;
