"use client"

import { BaseUrl, headers } from "@/app/components/Baseurl"
import Container from "@/app/components/Container"
import SmartNavbar from "@/app/components/ui/Navbar";
import { Order } from "@/app/lib/type";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaMoneyBillWave, FaMapMarkerAlt, FaBoxOpen, FaCalendarAlt } from "react-icons/fa";

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const getOrders = async (page_num: number) => {
    try {
      const res = await axios.get(`${BaseUrl}api/orders?page=${page_num}`, { headers });
      setOrders(res.data.data.data);
      setLastPage(res.data.data.meta.last_page);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getOrders(page);
  }, [page]);

  const handlePrev = () => {
    if (page > 1) setPage(prev => prev - 1);
  }

  const handleNext = () => {
    if (page < lastPage) setPage(prev => prev + 1);
  }

return (
  <section className="bg-gradient-to-br from-indigo-50 via-pink-50 to-yellow-50 min-h-screen">
    <div className="pb-32 md:pb-20">
      <SmartNavbar />
    </div>
    <Container>
      <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-900 tracking-wide">طلباتك</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {orders.map((order) => (
          <Link
          href={`/order_details/${order.id}`}
            key={order.id}
            className="bg-white rounded-3xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 max-w-xl w-full mx-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-indigo-600 font-bold text-lg">#{order.id}</h2>
              <span className={`text-xs px-3 py-1 rounded-full font-semibold ${order.status === "Pending" ? "bg-yellow-100 text-yellow-600" : "bg-green-100 text-green-600"}`}>
                {order.status}
              </span>
            </div>

            <div className="space-y-2 text-gray-700 text-sm">
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-indigo-500" />
                <span><span className="font-medium">التاريخ:</span> {order.created_at}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaMoneyBillWave className="text-green-500" />
                <span><span className="font-medium">الإجمالي:</span> {order.total} جنيه</span>
              </div>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-pink-500" />
                <span>{order.address.city} - {order.address.area}، {order.address.address_details}</span>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-1">
                <FaBoxOpen className="text-blue-500" />
                المنتجات:
              </h3>
              <ul className="space-y-1 bg-gray-50 rounded-xl px-4 py-2">
                {order.order_meta.map((item) => (
                  <li key={item.id} className="flex justify-between text-sm text-gray-800 border-b last:border-none pb-1">
                    <span>x{item.qty} - {item.price_after_discount} جنيه</span>
                  </li>
                ))}
              </ul>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-12 gap-6 items-center">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className={`flex items-center gap-2 px-5 py-2 rounded-full font-semibold text-white shadow-sm transition-all duration-200 ${
            page === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          ⬅ السابق
        </button>
        <span className="text-gray-800 font-semibold text-md">
          صفحة <span className="text-indigo-600 font-bold">{page}</span> من <span className="font-bold">{lastPage}</span>
        </span>
        <button
          onClick={handleNext}
          disabled={page === lastPage}
          className={`flex items-center gap-2 px-5 py-2 rounded-full font-semibold text-white shadow-sm transition-all duration-200 ${
            page === lastPage
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          التالي ➡
        </button>
      </div>
    </Container>
  </section>
);

}
