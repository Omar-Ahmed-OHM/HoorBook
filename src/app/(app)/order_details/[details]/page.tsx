"use client";

import { BaseUrl, headers } from "@/app/components/Baseurl";
import Container from "@/app/components/Container";
import { OrderData } from "@/app/lib/type";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Ban, RotateCcw } from "lucide-react";
import SmartNavbar from "@/app/components/ui/Navbar";
import { Moodel_Cancel } from "@/app/components/ui/Moodel_order";
import toast from "react-hot-toast";
import Link from "next/link";
import ErrorPopUP from "@/app/components/ui/pop-up_show_message_error";
import { useRouter } from "next/navigation"

export default function OrderDetails() {
  const router = useRouter();
  const pathname = usePathname();
  const order_id = pathname.split("/").pop();
  const get_order_by_id = `${BaseUrl}api/orders/${order_id}`;
  const [details, setDetails] = useState<OrderData>();
  const [cancel, setCancelOrder] = useState<boolean>(false);
  const [refundOrder, setrefundOrder] = useState<boolean>(false);
  const [selectedReason, setSelectedReason] = useState("");
  useEffect(() => {
    const getDetails = async () => {
      try {
        const res = await axios.get(get_order_by_id, { headers });
        setDetails(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getDetails();
  }, []);
  const cancelOrder = async (reason: string, status: string) => {
    try{
      const res=await axios.patch(get_order_by_id,{
        reason:reason,
        status:status
      },{headers})
      console.log(res);
      if(res.status === 200) {
        if (status === "cancel") {
        toast.success("تم إلغاء الطلب بنجاح");
                router.push('/orders');

        setCancelOrder(false);
      } else if (status === "refund") {
        toast.success("تم استرجاع الطلب بنجاح");
                router.push('/orders');

        setrefundOrder(false);
      } 
 0   }
  }
    catch(error){
      console.log(error);
     
      
    }
  }

  if (!details) return <div className="p-6 text-center">جاري تحميل التفاصيل...</div>;
  const reasonsList = [
    "التأخر فى التسليم ",
    "خدمه العملاء غير مرضية",
    "قرار شخصى بعدم شراء المنتج",
    "عدم وجود معلومات كافيه عن المنتج",
    "توفر المنتج فى مكان اخر بسعر ارخص ",
    "طلب المنتج عن طريق الخطأ",
    "اسباب أخرى"
  ];


    const reasonsrefund = [
    "المنتج وصندوق الشحن تالفان",
    "المنتج لا يفى بلتوقعات",
    "غير متوافق او غير مفيد",
    "يتوفر بسعر افضل فى مكان أخر",
    "لم اعد بحاجه اليه ",
    "تم ارسال منتج خطأ",
    "اريد ارجاع بعض من المنتجات",
    "اسباب أخرى"
  ];

return (
  <section className="py-8 bg-gradient-to-br from-indigo-50 via-pink-50 to-yellow-50">
    <div className="pb-32 md:pb-20">
      <SmartNavbar />
    </div>

    <Container>
      {/* Header */}
     {/* Buttons */}
<div className="flex gap-3">
  {["Pending", "Processing"].includes(details.status) && (
    <button 
      onClick={() => { setCancelOrder(!cancel), setrefundOrder(false) }} 
      className="flex items-center gap-2 mb-4  px-4 py-2 text-sm text-white bg-red-600 rounded-xl hover:bg-red-700 transition"
    >
      <Ban size={18} /> إلغاء
    </button>
  )}

  {details.status === "Delivered" && details.refund && (
    <button 
      onClick={() => { setrefundOrder(!refundOrder), setCancelOrder(false) }} 
      className="flex items-center mb-4 gap-2 px-4 py-2 text-sm text-white bg-yellow-500 rounded-xl hover:bg-yellow-600 transition"
    >
      <RotateCcw size={18} /> استرجاع
    </button>
  )}
</div>


      {/* Order Info + Address */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Order Info */}
        <div className="bg-gradient-to-br from-white via-indigo-50 to-indigo-100 border border-indigo-200 shadow-md rounded-xl p-5 h-full">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">بيانات الطلب</h2>
          <div className="space-y-2 text-sm text-gray-700">
<div className="flex items-center gap-2">
  <span className="text-sm text-gray-700 font-semibold">الحالة:</span>
  <span
    className={`text-xs rounded-full font-semibold
      ${details.status === "Pending" || details.status === "Processing"
        ? " text-yellow-600"
        : details.status === "Cancelled"
        ? " text-red-600"
        : details.status === "Shipped"
        ? " text-blue-600"
        : details.status === "Delivered"
        ? " text-green-600"
        : details.status === "Refund" && details.payment_status === "Refunded"
        ? " text-green-600"
        : details.status === "Refund"
        ? " text-orange-600"
        : " text-gray-600"}`}
  >
    {details.status === "Pending"
      ? "في المراجعة"
      : details.status === "Processing"
      ? "فى التجهيز"
      : details.status === "Shipped"
      ? "خرج للتوصيل"
      : details.status === "Delivered"
      ? "تم التوصيل"
      : details.status === "Cancelled"
      ? "تم الإلغاء"
      : details.status === "Refund" && details.payment_status === "Refunded"
      ? "تم الارجاع"
      : details.status === "Refund"
      ? "جاري مراجعة إرجاع الطلب"
      : "غير معروف"}
  </span>
</div>


       <p><strong>حالة الدفع:</strong> {details.payment_type=="Cash On Delivery"?"الدفع عند الاستلام":"بطاقة الدفع"}</p>            <p><strong>الإجمالي:</strong> {details.total} جنيه</p>
               <p><strong>الخصم:</strong> {details.discount} ج.م</p>
            <p><strong>خصم النقاط:</strong> {details.points_discount} ج.م</p>
            <p><strong>ملاحظات:</strong> {details.notes}</p>
            <p><strong>تم الإنشاء:</strong> {details.created_at}</p>
          </div>
        </div>

        {/* Address */}
        <div className="bg-gradient-to-br from-white via-yellow-50 to-yellow-100 border border-yellow-200 shadow-md rounded-xl p-5 h-full">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">عنوان التوصيل</h2>
          <div className="space-y-2 text-sm text-gray-700">
            <p><strong>الاسم:</strong> {details.address.full_name}</p>
            <p><strong>المنطقة:</strong> {details.address.area}, {details.address.city}</p>
            <p><strong>المحافظة:</strong> {details.address.governorate}</p>
            <p><strong>التفاصيل:</strong> {details.address.address_details}</p>
            <p><strong>الهاتف:</strong> {details.address.phone}</p>
          </div>
        </div>
      </div>

      {/* المنتجات */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-5">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">المنتجات</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {details.order_meta.map((item) => (
            <Link 
            href={`/details/${item.product_id}`}
              key={item.id}
              className="border border-pink-200 rounded-xl p-4 shadow-md flex flex-col bg-gradient-to-br from-white via-pink-50 to-pink-100 hover:shadow-lg transition"
            >
              <img
                src={`${BaseUrl}${item.product.image}`}
                alt={item.product.name}
                className="w-full h-32 object-contain mb-3 rounded"
                
              />
              <h3 className="font-semibold text-base mb-1 text-gray-800">{item.product.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{item.product.desc}</p>
              <div className="mt-auto text-sm text-gray-700 space-y-1">
                <p><strong>الكمية:</strong> {item.qty}</p>
                <p><strong>السعر:</strong> {item.price_after_discount} جنيه</p>
                     <p><strong>النوع:</strong> {item.product_type==="Piece" ? "قطعة" : "دستة"}</p>
              </div>

  <div className="flex items-center gap-2">
{(item.color.code!=null)?(
<>
  <span className='text-gray-500' > اللون:</span>
  <span
  className="w-4 h-4 rounded border"
  style={{ backgroundColor: `${item.color?.code}` }}
  ></span>
  </>
):('')}
  </div>

            </Link>
          ))}
        </div>
      </div>
      {cancel && (

        <Moodel_Cancel
        reasons={reasonsList}
        label={"الالغاء"}
        reason={selectedReason}
        status={"cancel"}
        setReason={setSelectedReason}
        cancelOrder={cancelOrder}
          onClose={()=>{setCancelOrder(false)}}

        />
      )}
      {refundOrder && (
        <Moodel_Cancel
          reasons={reasonsrefund}
          reason={selectedReason}
        label={"الارجاع"}

          status={"refund"}
          setReason={setSelectedReason}
          cancelOrder={cancelOrder}
          onClose={()=>{setrefundOrder(false)}}
        />
      )}
   
    </Container>
  </section>
);

}
