"use client";
import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import { AddressData } from "../../lib/type";
import EditAddressPoppup from "../../components/ui/EditAddressPoppup";
import { Sparkles, MapPin, Edit2, Trash } from "lucide-react";
import axios from "axios";
import { BaseUrl, headers } from "../../components/Baseurl";
import SmartNavbar from "@/app/components/ui/Navbar";
import Loading from "@/app/components/ui/loading";
import toast from "react-hot-toast";
const EditLocationPage = () => {
    const [editOpen, setEditOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState<AddressData | null>(
        null
    );
    const [address, setAddress] = useState<AddressData[]>([]);
    const [loading, setLoading] = useState(true);
const delete_address=`${BaseUrl}api/address/`;

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const res = await axios.get(`${BaseUrl}api/address`, {
                    headers,
                });
                if (Array.isArray(res.data?.data?.data)) {
                    setAddress(res.data.data.data);
                    setLoading(false);
                    console.log(res.data.data.data);
                } else {
                    toast.error("العناوين غير متوفرة بشكل صحيح");
                }
            } catch (err) {
                toast.error("فشل تحميل العناوين:");
            }
        };

        fetchAddresses();
    }, []);

    const handleSave = () => {
        setEditOpen(false);
        setLoading(true);
        axios.get(`${BaseUrl}api/address`, { headers })
            .then(res => {
                setAddress(res.data.data.data || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };
const handeldelete_address = (id: number) => {
    setLoading(true)
  axios.delete(`${delete_address}${id}`, { headers })
    .then(res => {
      if (res.data.status) {
        toast.success("✅ تم حذف العنوان بنجاح");
        setAddress(prev => prev.filter(addr => addr.id !== id));
        setLoading(false)
      } else {
        toast.error("❌ فشل حذف العنوان");
        setLoading(false)
      }
    })
    .catch(err => {
      console.error("🚨 خطأ في حذف العنوان:", err);
      toast.error("⚠️ حدث خطأ أثناء حذف العنوان");
    });
};

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-orange-100 flex items-center justify-center py-10 px-2">
            <div className="pb-20 md:pb-10">

            <SmartNavbar />
            </div>
            <Container>
                <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-4xl space-y-6 border border-purple-100 mt-20">
                    <div className="flex flex-col items-center space-y-2">
                        <h2 className="text-2xl font-bold text-purple-800 text-center flex items-center gap-1">
                            <Sparkles className="w-5 h-5 text-orange-400 animate-bounce" />
                             العناوين
                        </h2>
                    </div>
                    {loading ? (
                        <div className="text-center text-gray-600">
                            جاري التحميل...
                        </div>
                    )  : address.length === 0 ? (
                        <div className="text-center text-gray-600">
                            لا توجد عناوين محفوظة
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {address.map((addr) => (
                                <div
                                    key={addr.id}
                                    className="bg-purple-50 border border-purple-200 rounded-xl p-4 flex items-center gap-3 shadow-md min-w-0 break-words">
                                    <div className="flex-1 min-w-0">
                                        <div className="font-bold text-purple-700 mb-1 flex items-center gap-1 min-w-0 break-words">
                                            <MapPin
                                                className="inline-block text-purple-600"
                                                size={18}
                                            />
                                            <span className="truncate">
                                                {addr.full_name}
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-700 min-w-0 break-words">
                                            {addr.address_details},{" "}
                                            {addr.area.name}, {addr.city.name}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1 min-w-0 break-words">
                                            {addr.phone}
                                        </div>
                                    </div>
                                    <div className="flex justify-center gap-4">

                                    <button
                                        className="p-2 rounded-full hover:bg-purple-200 transition"
                                        title="تعديل"
                                        onClick={() => {
                                            setSelectedAddress(addr);
                                            setEditOpen(true);
                                        }}>
                                        <Edit2
                                            className="text-gray-700 hover:text-purple-700 transition"
                                            size={20}
                                        />
                                    </button>
                                    <button className=" hover:bg-purple-200 transition p-2 md:p-2 rounded-full" title="حذف">
                                            <Trash
                                                className="inline-block text-purple-600"
                                                size={20}
                                                onClick={()=>{handeldelete_address(addr.id)}}
                                                />

                                    </button>
                                                </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </Container>
            {/* Popup for editing address */}
            <EditAddressPoppup
                open={editOpen}
                address={selectedAddress}
                onClose={() => setEditOpen(false)}
                onSave={handleSave}
            />
        </div>
    );
};

export default EditLocationPage;
