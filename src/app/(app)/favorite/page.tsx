"use client";

import { BaseUrl, headers } from "@/app/components/Baseurl";
import Container from "@/app/components/Container";
import { ApiResponse, CardProps, Favorit, PaginatedResponse } from "@/app/lib/type";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Card } from "@/app/components/ui/Card";
import SmartNavbar from "@/app/components/ui/Navbar";
import { CallApi } from "@/app/lib/utilits";
import toast from "react-hot-toast";
import Cookies from 'js-cookie'
import { LoginRequiredModal } from "@/app/components/ui/Pop-up-login";

export default function Favorite() {
  const [product, setProduct] = useState<CardProps[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [favorit,setfavorit]=useState<number[]>([])
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [auth,setauth]=useState<boolean>(false)
  const token=Cookies.get("access_token_login");

  const url_fav =`${BaseUrl}api/products/favourite`
const fetchFavorit = async () => {
  type ProductsResponse = ApiResponse<PaginatedResponse<CardProps>>;
  try {
    if(token){
      setauth(false)
      const url = `${BaseUrl}api/products?page=${page}&favourite=1`;
      const res = await axios.get<ProductsResponse>(url, {
        headers: headers,
      });
      
      setProduct(prev => {
        const ids = new Set(prev.map(p => p.id));
        const newProducts = res.data.data.data?.filter(p => !ids.has(p.id)) || [];
        return [...prev, ...newProducts];
      });
      
      setHasMore(!!res.data.data.links?.next);
      setPage(prev => prev + 1);
    }
    else(setauth(true))
  } catch (error) {
    console.error("Error fetching favorites:", error);
  }
};


  useEffect(() => {
    fetchFavorit();
  }, []);

  useEffect(() => {
    if (!loaderRef.current || !hasMore) return;

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        fetchFavorit();
      }
    });

    observer.observe(loaderRef.current);

    return () => {
      observer.disconnect();
    };
  }, [loaderRef.current, hasMore]);


  const handellove = async (id: number) => {
    try {
      const dataToSend = { product_id: id };
      const res: ApiResponse<Favorit> = await CallApi('post', url_fav, dataToSend, headers);
      console.log(res.message);
    toast.success("تم ازاله منتج من المفضله ");

      setfavorit((prev) =>
        prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
      );
      setProduct((prev) => prev.filter(item => item.id !== id))
    } catch (error) {
      console.log(error);
      toast.error("خطأ فى ازاله المنتج")
    }
  }
  return (
    <section>
    <div className="pb-12 md:pb-4">

      <SmartNavbar />
      </div>
    <Container>
      
      <h2 className="text-2xl font-bold mb-4 ">المفضلة</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
      {product.map((p, index) => (
        <Card key={`${p.id}-${index}`} {...p}   handellove={() => handellove(p.id) }
      love={true} 
      offer={p.offer}

/>
      ))}
<LoginRequiredModal show={auth}/>
      </div>

      {hasMore && <div ref={loaderRef} className="h-10" />}
    </Container>
      </section>
  );
}
