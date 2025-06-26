
import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface AnniversaryCounterProps {
  startDate: string;
}

const AnniversaryCounter = ({ startDate }: AnniversaryCounterProps) => {
  const [timeData, setTimeData] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(startDate);
      const now = new Date();
      
      // Calculate the difference
      let years = now.getFullYear() - start.getFullYear();
      let months = now.getMonth() - start.getMonth();
      let days = now.getDate() - start.getDate();
      
      // Adjust for negative values
      if (days < 0) {
        months--;
        const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += lastMonth.getDate();
      }
      
      if (months < 0) {
        years--;
        months += 12;
      }
      
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      
      setTimeData({ years, months, days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  const timeUnits = [
    { value: timeData.years, label: 'Years', color: 'from-rose-500 to-pink-500' },
    { value: timeData.months, label: 'Months', color: 'from-pink-500 to-purple-500' },
    { value: timeData.days, label: 'Days', color: 'from-purple-500 to-indigo-500' },
    { value: timeData.hours, label: 'Hours', color: 'from-indigo-500 to-blue-500' },
    { value: timeData.minutes, label: 'Minutes', color: 'from-blue-500 to-cyan-500' },
    { value: timeData.seconds, label: 'Seconds', color: 'from-cyan-500 to-teal-500' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Time We've Been Together
        </h2>
        <div className="flex items-center justify-center gap-2 text-gray-600">
          <Heart className="text-rose-500" size={20} />
          <span className="text-lg">Since July 5th, 2021</span>
          <Heart className="text-rose-500" size={20} />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {timeUnits.map((unit, index) => (
          <div
            key={unit.label}
            className="relative group"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center transition-all duration-300 hover:shadow-xl hover:scale-105">
              <div className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${unit.color} bg-clip-text text-transparent mb-2`}>
                {unit.value.toString().padStart(2, '0')}
              </div>
              <div className="text-gray-600 font-medium text-sm md:text-base">
                {unit.label}
              </div>
            </div>
            
            {/* Floating heart animation */}
            <Heart 
              className="absolute -top-2 -right-2 text-rose-300 opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-300" 
              size={16} 
            />
          </div>
        ))}
      </div>

      <div className="text-center mt-12 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-pink-200">
        <p className="text-lg text-gray-700 mb-2">
          Every moment with you has been a blessing ✨
        </p>
        <p className="text-gray-600">
          Here's to many more years of love, laughter, and beautiful memories together
        </p>
      </div>
    </div>
  );
};

export default AnniversaryCounter;
