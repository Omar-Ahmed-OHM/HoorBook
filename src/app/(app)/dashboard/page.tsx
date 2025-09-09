"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import Image from "next/image";
import { Menu } from "lucide-react"; // لو هتستخدم أيقونة (npm install lucide-react)
import SmartNavbar from "@/app/components/ui/Navbar";
import { BaseUrl } from "@/app/components/Baseurl";
import Link from "next/link";
interface Category {
  id: number;
  name: string;
  image: string;
}

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryPage, setCategoryPage] = useState(1);
  const [hasMoreCategories, setHasMoreCategories] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [productPage, setProductPage] = useState(1);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const categoryObserver = useRef<IntersectionObserver | null>(null);
  const productObserver = useRef<IntersectionObserver | null>(null);

  const lastCategoryRef = useCallback(
    (node: HTMLDivElement) => {
      if (loadingCategories) return;
      if (categoryObserver.current) categoryObserver.current.disconnect();
      categoryObserver.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMoreCategories) {
          setCategoryPage(prev => prev + 1);
        }
      });
      if (node) categoryObserver.current.observe(node);
    },
    [loadingCategories, hasMoreCategories]
  );

  const lastProductRef = useCallback(
    (node: HTMLDivElement) => {
      if (loadingProducts || !selectedCategoryId) return;
      if (productObserver.current) productObserver.current.disconnect();
      productObserver.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMoreProducts) {
          setProductPage(prev => prev + 1);
        }
      });
      if (node) productObserver.current.observe(node);
    },
    [loadingProducts, hasMoreProducts, selectedCategoryId]
  );

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const res = await axios.get(`${BaseUrl}api/products/categories?page=${categoryPage}&hasProducts=false`);
        const newCategories: Category[] = res.data.data.data;
        setCategories(prev => [...prev, ...newCategories]);
        setHasMoreCategories(res.data.data.meta.current_page < res.data.data.meta.last_page);

        if (categoryPage === 1 && newCategories.length > 0) {
          handleCategoryClick(newCategories[0].id);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
      setLoadingCategories(false);
    };

    fetchCategories();
  }, [categoryPage]);

  const handleCategoryClick = (categoryId: number) => {
      if (categoryId === selectedCategoryId) return;
    setSelectedCategoryId(categoryId);
    setProducts([]);
    setProductPage(1);
    setHasMoreProducts(true);
    setSidebarOpen(false);   
    console.log(categoryId);
     
  };

  useEffect(() => {
    if (selectedCategoryId === null) return;

    const fetchProducts = async () => {
      setLoadingProducts(true);
      try {
        const res = await axios.get(`${BaseUrl}api/products/categories?page=${productPage}&parent_id=${selectedCategoryId}`);
        const newProducts: Product[] = res.data.data.data;
        setProducts(prev => productPage === 1 ? newProducts : [...prev, ...newProducts]);
        setHasMoreProducts(res.data.data.meta.current_page < res.data.data.meta.last_page);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setLoadingProducts(false);
    };

    fetchProducts();
  }, [productPage, selectedCategoryId]);

  return (
      <div className="flex h-screen overflow-hidden bg-gradient-to-br from-indigo-100 via-pink-100 to-yellow-100">
        <div className="mb-16 ">
            <SmartNavbar/>
            </div>
      {/* Mobile Toggle */}
      
      <button
        className="md:hidden absolute top-32 left-4 z-50 bg-white p-2 rounded-full shadow-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu />
      </button>

     <aside
  className={`fixed top-16 right-0 md:static h-full w-64 p-4 transition-transform z-30 shadow-xl bg-gradient-to-b from-white via-blue-50 to-pink-100 overflow-y-auto border-l border-gray-300 ${
    sidebarOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
  }`}
>

        <h1 className="text-xl font-bold mb-4 pt-20  text-center text-gray-700">الفئات</h1>
        <div className="flex flex-col gap-2">
          {categories.map((cat, index) => {
            const ref = index === categories.length - 1 ? lastCategoryRef : undefined;
            const isSelected = selectedCategoryId === cat.id;
            return (
              <div
              key={`${index}-${cat.id}`}

                ref={ref}
                className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all ${
                  isSelected ? "bg-blue-200 font-semibold shadow" : "hover:bg-blue-100"
                }`}
                onClick={() => handleCategoryClick(cat.id)}
              >
                <Image
                  src={`${BaseUrl}${cat.image}`}
                  alt={cat.name}
                  width={30}
                  height={30}
                  className="object-contain"
                  unoptimized
                />
                <span className="text-sm text-gray-800">{cat.name}</span>
              </div>
            );
          })}
        </div>
      </aside>

      {/* Main Content */}
<main className="flex-1 overflow-y-auto p-6 pt-20 md:pt-24">

        <h2 className="text-2xl font-semibold mb-4 text-right text-gray-800">المنتجات</h2>

        {products.length === 0 && !loadingProducts && (
             <div className="flex justify-center items-center min-h-[60vh]">
      <div className="w-16 h-16 border-8 border-purple-600 border-t-transparent rounded-full animate-spin" />
    </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product, index) => {
            const ref = index === products.length - 1 ? lastProductRef : undefined;
            return (
        <div key={product.id} ref={ref}>
      <Link
        href={`/Categories/${product.id}`}
        className=" bg-white rounded-lg p-4  flex flex-col items-center shadow hover:shadow-md transition"
      >
        <Image
          src={`${BaseUrl}${product.image}`}
          alt={product.name}
          width={80}
          height={80}
          className="w-full h-20 object-contain mb-2"
        />
        <div className="text-center text-sm font-medium text-gray-800">
          {product.name}
        </div>
        <div className="text-xs text-gray-500 mt-1">{product.price}</div>
      </Link>
    </div>
            );
          })}
        </div>

        {(loadingCategories || loadingProducts) && (
          <p className="text-center mt-6 text-gray-700">جاري التحميل...</p>
        )}
      </main>
    </div>
  );
}
