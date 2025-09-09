"use client";
import { useState } from "react";
import Container from "@/app/components/Container";
import FormField from "@/app/components/ui/Formfield";

import { ApiResponse, FieldForm, Register } from "@/app/lib/type";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SmartNavbar from "@/app/components/ui/Navbar";

import Logo from "../../../../public/asset/images/حورلوجو.jpeg";
import { Postresponse } from "@/app/lib/methodes";
import { BaseUrl } from "@/app/components/Baseurl";

import Cookies from 'js-cookie'
import toast from "react-hot-toast";

export default function RegisterPage() {
  const fields: FieldForm[] = [
    { name: "name", label: "الاسم كاملاً", type: "text", placeholder: "ادخل اسمك كاملاً" },
    { name: "email", label: "البريد الإلكتروني", type: "email", placeholder: "ادخل بريدك الالكتروني" },
    { name: "password", label: "الرقم السري", type: "password", placeholder: "ادخل الرقم السري" },
    { name: "password_confirmation", label: "تأكيد كلمة السر", type: "password", placeholder: "ادخل تأكيد كلمة السر" },
    {
      name: "type",
      label: "نوع الحساب",
      type: "select",
      options: [
        {label:"مستخدم عادي",value:2},
      ]
      
      
    },
  ];
const url = `${BaseUrl}api/user/register`
  const [formData, setFormData] = useState<Record<string, any>>({});
  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      const res:ApiResponse<Register>=await Postresponse(url,formData);
      console.log(res)
         if(res.status?.status===Boolean(false)){
        if(res.status.validation_message===String("The email has already been taken.")){
          toast.error('البريد الالكتروني موجود مسبقا');
          return;
        }
        else{
          toast.error(res.status.validation_message);
          return;
        }
      }
      const {token , user}=res.data;
      Cookies.set("token", token, { expires: 1 });
      Cookies.set("type", user.type.toString()); 
      Cookies.set("type_name", user.type_name);
      Cookies.set("email", user.email);
      Cookies.set("name", user.name);
      Cookies.set("user_id", user.id.toString());
      Cookies.set("cart_count", user.CartCount.toString());
      toast.success('تم انشاء الايميل بنجاح برجاء تسجيل الدخول')
      if (user.pointsSettings) {
        Cookies.set("points", user.pointsSettings.points);
        Cookies.set("point_price", user.pointsSettings.point_price);
        Cookies.set("price", user.pointsSettings.price);
      }  
   
    }
    
    catch(error){
      console.log(error);
    
    toast.error('خطأ فى اسم المستخدم او كلمه المرور ')
    }
  };

  return (
    <>
      <SmartNavbar />
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-orange-100 flex items-center justify-center py-10 px-4 ">
        <Container>
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md space-y-6 border border-purple-100 mt-5"
          >
            {/* شعار */}
            <div className="flex flex-col items-center space-y-2">
              <Image
                src={Logo}
                alt="شعار الموقع"
                width={60}
                height={60}
                className="rounded-full shadow-md"
                unoptimized
              />
              <h2 className="text-2xl font-bold text-purple-800 text-center flex items-center gap-1">
                <Sparkles className="w-5 h-5 text-orange-400 animate-bounce" />
                إنشاء حساب جديد
              </h2>
            </div>

            <FormField fields={fields} data={formData} onChange={setFormData} />

           
            <p className="text-xs text-gray-600 text-right leading-relaxed">
              بالضغط على الزر، فأنت توافق على{" "}
              <Link href="/Terms&Conditions" target='_blank' >
                <span className="text-purple-600 underline cursor-pointer hover:text-orange-500 transition">
                  شروط الاستخدام
                </span>
              </Link>{" "}
              و{" "}
              <Link href="/PrivacyPolicy" target='_blank' rel='nooper noreferrer'>
                <span className="text-purple-600 underline cursor-pointer hover:text-orange-500 transition">
                  سياسة الخصوصية
                </span>
              </Link>.
            </p>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-700 to-orange-400 text-white font-bold py-2 rounded-lg shadow-lg hover:scale-[1.02] transition-all duration-300"
            >
              إنشاء حساب جديد
            </button>

            <p className="text-center text-sm text-gray-700">
              لديك حساب بالفعل؟{" "}
              <Link href="/login">
                <span className="text-purple-700 font-semibold underline cursor-pointer hover:text-orange-500 transition">
                  تسجيل الدخول
                </span>
              </Link>
            </p>
          </form>
        </Container>
      </div>
    </>
  );
}
