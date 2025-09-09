"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Container from "@/app/components/Container";
import { ApiResponse, FieldForm, Profile } from "@/app/lib/type";
import toast from "react-hot-toast";
import { BaseUrl, headers } from "@/app/components/Baseurl";
import axios from "axios";
import SmartNavbar from "@/app/components/ui/Navbar";
import FormField from "@/app/components/ui/Formfield";
import { LoginRequiredModal } from "@/app/components/ui/Pop-up-login";

export default function ProfilePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const url = `${BaseUrl}api/user/profile`;
  const token = Cookies.get("access_token_login");
useEffect(()=>{
    if (!token) {
      setIsLoggedIn(true);
    }
    else{
      setIsLoggedIn(false)
    }
})
  useEffect(() => {


    const getProfile = async () => {
      try {
        const res = await axios.get(url, { headers });
        setProfile(res.data.data);
        setIsLoggedIn(true);
      } catch (error) {
        console.log(error);
        toast.error("خطأ فى جلب المعلومات الخاصة بك");
      }
    };

    getProfile();
  }, []);

  const handleProfileChange = (field:keyof Profile,value:string|number)=>{
    setProfile((prev:any) => ({ ...prev, [field]: value }));
  }

  const handleSave = async () => {
    if (!profile) return;
    setIsSaving(true);
    try {
      const res = await axios.patch(`${BaseUrl}api/user/profile`, profile, {
        headers,
      });
      toast.success("تم حفظ التعديلات بنجاح");
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ أثناء حفظ التعديلات");
    } finally {
      setIsSaving(false);
    }
  };

  const fields: FieldForm[] = [
    {
      label: "الاسم بالكامل",
      name: "name",
      requierd: true,
      type: "text",
      placeholder: "ادخل اسمك الكامل",
    },
    {
      label: "البريد الإلكتروني",
      name: "email",
      requierd: true,
      type: "email",
      placeholder: "example@email.com",
    },
  ];

  return (
    <Container>
      <section className="pb-12 md:pb-20">
        <SmartNavbar />
      </section>

      <section className="main max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-purple-700">الملف الشخصي</h2>

        {profile ? (
       <>
  <form className="space-y-4">
    {fields.map((field) => (
      <div key={field.name} className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">{field.label}</label>
        {(field.type==="email")?(
        <input
        type={field.type}
        name={field.name}
        value={profile.email}
        onChange={(e) => handleProfileChange("email",e.target.value)}
        readOnly
        placeholder={field.placeholder}
        className="border rounded-md p-2 focus:outline-none focus:ring-2 text-black focus:ring-purple-600"
        />
    ):(
              <input
        type={field.type}
        name={field.name}
        value={profile.name}
        onChange={(e) => handleProfileChange("name",e.target.value)}
        placeholder={field.placeholder}
        className="border rounded-md p-2 focus:outline-none focus:ring-2 text-black focus:ring-purple-600"
        />
    )}
      </div>
    ))}
  </form>

  <div className="mt-6 text-center">
    <button
      onClick={handleSave}
      className="bg-gradient-to-r from-purple-700 to-orange-400 text-white px-6 py-2 rounded-md"
      disabled={isSaving}
    >
      {isSaving ? "جارٍ الحفظ..." : "حفظ التعديلات"}
    </button>
  </div>
</>

        ) : (
          <p className="text-center text-gray-500">جارٍ تحميل البيانات...</p>
        )}
      </section>
         <LoginRequiredModal show={isLoggedIn} />
    </Container>
  );
}
