"use client";
import { moodel_order } from "@/app/lib/type";
import { X } from "lucide-react";

export const Moodel_Cancel = (
  props: moodel_order & { onClose: () => void }
) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      {/* Modal Container */}
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl p-6 animate-fade-in space-y-6">
        
        {/* Close Button */}
        <button
          onClick={props.onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-purple-700 text-center">
          اختر سبب {props.label}
        </h2>

        {/* Reasons List */}
        <div className="space-y-3">
          {props.reasons.map((reason, idx) => (
            <label
              key={idx}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <input
                type="radio"
                name="cancelReason"
                value={reason}
                checked={props.reason === reason}
                onChange={() => props.setReason?.(reason)}
                className="accent-purple-600"
              />
              <span className="text-gray-700 pr-2">{reason}</span>
            </label>
          ))}
        </div>

        {/* Confirm Button */}
        <button
          onClick={() => {
            props.cancelOrder?.(props.reason, props.status);
            props.onClose();
          }}
          disabled={!props.reason}
          className={`w-full font-semibold py-2 rounded-lg shadow-md transition duration-300 ${
            props.reason
              ? "bg-gradient-to-r from-purple-700 to-orange-400 text-white hover:opacity-90"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {props.label === "الارجاع" ? "تأكيد الاسترجاع" : "تأكيد الإلغاء"}
        </button>
      </div>
    </div>
  );
};
