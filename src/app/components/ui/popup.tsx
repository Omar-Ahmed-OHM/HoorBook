import Image from "next/image";
import { useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

type CommentPopupProps = {
  productId: number;
  imageUrl: string;
  onClose: () => void;
};

export default function CommentPopup({ productId, imageUrl, onClose }: CommentPopupProps) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
      const token = Cookies.get("access_token_login");

  const sendReview = async () => {
    if (rating === 0 || comment.trim() === "") {
      alert("يرجى تحديد التقييم وكتابة تعليق");
      return;
    }

    const payload = {
      reviewable_type: "product",
      reviewable_id: productId,
      review: rating.toString(),
      comment: comment.trim(),
    };

    const headers = {
      Authorization: `Bearer ${token}`,
      userType: '2',
      fcmToken: 'fGS7RgUcR66lms505IQllc:APA91bF-AdXcn94TKHQ2eKEqTX22eQTxr6LRSwpHyzwWXjvwBFfLQ_yYWO0ZNfd9ScbxHjKBZaGLosJK2G1wfrKp6G4h3FeDfdNovPZD3PX8iV-ckfYf3ig',
      lang: 'ar',
      'Content-Type': 'application/json',
    };

    try {
      const res = await fetch("https://hoorbookapp.com/api/reviews", {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.status.status === true) {
        toast.success("✅ تم إضافة التعليق بنجاح");
        onClose();
      } else {
        toast.error(data.status.validation_message || "❌ حدث خطأ حاول مرة أخرى");
      }
    } catch (error) {
      toast.error("🚫 خطأ في الإرسال، حاول مرة أخرى");
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-3xl font-bold"
        >
          &times;
        </button>

        {/* الصورة */} 
        <div className="w-full h-60 relative mb-4 rounded-lg overflow-hidden shadow-md">
          <Image src={imageUrl} alt="صورة المنتج" fill objectFit="contain"unoptimized />
        </div>

        <h2 className="text-xl font-semibold mb-4 text-violet-900 text-center">أضف تقييمك</h2>

        {/* التقييم بنجوم */}
        <div className="flex justify-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={`text-3xl mx-1 transition ${
                (hover || rating) >= star ? "text-yellow-400" : "text-gray-400"
              }`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              ★
            </button>
          ))}
        </div>

        <textarea
          rows={5}
          className="w-full border border-gray-300 rounded-md p-3 mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-violet-500 text-black"
          placeholder="اكتب تعليقك هنا..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button
          onClick={sendReview}
          disabled={loading}
          className="w-full bg-gradient-to-r from-orange-400 to-purple-500 text-white py-2 rounded-md font-semibold hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "جاري الإرسال..." : "إرسال"}
        </button>
      </div>
    </div>
  );
}
