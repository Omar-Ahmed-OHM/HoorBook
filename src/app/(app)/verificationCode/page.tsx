"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { BaseUrl } from "@/app/components/Baseurl";
import Container from "@/app/components/Container";
import SmartNavbar from "@/app/components/ui/Navbar";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import ErrorPopUP from "@/app/components/ui/pop-up_show_message_error";
import Loading from "@/app/components/ui/loading";

const VerifyCodePage = () => {
    const [code, setCode] = useState("");
    const [email, setEmail] = useState("");
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const [modal, setModal] = useState<{ show: boolean; message: string }>({
        show: false,
        message: "",
    });
         const [loading, setLoading] = useState<boolean>(false);
    

    const router = useRouter();

    // جلب الإيميل من sessionStorage
    useEffect(() => {
        const savedEmail = Cookies.get("reset_pass_email");
        if (savedEmail) setEmail(savedEmail);
        console.log(savedEmail);
    }, []);

    // عداد الوقت
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else {
            setCanResend(true);
        }

        return () => clearInterval(interval);
    }, [timer]);

    const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value);
    };

    // إعادة إرسال الكود
    const handleResend = async () => {
        setTimer(60); //to rernder use effect

        setCanResend(false);
        const params = new FormData();
        params.append("email", email);
        try {
            setLoading(true)
            await axios.post(`${BaseUrl}api/user/forget-password`, params, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        } catch (err) {
            console.error("Error resending code:", err);
        }
        finally{
            setLoading(false)
        }
    };

    const handleConfirm = async () => {
        const sendData = new FormData();
        sendData.append("email", email);
        sendData.append("verification_code", code);
        try {
            setLoading(true)
            const response = await axios.post(
                `${BaseUrl}api/user/verify-code-forget-password`,
                sendData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            const result = await response.data;
            console.log(result);

            if (result.status.status == true) {
                Cookies.set("verifyCode", code);
                router.push("/resetPassword");
            } else {
                setModal({ message: " كود التحقق غير صحيح", show: true });
            }
        } catch (err) {
            console.error("Error verifying code:", err);
        }
        finally{
            setLoading(false)
        }
    };

    return (
             
       
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-orange-100 px-2 sm:px-4 py-6 sm:py-10">
            <SmartNavbar />

            <div className="flex justify-center mt-10 md:mt-5 ">
                <Container>
                    <div className="bg-white shadow-2xl rounded-3xl p-4 sm:p-6 md:p-8 w-full max-w-full space-y-6 border border-purple-100 mt-10 mx-auto text-center">
                        <h2 className="text-xl font-bold text-purple-800 mb-2">
                            تم ارسال كود التحقق الى الايميل الخاص بكم
                        </h2>

                        <p className="text-sm text-gray-700 mb-4">
                            {canResend ? (
                                <button
                                    onClick={handleResend}
                                    className="text-purple-800 underline hover:text-purple-500">
                                    إعادة ارسال كود التحقق
                                </button>
                            ) : (
                                <span>
                                    اعادة ارسال كود التحقق بعد: {timer} ثانية
                                </span>
                            )}
                        </p>

                        <div className="flex items-center gap-2 mb-4">
                            <input
                                type="text"
                                maxLength={5}
                                value={code}
                                onChange={handleCodeChange}
                                placeholder="ادخل الرمز"
                                className="border border-purple-300 rounded px-4 py-2 text-center w-40 text-black outline-none mx-auto"
                            />
                        </div>

                        <button
                            onClick={handleConfirm}
                            className="w-2/3 bg-gradient-to-r from-purple-700 to-orange-400 text-white font-bold py-3 text-lg rounded-lg shadow-lg hover:scale-[1.02] transition-all duration-300 mt-2">
                            تأكيد
                        </button>
                    </div>
                </Container>
            </div>
            {modal.show && (
                <ErrorPopUP message={modal.message} setClose={setModal} />
            )}
             {loading?(<Loading/>):( <></>)}
        
        </div>
       
    );
};

export default VerifyCodePage;
