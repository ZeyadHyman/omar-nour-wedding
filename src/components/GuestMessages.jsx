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

    // Listen for refresh event from RSVP component
    const handleRefreshMessages = () => {
      fetchMessages();
    };

    window.addEventListener('refreshMessages', handleRefreshMessages);

    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchMessages, 30000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('refreshMessages', handleRefreshMessages);
    };
  }, []);

  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl mt-8 mx-5 md:mx-auto md:max-w-4xl border border-[#e6d9b9]/50" dir="rtl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#66564a] mx-auto"></div>
          <p className="text-[#66564a] mt-4">جاري تحميل الرسائل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl mt-8 mx-5 md:mx-auto md:max-w-4xl border border-[#e6d9b9]/50" dir="rtl">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-[#66564a] mb-2">رسائل الحضور</h3>

        {/* Refresh Button */}
        <button
          onClick={fetchMessages}
          disabled={loading}
          className="bg-[#e6d9b9] text-[#66564a] font-semibold py-2 px-4 rounded-xl hover:bg-[#d1c1a1] transition-colors duration-300 disabled:opacity-50"
        >
          {loading ? "جاري التحديث..." : "تحديث الرسائل"}
        </button>
      </div>

      {error ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-red-600 text-lg mb-4">حدث خطأ في تحميل الرسائل</p>
          <button
            onClick={fetchMessages}
            className="bg-[#e6d9b9] text-[#66564a] font-semibold py-2 px-4 rounded-xl hover:bg-[#d1c1a1] transition-colors duration-300"
          >
            حاول مرة أخرى
          </button>
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-[#e6d9b9] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-[#66564a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <p className="text-[#a08c7a] text-lg">لا توجد رسائل بعد. كونوا أول من يكتب رسالة حلوة! 💕</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[#e6d9b9]/30 hover:shadow-lg transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {message.message && (
                <p className="text-[#66564a] text-lg mb-4 leading-relaxed">
                  "{message.message}"
                </p>
              )}
              <div className="flex items-center justify-between">
                <span className="text-[#a08c7a] font-semibold">
                  {message.name}
                </span>
                {message.timestamp && (
                  <span className="text-[#a08c7a] text-sm">
                    {new Date(message.timestamp).toLocaleDateString('ar-EG')}
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