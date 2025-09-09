
"use client";
import { Mail, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { BaseUrl } from "../Baseurl";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { FieldForm } from "@/app/lib/type";
import FormField from "./Formfield";

export default function ForgotPasswordModal({
    show,
    onClose,
    setErrorModal,
}: {
    show: boolean;
    onClose: () => void;
    setErrorModal: (value: { show: boolean; message: string }) => void;
}) {
    const modalRef = useRef<HTMLDivElement>(null);
    const [formData, setFormData] = useState<Record<string, any>>({
        email: "",
    });
    const fields: FieldForm[] = [
        {
            
            placeholder:"ادخل بريدك الالكتروني",
            name: "email",
            type: "email",
            requierd: true,
        },
    ];

    const router = useRouter();

    // إغلاق المودال عند الضغط خارج العنصر
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                modalRef.current &&
                !modalRef.current.contains(event.target as Node)
            ) {
                onClose();
            }
        };
        if (show) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [show]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const params = new FormData();
        params.append("email", formData.email);
        try {
            const response = await axios.post(
                `${BaseUrl}api/user/forget-password`,
                params,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            if (response.data.status.status == true) {
                toast.success(
                    "تم إرسال رمز إعادة تعيين كلمة المرور إلى بريدك الإلكتروني."
                );
                setFormData({ email: "" });
                Cookies.set("reset_pass_email", formData.email);
                router.push("/verificationCode");
                onClose(); // إغلاق المودال بعد الإرسال الناجح
            } else {
                onClose();
                toast.error("حدث خطأ أثناء إرسال الطلب.");
                setFormData({ email: "" });
                setErrorModal({
                    message: "هذا الايميل غير موجود!",
                    show: true,
                }); // عرض مودال الخطأ
            }
        } catch (error) {
            console.error("Error sending password reset request:", error);
        }
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
                ref={modalRef}
                className="bg-white p-6 rounded-xl w-full max-w-sm shadow-lg">
                <X
                    className="text-black cursor-pointer"
                    onClick={() => onClose()}
                />
                <h2 className="text-xl font-bold mb-2 text-center text-black">
                    نسيت كلمة السر؟
                </h2>
                <p className="text-center mb-4 text-gray-600">
                    أدخل عنوان بريدك الإلكتروني وسنرسل رمزًا لإنشاء كلمة مرور
                    جديدة
                </p>
                <form onSubmit={handleSubmit}>
                    <FormField
                        fields={fields}
                        data={formData}
                        onChange={setFormData}
                    />

                    <button
                        type="submit"
                        className="bg-gradient-to-r from-purple-900 to-orange-400 text-white w-full py-2 rounded-lg hover:opacity-90 transition duration-300 flex items-center justify-center shadow-lg">
                        استمرار
                    </button>
                </form>
            </div>
        </div>
    );
}
