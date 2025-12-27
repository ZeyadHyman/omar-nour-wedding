import { useState } from "react";

function RSVP() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", message: "" });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "الاسم مطلوب";
    }
    if (formData.name.trim().length < 2) {
      newErrors.name = "الاسم يجب أن يكون أكثر من حرفين";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setSubmitted(true);
        // Reset form
        setFormData({ name: "", message: "" });
        setErrors({});

        // Trigger messages refresh after 2 seconds
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('refreshMessages'));
        }, 2000);
      } else {
        throw new Error("Failed to submit");
      }
    } catch (error) {
      console.error("Error submitting RSVP:", error);
      alert("حصلت مشكلة بسيطة، جرّب تاني لو سمحت 🙏");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({ name: "", message: "" });
    setErrors({});
  };

  return (
    <div
      className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl mt-8 max-w-6xl mx-auto border border-[#e6d9b9]/50 animate-fade-in delay-500"
      dir="rtl"
    >
      <div className="text-center mb-6">
        <h3 className="text-3xl font-bold text-[#66564a] mb-2">هتنورونا؟</h3>
        <p className="text-[#a08c7a] text-lg">فرحتنا مش هتكمل من غير وجودكم معانا </p>
      </div>

      {submitted ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h4 className="text-2xl font-bold text-green-700 mb-2">تمام كده!</h4>
          <p className="text-green-600 text-lg mb-6">شكراً لتأكيد الحضور! مستنيينكم تفرحوا معانا 🎉</p>
          <button
            onClick={handleReset}
            className="bg-[#e6d9b9] text-[#66564a] font-semibold py-2 px-6 rounded-xl hover:bg-[#d1c1a1] transition-colors duration-300"
          >
            أكتب رسالة تانية
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-[#66564a] font-semibold mb-2 text-lg"
            >
              اسمك
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full p-4 rounded-2xl border-2 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 transition-all duration-300 text-lg ${errors.name
                ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                : 'border-[#e6d9b9] focus:border-[#66564a] focus:ring-[#66564a]/20'
                }`}
              placeholder="اكتب اسمك هنا"
              required
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-[#66564a] font-semibold mb-2 text-lg"
            >
              تحب تقول حاجة؟ (اختياري)
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows="4"
              className="w-full p-4 rounded-2xl border-2 border-[#e6d9b9] bg-white/50 backdrop-blur-sm focus:border-[#66564a] focus:outline-none focus:ring-2 focus:ring-[#66564a]/20 transition-all duration-300 text-lg resize-none"
              placeholder="ابعت كلمة حلوة للعرايس "
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer bg-gradient-to-r from-[#e6d9b9] to-[#d1c1a1] text-[#66564a] font-bold py-4 px-8 rounded-2xl hover:from-[#d1c1a1] hover:to-[#c4b394] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-xl"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#66564a]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                بيتم الإرسال...
              </div>
            ) : (
              "أرسال"
            )}
          </button>
        </form>
      )}
    </div>
  );
}

export default RSVP;