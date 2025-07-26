import { useState } from "react";

function RSVP() {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const url = "https://script.google.com/macros/s/AKfycbylknpgC7fL7nZWd7ZdrjOStQNecRAY3P8T8R7V--goGd9mbx2HlPqwou9tqzeo_Ju8-Q/exec";
    const data = {
      name: e.target[0].value,
      message: e.target[1].value,
    };
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
  };
  return (
    <div className="bg-white/70 rounded-2xl p-6 shadow-lg mt-8 mx-5 md:mx-auto md:max-w-2xl" dir="rtl">
      <h3 className="text-2xl font-bold mb-4 text-[#66564a]">تأكيد الحضور</h3>
      {submitted ? (
        <p className="text-green-700">شكرًا لتأكيد حضورك! نتطلع لرؤيتك ❤️</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input className="p-2 rounded border" placeholder="اسمك" required />
          <textarea className="p-2 rounded border" placeholder="رسالة (اختياري)" />
          <button className="bg-[#e6d9b9] text-[#66564a] font-bold py-2 rounded hover:bg-[#d1c1a1] transition">تأكيد</button>
        </form>
      )}
    </div>
  );
}

export default RSVP; 