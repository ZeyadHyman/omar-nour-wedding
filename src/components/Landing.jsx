import cardImage from "../assets/image.webp";
import leftFlowerDecoration from "../assets/leftFloweDecoration.webp";
import rightFlowerDecoration from "../assets/rightFloweDecoration.webp";
import RSVP from "./RSVP";
import GuestMessages from "./GuestMessages";
import { useState } from "react";
import { useEffect } from "react";

function Landing() {
  const weddingDetails = {
    date: "الأحد ٢٩ مارس ٢٠٢٦",
    time: "٨:٠٠ مساءً",
    venue: "قاعة السريا",
    location: "شارع ترعة الإسماعيلية، بهتيم، شبرا الخيمة",
    mapLink: "https://maps.app.goo.gl/68EGfQNf6QBxoZ6i7",
    embedSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3451.433644949624!2d31.2635458!3d30.1104025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145815554d94b673%3A0x553cb76480b0b6f8!2z2YLYp9i52Ycg2KfZhNiz2LHYp9mK2Kc!5e0!3m2!1sen!2seg!4v1766831527219!5m2!1sen!2seg"
  };

  const targetDate = new Date("2026-03-29T20:00:00").getTime(); // Adjusted to 8 PM local time

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center relative overflow-hidden py-8 bg-gradient-to-b from-[#fffaf5] to-[#f9f3eb]">
      {/* Decorative flowers */}
      <img src={leftFlowerDecoration} alt="" className="absolute top-0 left-0 w-32 md:w-48 opacity-70 rotate-[150deg] pointer-events-none select-none z-0" />
      <img src={rightFlowerDecoration} alt="" className="absolute top-0 right-0 w-32 md:w-48 opacity-70 rotate-[210deg] pointer-events-none select-none z-0" />
      <img src={leftFlowerDecoration} alt="" className="absolute bottom-0 left-0 w-24 md:w-36 opacity-40 rotate-45 pointer-events-none select-none z-0" />
      <img src={rightFlowerDecoration} alt="" className="absolute bottom-0 right-0 w-24 md:w-36 opacity-40 rotate-[-45deg] pointer-events-none select-none z-0" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 md:w-3 md:h-3 bg-[#e6d9b9]/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 20}s`
            }}
          />
        ))}
      </div>

      {/* Header Section */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-6xl mx-auto">
        <div className="mb-6">
          <div className="text-5xl md:text-7xl font-bold text-[#66564a] drop-shadow-lg mb-3 tracking-wider animate-fade-in">
            فرح
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-[#8b7355] mb-4 animate-fade-in delay-100">
            عمر ونور
          </h1>
        </div>

        {/* Wedding Date Banner */}
        <div className="bg-gradient-to-r from-[#e6d9b9]/80 to-[#d1c1a1]/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 mb-6 border border-[#e6d9b9] animate-fade-in delay-200 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <div className="text-center md:text-left">
              <div className="text-xl md:text-2xl font-bold text-[#66564a]">
                {weddingDetails.date}
              </div>
              <div className="text-lg md:text-xl text-[#8b7355] font-medium">
                {weddingDetails.time}
              </div>
            </div>
            <div className="hidden md:block w-px h-12 bg-[#8b7355]/30"></div>
            <div className="text-center md:text-left">
              <div className="text-lg md:text-xl font-bold text-[#66564a]">
                {weddingDetails.venue}
              </div>
              <div className="text-md md:text-lg text-[#8b7355]">
                {weddingDetails.location}
              </div>
            </div>
          </div>
        </div>

        {/* Quran Verse */}
        <div className="max-w-3xl mb-8 animate-fade-in delay-300">
          <div className="relative bg-white/40 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-[#e6d9b9]/50">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#8b7355] text-white px-4 py-1 rounded-full text-sm font-semibold">
              آية كريمة
            </div>
            <p className="text-[#66564a] text-lg md:text-xl italic leading-relaxed Neirizi text-right" dir="rtl">
              {"﴿وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا لِتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِقَوْمٍ يَتَفَكَّرُونَ﴾"}
              <br />
              <span className="block text-center text-[#a08c7a] text-sm md:text-base mt-2">
                [سورة الروم: ٢١]
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="relative z-10 w-full max-w-6xl px-4">
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          {/* Wedding Image Card */}
          <div className="lg:w-2/3">
            <div className="bg-white/80 backdrop-blur-md border border-[#e6d9b9] rounded-3xl p-6 md:p-8 overflow-hidden shadow-xl transform hover:scale-[1.02] transition-transform duration-500">
              <div className="relative overflow-hidden rounded-2xl mb-6">
                <img
                  src={cardImage}
                  alt="عمر ونور"
                  className="w-full h-auto object-cover rounded-2xl transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent rounded-2xl"></div>
              </div>
              <div className="text-center" dir="rtl">
                <p className="text-[#66564a] text-xl md:text-2xl font-medium leading-relaxed mb-4">
                  حضوركم هو اللي هيتمم فرحتنا ويخلي اليوم ده من أجمل أيام حياتنا
                </p>
                <p className="text-[#8b7355] text-lg md:text-xl">
                  تعالوا نوروا الفرح وشاركونا أحلى لحظاتنا ❤️
                </p>
              </div>
            </div>
          </div>

          {/* Location & Timeline Card */}
          <div className="lg:w-1/3">
            <div className="bg-white/80 backdrop-blur-md border border-[#e6d9b9] rounded-3xl p-6 md:p-8 shadow-xl">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-[#66564a] mb-2 flex items-center justify-center gap-2">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  تفاصيل الفرح
                </h3>
              </div>

              {/* Location Details */}
              <div className="mb-8">
                <div className="flex items-start gap-3 mb-4 p-3 bg-[#f9f3eb] rounded-xl hover:bg-[#f0e6d3] transition-colors duration-300">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#e6d9b9] to-[#d1c1a1] rounded-full flex items-center justify-center shadow-md">
                    <svg className="w-5 h-5 text-[#66564a]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1" dir="rtl">
                    <h4 className="font-bold text-[#66564a] mb-1">المكان</h4>
                    <p className="text-[#8b7355] text-sm font-medium">{weddingDetails.venue}</p>
                    <p className="text-[#a08c7a] text-xs mt-1">{weddingDetails.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-[#f9f3eb] rounded-xl hover:bg-[#f0e6d3] transition-colors duration-300">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#e6d9b9] to-[#d1c1a1] rounded-full flex items-center justify-center shadow-md">
                    <svg className="w-5 h-5 text-[#66564a]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div dir="rtl">
                    <h4 className="font-bold text-[#66564a] mb-1">التوقيت</h4>
                    <p className="text-[#8b7355] text-sm font-medium">{weddingDetails.date}</p>
                    <p className="text-[#a08c7a] text-xs mt-1">{weddingDetails.time}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Embedded Google Map Section */}
        <div className="mb-12 animate-fade-in">
          <div className="bg-white/80 backdrop-blur-md border border-[#e6d9b9] rounded-3xl p-4 md:p-6 shadow-xl overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-[#66564a] flex items-center gap-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                موقع الفرح على الخريطة
              </h3>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-[#e6d9b9]">
              <iframe
                src={weddingDetails.embedSrc}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="موقع قاعة السريا"
                className="rounded-xl"
              />
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                <p className="text-sm font-semibold text-[#66564a]">{weddingDetails.venue}</p>
                <p className="text-xs text-[#a08c7a]">{weddingDetails.location}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-between items-center">
              <a
                href={weddingDetails.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#e6d9b9] to-[#d1c1a1] text-[#66564a] font-semibold py-2 px-4 rounded-xl hover:from-[#d1c1a1] hover:to-[#c4b394] transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                </svg>
                فتح في خرائط جوجل
              </a>
            </div>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-[#e6d9b9]/80 to-[#d1c1a1]/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-[#e6d9b9] shadow-lg">
            <h3 className="text-2xl font-bold text-[#66564a] text-center mb-6">
              العد التنازلي لبداية الفرح
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "أيام", value: timeLeft.days },
                { label: "ساعات", value: timeLeft.hours },
                { label: "دقايق", value: timeLeft.minutes },
                { label: "ثواني", value: timeLeft.seconds }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 mb-2 shadow-inner">
                    <span className="text-3xl md:text-4xl font-bold text-[#66564a]">
                      {item.value}
                    </span>
                  </div>
                  <span className="text-[#8b7355] font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <RSVP />
        <GuestMessages />
      </div>
    </div>
  );
}

export default Landing;