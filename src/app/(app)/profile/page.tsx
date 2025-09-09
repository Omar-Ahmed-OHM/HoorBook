"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Container from "@/app/components/Container";
import { BadgeCheck, User, Star, ShoppingCart, DollarSign, MapPin  } from "lucide-react";
import SmartNavbar from "@/app/components/ui/Navbar";
import Link from "next/link";
import { ApiResponse, Profile } from "@/app/lib/type";
import toast from "react-hot-toast";
import { BaseUrl, headers } from "@/app/components/Baseurl";
import axios from "axios";
import { LoginRequiredModal } from "@/app/components/ui/Pop-up-login";

export default function ProfilePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState<Profile>();
  const url = `${BaseUrl}api/user/profile`;

  useEffect(() => {
    const token = Cookies.get("access_token_login");
    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    const getProfile = async () => {
      try {
        const res = await axios.get(url, { headers });
        console.log(res.data.data.name);
        setProfile(res.data.data);
      } catch (error) {
        console.log(error);
        toast.error("خطأ فى جلب المعلومات الخاصه بك");
      }
    };

    getProfile();
    setIsLoggedIn(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50 py-10 px-4">
      <div className="pb-12 md:pb-4">

      <SmartNavbar />
      </div>
      <Container>
        {isLoggedIn ? (
          <div className="bg-white p-6 rounded-2xl shadow-lg max-w-xl w-full mx-auto space-y-6 text-center  pt-6 mt-12">
            <div className="flex flex-col items-center space-y-2 mt-4 pt-6">
              <User className="text-purple-600 w-12 h-12" />
              <h2 className="text-xl font-bold text-purple-800 ">{profile?.name}</h2>
              <p className="text-sm text-gray-600">{profile?.email}</p>
            </div>
            <div className="w-full mt-2 bg-gradient-to-r from-purple-700 to-orange-400 text-white font-semibold py-2 rounded-lg shadow-md hover:opacity-90 transition">
              <p>
              نقاطى : <span>  
                  {profile?.points}     
</span>   

              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-purple-100 rounded-xl p-4">
                <BadgeCheck className="text-purple-500 mb-2 mx-auto" />
                <p className="text-sm text-gray-700">نوع الحساب</p>
                <p className="text-md font-semibold text-purple-700">{profile?.type_name}</p>
              </div>

              <div className="bg-orange-100 rounded-xl p-4">
                <Star className="text-orange-500 mb-2 mx-auto" />
                <p className="text-sm text-gray-700">النقاط</p>
 <p className="text-lg font-bold text-orange-600">
  {(profile?.points ?? 0) * Number(profile?.pointsSettings?.point_price  ?? 0)}
</p>

              </div>

              

                <Link href={'/cart'} className="bg-blue-100 rounded-xl p-4">
              <div >
                <ShoppingCart className="text-blue-500 mb-2 mx-auto" />
                <p className="text-sm text-gray-700">عدد السلع في السلة </p>
                <p className="text-md font-semibold text-blue-700">{profile?.CartCount}</p>
              </div>
                </Link>

              <Link href={'/editLocation'} className="bg-green-100 rounded-xl p-4">
                <MapPin  className="text-green-600 mb-2 mx-auto" />
                <p className="text-sm text-gray-700">العنواين الخاصه بك </p>
              </Link>
            </div>
<div className="grid grid-cols-3 gap-4 text-center mt-6">
  <Link href="/orders" className="flex flex-col items-center bg-purple-50 p-4 rounded-xl hover:shadow transition">
    <ShoppingCart className="text-purple-600 mb-1" size={24} />
    <span className="text-sm text-purple-800 font-semibold">الطلبات  </span>
  </Link>

  <Link href="/account" className="flex flex-col items-center bg-purple-50 p-4 rounded-xl hover:shadow transition">
    <User className="text-purple-600 mb-1" size={24} />
    <span className="text-sm text-purple-800 font-semibold">الحساب
      
    </span>
  </Link>

  <Link href="/favorite" className="flex flex-col items-center bg-purple-50 p-4 rounded-xl hover:shadow transition">
    <Star className="text-purple-600 mb-1" size={24} />
    <span className="text-sm text-purple-800 font-semibold">المفضلة</span>
  </Link>

  
</div>



{/* زر تسجيل الخروج */}
<button
  onClick={() => {
    Cookies.remove("access_token_login")
    Cookies.remove("token_type_login")
    Cookies.remove("login_user_id")
    Cookies.remove("login_user_name")
    Cookies.remove("login_user_email")
    Cookies.remove("login_user_type")
    Cookies.remove("login_user_type_name")
    Cookies.remove("login_cart_count")
    Cookies.remove("login_points")
    Cookies.remove("login_price")
    Cookies.remove("login_point_price")
    toast.success("تم تسجيل الخروج بنجاح")
    window.location.href = "/login"
  }}
  className="w-full bg-gradient-to-r from-red-600 to-red-400 text-white mt-6 py-2 rounded-xl shadow hover:opacity-90 transition"
>
  تسجيل الخروج
</button>

          </div>
        ) : (
     <LoginRequiredModal show={!isLoggedIn} />
        )}
      </Container>
    </div>
  );
}
