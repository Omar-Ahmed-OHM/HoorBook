import { AlertCircle } from "lucide-react";
import Link from "next/link";

// Modal Component
export const LoginRequiredModal = ({ show }: { show: boolean }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-indigo-100 via-pink-100 to-yellow-100 p-6 rounded-2xl shadow-xl max-w-sm w-full  text-center space-y-4">
        <AlertCircle className="text-red-500 w-12 h-12 mx-auto" />
        <h2 className="text-xl font-bold text-gray-800">رجاء تسجيل الدخول</h2>
        <p className="text-gray-600 text-sm">لا يمكنك الوصول إلى هذه العمليه بدون تسجيل الدخول.</p>
        <Link
          href="/login"
          className="inline-block mt-4 bg-btn-color text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          تسجيل الدخول الآن
        </Link>
      </div>
    </div>
  );
};
