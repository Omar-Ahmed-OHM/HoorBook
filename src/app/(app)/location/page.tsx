"use client";
import React, { useEffect, useState } from "react";
import Container from "@/app/components/Container";
import { Sparkles, Building2, LandmarkIcon, MapPin, Map, User } from "lucide-react";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import BottomSelectField from "@/app/components/ui/checkbox";
import { BaseUrl, headers } from "@/app/components/Baseurl";
import toast, { Toaster } from "react-hot-toast";
import { buildPayload } from "@/app/components/ui/handleAddress";
import SmartNavbar from "@/app/components/ui/Navbar";
import ErrorPopUP from "@/app/components/ui/pop-up_show_message_error";
import Loading from "@/app/components/ui/loading";
import { useRouter } from 'next/navigation';
const API_BASE = `${BaseUrl}api`;

const Location = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    governorateId: "",
    cityId: "",
    areaId: "",
    details: "",
    governorate: "",
    city: "",
    area: ""
  });

  const [governorates, setGovernorates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [areas, setAreas] = useState<any[]>([]);
  const [modal, setModal] = useState<{show:boolean,message:string}>({ show: false, message: "" });
   const [loading, setLoading] = useState<boolean>(false);
   const router = useRouter();

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    axios.get(`${API_BASE}/governorates`).then(res => setGovernorates(res.data.data)).catch(() => {
      setModal({ show: true, message: "فشل تحميل المحافظات" });
    });
  }, []);

  useEffect(() => {
    if (!formData.governorate) return;
    const id = governorates.find(g => g.name_ar === formData.governorate)?.id;
    axios.get(`${API_BASE}/cities?governorate_id=${id}`).then(res => setCities(res.data.data)).catch(() => {
      setModal({ show: true, message: "فشل تحميل المدن" });
    });
  }, [formData.governorate]);

  useEffect(() => {
    if (!formData.city) return;
    const id = cities.find(c => c.name_ar === formData.city)?.id;
    axios.get(`${API_BASE}/areas?city_id=${id}`).then(res => setAreas(res.data.data)).catch(() => {
      setModal({ show: true, message: "فشل تحميل المناطق" });
    });
  }, [formData.city]);

  const handleGovSelect = (value: string) => {
    const selected = governorates.find(g => g.name_ar === value);
    updateField("governorate", value);
    updateField("governorateId", selected ? selected.id : "");
    updateField("city", "");
    updateField("cityId", "");
    updateField("area", "");
    updateField("areaId", "");
  };

  const handleCitySelect = (value: string) => {
    if (!formData.governorateId) return setModal({ show: true, message: "اختر المحافظة أولاً" });
    const selected = cities.find(c => c.name_ar === value);
    updateField("city", value);
    updateField("cityId", selected ? selected.id : "");
    updateField("area", "");
    updateField("areaId", "");
  };

  const handleAreaSelect = (value: string) => {
    if (!formData.cityId) return setModal({ show: true, message: "اختر المدينة أولاً" });
    const selected = areas.find(a => a.name_ar === value);
    updateField("area", value);
    updateField("areaId", selected ? selected.id : "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const required = ["name", "phone", "governorateId", "cityId", "areaId", "details"];
    const valid = required.every(key => formData[key as keyof typeof formData]);
    if (!valid) return setModal({ show: true, message: "يرجى ملء جميع الحقول المطلوبة" });

    try {
      setLoading(true)
      const res = await axios.post(`${API_BASE}/address`, buildPayload(formData), { headers });
      if (res.status === 200) {
        toast.success("تم حفظ العنوان بنجاح!");
        router.push("/cart")
        setFormData({
          name: "",
          phone: "",
          governorateId: "",
          cityId: "",
          areaId: "",
          details: "",
          governorate: "",
          city: "",
          area: ""
        });
      } else toast.error("حدث خطأ أثناء حفظ العنوان");
    } catch {
      toast.error("حدث خطأ أثناء حفظ العنوان");
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
        <form
          className="bg-white shadow-2xl rounded-3xl p-4 sm:p-6 md:p-8 w-full max-w-full space-y-6 border border-purple-100 mt-10 mx-auto"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col items-center space-y-2">
            <h2 className="text-2xl font-bold text-purple-800 text-center flex items-center gap-1">
              <Sparkles className="w-6 h-6 text-orange-400 animate-bounce" /> أضف عنوان جديد
            </h2>
          </div>

          {/* الاسم */}
          <div>
            <label className="block font-bold mb-1 text-black text-base">الاسم كاملًا</label>
            <div className="relative">
              <User className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={22} />
              <input
                type="text"
                className="outline-none w-full border rounded-md p-3 pr-12 text-right text-black text-base placeholder:text-gray-400 bg-white border-gray-400 shadow-md"
                placeholder="أدخل اسمك كاملًا"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
              />
            </div>
          </div>

          {/* الهاتف */}
          <div>
            <label className="block font-bold mb-1 text-black text-base">رقم الهاتف</label>
            <div className="w-full border rounded-md p-3 flex items-center bg-white border-gray-400 shadow-md" dir="rtl">
  <PhoneInput
    countryCodeEditable={false}
    country="eg"
    value={formData.phone}
    onChange={(value) => {
      // إزالة الصفر بعد كود الدولة (20) إن وجد
      let cleanedValue = value;

      if (cleanedValue.startsWith('20') && cleanedValue[2] === '0') {
        cleanedValue = '20' + cleanedValue.slice(3);
      }

      updateField("phone", cleanedValue);
    }}
    placeholder="رقم الهاتف"
    enableSearch
    specialLabel=""
    inputStyle={{
      direction: "ltr",
      textAlign: "left",
      color: "#000",
      background: "transparent",
      border: "none",
      outline: "none",
      padding: "0.5rem 1rem",
      paddingLeft: "2.5rem",
      fontSize: "16px"
    }}
    buttonStyle={{ border: "none", background: "transparent" }}
    containerStyle={{ direction: "ltr", display: "flex", alignItems: "center", color: "#000" }}
  />
</div>
          </div>

          {/* المحافظة */}
          <div className="text-black">
            <label className="block font-bold mb-1 text-base">المحافظة</label>
            <BottomSelectField
              title="المحافظة"
              placeholder="اختر المحافظة"
              selectedValue={formData.governorate}
              options={governorates.map(g => g.name_ar)}
              onSelect={handleGovSelect}
              icon={<LandmarkIcon size={22} />}
            />
          </div>

          {/* المدينة */}
          <div className="text-black">
            <label className="block font-bold mb-1 text-base">المدينة</label>
            <BottomSelectField
              title="المدينة"
              placeholder="اختر المدينة"
              selectedValue={formData.city}
              options={cities.map(c => c.name_ar)}
              onSelect={handleCitySelect}
              icon={<Building2 size={22} />}
              canOpen={!!formData.governorateId}
              onBlockedOpen={() => setModal({ show: true, message: "اختر المحافظة أولاً" })}
            />
          </div>

          {/* المنطقة */}
          <div className="text-black">
            <label className="block font-bold mb-1 text-base">المنطقة</label>
            <BottomSelectField
              title="المنطقة"
              placeholder="اختر منطقتك او أقرب منطقة لك"
              selectedValue={formData.area}
              options={areas.map(a => a.name_ar)}
              onSelect={handleAreaSelect}
              icon={<MapPin size={22} />}
              canOpen={!!formData.cityId}
              onBlockedOpen={() => setModal({ show: true, message: "اختر المدينة أولاً" })}
            />
          </div>

          {/* تفاصيل العنوان */}
          <div className="text-black">
            <label className="block font-bold mb-1 text-base">تفاصيل العنوان</label>
            <div className="relative">
              <MapPin className="absolute right-3 top-3 text-gray-400" size={22} />
              <textarea
                className="w-full border rounded-md p-3 pr-12 text-right border-gray-400 shadow-md resize-none outline-none min-h-[100px] text-base"
                placeholder="ادخل تفاصيل العنوان ( الشارع، رقم المنزل، علامة مميزة )"
                value={formData.details}
                onChange={(e) => updateField("details", e.target.value)}
              />
            </div>
          </div>

          {/* ملخص */}
          <div className="flex items-center gap-2 border-t border-b border-gray-500 pt-4 py-4">
            <Map className="text-purple-600" size={24} />
            <div className="flex-1 text-right">
              <span className="font-bold text-purple-700 text-base">الموقع</span>
            </div>
          </div>

          <div><Toaster /></div>

          {/* زر الحفظ */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-700 to-orange-400 text-white font-bold py-3 text-lg rounded-lg shadow-lg hover:scale-[1.02] transition-all duration-300 mt-2"
          >
            حفظ
          </button>
        </form>
      </Container>
    </div>

    {/* المودال */}
    {modal.show && (
      <ErrorPopUP message={modal.message} setClose={setModal}/>
    )}
    {loading?(<Loading/>):( <></>)}
  </div>
);


};

export default Location;
