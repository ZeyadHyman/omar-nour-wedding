import cardImage from "../assets/image.webp";
import leftFlowerDecoration from "../assets/leftFloweDecoration.webp";
import rightFlowerDecoration from "../assets/rightFloweDecoration.webp";
import RSVP from "./RSVP";
import GuestMessages from "./GuestMessages";

function Landing() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center relative overflow-hidden py-8">

      {/* الزينة */}
      <img src={leftFlowerDecoration} alt="" className="absolute top-0 left-0 w-32 md:w-48 opacity-70 rotate-[150deg] pointer-events-none select-none z-0" />
      <img src={rightFlowerDecoration} alt="" className="absolute top-0 right-0 w-32 md:w-48 opacity-70 rotate-[210deg] pointer-events-none select-none z-0" />
      <img src={leftFlowerDecoration} alt="" className="absolute bottom-0 left-0 w-24 md:w-36 opacity-40 rotate-45 pointer-events-none select-none z-0" />
      <img src={rightFlowerDecoration} alt="" className="absolute bottom-0 right-0 w-24 md:w-36 opacity-40 rotate-[-45deg] pointer-events-none select-none z-0" />

      {/* العنوان */}
      <div className="relative z-10 flex flex-col items-center mb-8 text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-[#66564a] drop-shadow-lg mb-5 tracking-wide animate-fade-in">
          فرح
        </h1>
        <h2 className="text-4xl md:text-6xl font-semibold text-[#66564a] mb-4 animate-fade-in delay-100">
          عمر ونور
        </h2>
        <p className="text-md md:text-xl text-[#a08c7a] mb-4 animate-fade-in delay-300">
          يوم الجمعة 12 يوليو 2024 - الساعة 7 مساءً
        </p>
        <p className="text-[#66564a] text-md md:text-lg italic animate-fade-in delay-400 px-2 Neirizi max-w-2xl">
          {"﴿وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ﴾"}
          <br />
          <span className="text-sm text-[#a08c7a]">[الروم: 21]</span>
        </p>
      </div>

      {/* البطاقة */}
      <div className="relative z-10 w-11/12 md:w-2/3 lg:w-1/2 xl:w-1/3 mb-8">
        <div className="backdrop-blur-md bg-white/60 border border-[#e6d9b9] rounded-3xl p-6 flex flex-col items-center transition-transform duration-500 animate-fade-in delay-500 ">
          <img src={cardImage} alt="Wedding" className="w-2/3 h-auto object-cover rounded-2x" />
          <div className="text-center ">
            <p className="text-[#66564a] text-lg md:text-xl font-medium leading-relaxed">
              وجودكم هو اللي هيكمل فرحتنا <br /> متنسوش تيجوا وتشاركونا أحلى لحظة في حياتنا ❤️
            </p>
          </div>
        </div>
      </div>

      {/* RSVP Section */}
      <RSVP />

      {/* Guest Messages Section */}
      <GuestMessages />
    </div>
  );
}

export default Landing;
