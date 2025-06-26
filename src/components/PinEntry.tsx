
import { useState } from 'react';
import { Heart, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface PinEntryProps {
  onAuth: (success: boolean) => void;
}

const PinEntry = ({ onAuth }: PinEntryProps) => {
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (pin === '5721') {
        onAuth(true);
        toast({
          title: "Welcome to our love story! ❤️",
          description: "Access granted with love",
        });
      } else {
        toast({
          title: "Incorrect PIN",
          description: "Please try again",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Animated Hearts Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <Heart
              key={i}
              className="absolute text-rose-200 animate-pulse"
              size={Math.random() * 30 + 20}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                opacity: 0.3,
              }}
            />
          ))}
        </div>

        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-pink-200 relative z-10">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full">
                <Lock className="text-white" size={32} />
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent mb-2">
              Enter Our Secret
            </h1>
            <p className="text-gray-600">
              This special place is protected by our love code
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="pin" className="block text-sm font-medium text-gray-700 mb-2">
                Enter PIN
              </label>
              <Input
                id="pin"
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter 4-digit PIN"
                className="text-center text-lg tracking-widest border-pink-200 focus:border-rose-500 focus:ring-rose-500"
                maxLength={4}
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading || pin.length !== 4}
              className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Checking...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Heart size={20} />
                  Unlock Our Story
                </div>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Hint: Our special number ✨
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PinEntry;
