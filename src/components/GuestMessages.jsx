import { useState, useEffect } from "react";

function GuestMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError(false);
      const response = await fetch("/api/messages");
      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages || []);
      } else {
        throw new Error("Failed to fetch messages");
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();

    const handleRefresh = () => fetchMessages();
    window.addEventListener("refreshMessages", handleRefresh);

    const interval = setInterval(fetchMessages, 30000);

    return () => {
      clearInterval(interval);
      window.removeEventListener("refreshMessages", handleRefresh);
    };
  }, []);

  if (loading && messages.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl mt-8 max-w-6xl mx-auto border border-[#e6d9b9]/50" dir="rtl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#66564a] mx-auto"></div>
          <p className="text-[#66564a] mt-4">جاري تحميل الرسائل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl mt-12 max-w-6xl mx-auto border border-[#e6d9b9]/50" dir="rtl">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-[#66564a]">رسائل الحضور</h3>

        <button
          onClick={fetchMessages}
          disabled={loading}
          className="mt-4 bg-[#e6d9b9] text-[#66564a] font-semibold py-2 px-6 rounded-xl hover:bg-[#d1c1a1] transition-colors disabled:opacity-50"
        >
          {loading ? "جاري التحديث..." : "تحديث الرسائل"}
        </button>
      </div>

      {error ? (
        <div className="text-center py-12">
          <p className="text-red-600 text-lg mb-4">فشل تحميل الرسائل</p>
          <button
            onClick={fetchMessages}
            className="bg-[#e6d9b9] text-[#66564a] font-semibold py-2 px-6 rounded-xl hover:bg-[#d1c1a1] transition-colors"
          >
            حاول مرة أخرى
          </button>
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-[#8b7355] text-lg">لا توجد رسائل حتى الآن</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {messages.map((message, index) => (
            <div
              key={index}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-[#e6d9b9]/40 hover:shadow-lg transition-shadow"
            >
              {message.message && (
                <p className="text-[#66564a] text-lg mb-4 leading-relaxed">
                  "{message.message}"
                </p>
              )}
              <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                <span className="text-[#8b7355] font-semibold">{message.name}</span>
                {message.timestamp && (
                  <span className="text-[#a08c7a] text-sm">
                    {new Date(message.timestamp).toLocaleDateString("ar-EG")}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GuestMessages;