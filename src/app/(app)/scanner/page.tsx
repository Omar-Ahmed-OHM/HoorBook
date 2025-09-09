
"use client";
import React, { useState } from "react";
import Container from "@/app/components/Container";
import ErrorPopUP from "@/app/components/ui/pop-up_show_message_error";


// import { BaseUrl, headers } from "@/app/components/Baseurl";
import toast, { Toaster } from "react-hot-toast";
import SmartNavbar from "@/app/components/ui/Navbar";
import Loading from "@/app/components/ui/loading";
import { useRouter } from "next/navigation";
const Scanner = () => {
    const [modal, setModal] = useState({ show: false, message: "" });
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
     const handleNavigate = (e: React.FormEvent, path: string) => {
    e.preventDefault();
    if (code || path === '/cart')
    router.push(path); 
else
    setModal({ show: true, message: "الرجاء ادخال كود المنتج" });


  };

    const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value.replace(/[^0-9]/g, ""));
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-orange-100 px-2 sm:px-4 py-6 sm:py-10">
            <SmartNavbar />

            <div className="flex justify-center mt-10 md:mt-5 ">
                <Container>
                    <form
                        className="bg-white shadow-2xl rounded-3xl p-4 sm:p-6 md:p-8 w-full max-w-full md:w-9/12 space-y-6 border border-purple-100 mt-10 mx-auto"
                        // onSubmit={handleSubmit}
                    >
                        <div className="flex flex-col items-center space-y-2">
                            <h2 className="text-xl font-bold text-gray-800 text-center">
                                يمكنكم الان استخدام هذة الصفحة للتسوق بسهولة
                                داخل متجر حور بوك
                            </h2>
                        </div>
                        <div className="w-full">
                            <input
                            inputMode="numeric"
                            required
                                type="text"
                                value={code}
                                onChange={handleCodeChange}
                                placeholder="ادخل رقم المنتج"
                                className="border border-gray-500 rounded-xl px-4 py-2 w-full text-black outline-none mx-auto"
                            />
                        </div>

                        <div>
                            <Toaster />
                        </div>

                        <div className="flex flex-col justify-center items-center gap-4">
                            <button
                            onClick={(e) => handleNavigate(e, `/details/${code}`)}
                                className="
      w-full 
      bg-gradient-to-r from-purple-700 to-orange-400 
      text-white font-bold py-3 text-lg rounded-lg shadow-lg 
      hover:scale-[1.02] transition-all duration-300 mt-2
    ">
                                إفحص المنتج
                            </button>
                            <button
                            onClick={(e) => handleNavigate(e, '/cart')}
                                className="
      w-full
      bg-gradient-to-r from-purple-700 to-orange-400 
      text-white font-bold py-3 text-lg rounded-lg shadow-lg 
      hover:scale-[1.02] transition-all duration-300 mt-2
    ">
                                إتمام الشراء
                            </button>
                        </div>
                    </form>
                </Container>
            </div>

            {loading ? <Loading /> : <></>}
            {modal.show && (
                <ErrorPopUP message={modal.message} setClose={setModal} />
            )}
        </div>
    );
};

export default Scanner;
