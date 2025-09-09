import React, { useState, useEffect } from "react";
import { AddressData } from "../../lib/type";
import BottomSelectField from "./checkbox";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Sparkles, Building2, LandmarkIcon, MapPin, User } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { BaseUrl, headers } from "../../components/Baseurl";
import { X } from "lucide-react";
import { buildPayload } from "./handleAddress";

interface EditAddressPoppupProps {
    open: boolean;
    address: AddressData | null;
    onClose: () => void;
    onSave?: () => void; // add this
}

const API_BASE = `${BaseUrl}api`;

const EditAddressPoppup: React.FC<EditAddressPoppupProps> = (props) => {
    const { open, address, onClose, onSave } = props;
    const [modal, setModal] = useState({ show: false, message: "" });
    const [governorates, setGovernorates] = useState<any[]>([]);
    const [cities, setCities] = useState<any[]>([]);
    const [areas, setAreas] = useState<any[]>([]);
    const [form, setForm] = useState<any>({
        name: "",
        phone: "",
        governorateId: "",
        cityId: "",
        areaId: "",
        details: "",
        governorate: "",
        city: "",
        area: "",
    });

        useEffect(() => {
        axios
            .get(`${API_BASE}/governorates`)
            .then((res) => setGovernorates(res.data.data))
            .catch(() => {
                setModal({ show: true, message: "فشل تحميل المحافظات" });
            });
    }, []);

    useEffect(() => {
        if (!form.governorate) return;
        const id = governorates?.find((g) => g.name_ar === form.governorate)?.id;
        axios
            .get(`${API_BASE}/cities?governorate_id=${id}`)
            .then((res) => setCities(res.data.data))
            .catch(() => {
                toast.error("فشل تحميل المدن");
            });
    }, [form.governorate]);

    useEffect(() => {
        if (!form.city) return;
        const id = cities?.find((c) => c.name_ar === form.city)?.id;
        axios
            .get(`${API_BASE}/areas?city_id=${id}`)
            .then((res) => setAreas(res.data.data))
            .catch(() => {
                toast.error("فشل تحميل المناطق");
            });
    }, [form.city]);

    useEffect(() => {
        if (address) {
            setForm({
                name: address.full_name || "",
                phone: address.phone || "",
                governorateId: address.governorate?.id || "",
                cityId: address.city?.id || "",
                areaId: address.area?.id || "",
                details: address.address_details || "",
                governorate: address.governorate?.name || "",
                city: address.city?.name || "",
                area: address.area?.name || "",
            });
        }
    }, [address]);

    const updateField = (field: string, value: string) => {
        setForm((prev: any) => ({ ...prev, [field]: value }));
    };

    const handleGovSelect = (value: string) => {
        const selected = governorates.find((g) => g.name_ar === value);
        updateField("governorate", value);
        updateField("governorateId", selected ? selected.id : "");
        updateField("city", "");
        updateField("cityId", "");
        updateField("area", "");
        updateField("areaId", "");
    };

    const handleCitySelect = (value: string) => {
        if (!form.governorateId)
            return setModal({ show: true, message: "اختر المحافظة أولاً" });
        const selected = cities.find((c) => c.name_ar === value);
        updateField("city", value);
        updateField("cityId", selected ? selected.id : "");
        updateField("area", "");
        updateField("areaId", "");
    };

    const handleAreaSelect = (value: string) => {
        if (!form.cityId)
            return setModal({ show: true, message: "اختر المدينة أولاً" });
        const selected = areas.find((a) => a.name_ar === value);
        updateField("area", value);
        updateField("areaId", selected ? selected.id : "");
    };

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose();
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const required = [
            "name",
            "phone",
            "governorateId",
            "cityId",
            "areaId",
            "details",
        ];
        const valid = required.every((key) => form[key as keyof typeof form]);
        if (!valid)
            return setModal({
                show: true,
                message: "يرجى ملء جميع الحقول المطلوبة",
            });

        try {
            const res = await axios.put(
                `${API_BASE}/address/${address?.id}`,
                buildPayload(form),
                { headers }
            );
            if (res.status === 200) {
                toast.success("تم تعديل العنوان بنجاح!");
                onClose();
                if (onSave) onSave();
            } else toast.error("حدث خطأ أثناء حفظ العنوان");
        } catch {
            toast.error("حدث خطأ أثناء حفظ العنوان");
        }
    };

    if (!open) return null;

    return (
        <div
  className="fixed inset-0 z-[1200] flex items-center justify-center bg-black bg-opacity-40 no_scrollbar"
  onClick={handleOverlayClick}
>

            <div className="bg-white rounded-3xl shadow-2xl p-4 sm:p-8 w-full max-w-md sm:max-w-lg md:max-w-xl space-y-6 border border-purple-100 relative mx-2 sm:mx-auto overflow-y-auto max-h-[70vh] md:max-h-[80vh] mt-20">
                <button
                    className="absolute top-1 right-3 p-2 rounded-full text-gray-500 hover:text-red-600 transition "
                    onClick={onClose}
                    title="إغلاق">
                    <X size={20} />
                </button>
                <h3 className="text-2xl font-bold mb-4 text-purple-800 text-center flex items-center gap-1">
                    تعديل العنوان
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-bold mb-1 text-black">
                            الاسم كاملًا
                        </label>
                        <div className="relative">
                            <User
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                size={20}
                            />
                            <input
                                type="text"
                                className="outline-none w-full border rounded-md p-3 pr-12 text-right text-black placeholder:text-gray-400 bg-white border-gray-400 shadow-md"
                                placeholder="أدخل اسمك كاملًا"
                                value={form.name}
                                onChange={(e) =>
                                    updateField(
                                        "name",
                                        e.target.value.replace(
                                            /[^a-zA-Z\u0600-\u06FF ]/g,
                                            ""
                                        )
                                    )
                                }
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block font-bold mb-1 text-black">
                            رقم الهاتف
                        </label>
                        <div
                            className="w-full border rounded-md p-3 flex items-center bg-white border-gray-400 shadow-md"
                            dir="rtl">
                            <PhoneInput
                                countryCodeEditable={false}
                                country="eg"
                                value={form.phone}
                                onChange={(value) =>
                                    updateField("phone", value)
                                }
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
                                }}
                                buttonStyle={{
                                    border: "none",
                                    background: "transparent",
                                }}
                                containerStyle={{
                                    direction: "ltr",
                                    display: "flex",
                                    alignItems: "center",
                                    color: "#000",
                                }}
                            />
                        </div>
                    </div>
                    <div className="text-black">
                        <label className="block font-bold mb-1">المحافظة</label>
                        <BottomSelectField
                            title="المحافظة"
                            placeholder="اختر المحافظة"
                            selectedValue={form.governorate}
                            options={governorates?.map((g) => g.name_ar)}
                            onSelect={handleGovSelect}
                            icon={<LandmarkIcon size={20} />}
                        />
                    </div>
                     <div className="text-black">
                                           <label className="block font-bold mb-1">المدينة</label>
                                           <BottomSelectField
                                               title="المدينة"
                                               placeholder="اختر المدينة"
                                               selectedValue={form.city}
                                               options={cities?.map((c) => c.name_ar)}
                                               onSelect={handleCitySelect}
                                               icon={<Building2 size={20} />}
                                               canOpen={!!form.governorateId}
                                               onBlockedOpen={() =>
                                                   setModal({
                                                       show: true,
                                                       message: "اختر المحافظة أولاً",
                                                   })
                                               }
                                           />
                                       </div>
                    <div className="text-black">
                                           <label className="block font-bold mb-1">المنطقة</label>
                                           <BottomSelectField
                                               title="المنطقة"
                                               placeholder="اختر منطقتك او أقرب منطقة لك"
                                               selectedValue={form.area}
                                               options={areas?.map((a) => a.name_ar)}
                                               onSelect={handleAreaSelect}
                                               icon={<MapPin size={20} />}
                                               canOpen={!!form.cityId}
                                               onBlockedOpen={() =>
                                                   setModal({
                                                       show: true,
                                                       message: "اختر المدينة أولاً",
                                                   })
                                               }
                                           />
                                       </div>
                    <div className="text-black">
                        <label className="block font-bold mb-1">
                            تفاصيل العنوان
                        </label>
                        <div className="relative">
                            <MapPin
                                className="absolute right-3 top-3 text-gray-400"
                                size={20}
                            />
                            <textarea
                                className="w-full border rounded-md p-3 pr-12 text-right border-gray-400 shadow-md resize-none outline-none"
                                placeholder="ادخل تفاصيل العنوان ( الشارع رقم المنزل ) وعلامة محددة"
                                value={form.details}
                                onChange={(e) =>
                                    updateField("details", e.target.value)
                                }
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-700 to-orange-400 text-white font-bold py-2 rounded-lg shadow-lg hover:scale-[1.02] transition-all duration-300 mt-2">
                        حفظ التعديلات
                    </button>
                </form>
            </div>
            {/* modal */}
                {modal.show && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl shadow-lg p-8 min-w-[300px] text-center">
                            <div className="mb-4 text-lg text-black">
                                {modal.message}
                            </div>
                            <button
                                className="text-purple-700 font-bold mt-2"
                                onClick={() =>
                                    setModal({ show: false, message: "" })
                                }>
                                تأكيد
                            </button>
                        </div>
                    </div>
                )}
        </div>
    );
};

export default EditAddressPoppup;