"use client";
import Container from "./components/Container";
import { Card } from "./components/ui/Card"; 
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Slider } from "./components/ui/Slider";
import { Circle } from "./components/ui/Circle";
import { useEffect, useState } from "react";
import SliderSkeleton from "./components/ui/SliderSkeleton";
import LogoImageAnimation from "./components/ui/Loader";
import { HomeStore } from "./store/useHomeDataStore";
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay, FreeMode } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import SmartNavbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";
import Link from "next/link";
import { ApiResponse, Favorit } from "./lib/type";
import { BaseUrl, headers } from "./components/Baseurl";
import { CallApi } from "./lib/utilits";
import Cookies from "js-cookie";
import { LoginRequiredModal } from "./components/ui/Pop-up-login";
import toast from "react-hot-toast";

export default function HomePage() {
   const { data, loadingdata, fetchHomeData } = HomeStore();
  const [show, setShow] = useState(true);
  const [login,setlogin]=useState<boolean>(false)
const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
const token = Cookies.get("access_token_login");
  
const url =`${BaseUrl}api/products/favourite`


const [favoriteProducts, setFavoriteProducts] = useState<number[]>([]);



  useEffect(() => {

        const hasShownLoader = sessionStorage.getItem("hasShownLoader");
    if (hasShownLoader) {
      setShow(false);
    } else {
      setTimeout(() => {
        setShow(false);
        sessionStorage.setItem("hasShownLoader", "true");
      }, 2000); 
    }
  if (!data || data.sliders?.length === 0) {
    fetchHomeData();
  }

  }, []);

const handelfavorit = async (id: number) => {
  try {
    if(!token){
      setlogin(true)
      console.log(login);
      
     return;
    }
    setlogin(false)
    const dataToSend = { product_id: id };
    const res: ApiResponse<Favorit> = await CallApi("post", url, dataToSend, headers);
    console.log('Accepted', res);
    toast.success("تم اضافه منتج الى المفضله ");
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
  );
      
  
  } catch (error) {
    toast.error("خطأ فى اضافه المنتج برجاء اعاده المحاوله")
    console.log(error);
  }
};


function chunkArray<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

  return (
    <section className="bg-white">
      {show?(
        <LogoImageAnimation/>
      ):
    (
      <>
      {loadingdata ?(
        <SliderSkeleton/>
      ):(
    <>
 <SmartNavbar/>
    
    
    <Container >
    <div className="max-w-screen-xl mx-auto">
<div className="absolute inset-x-0 top-[20px]  h-[250px] sm:h-[350px] md:h-[500px] lg:h-[600px] z-0 pointer-events-none overflow-hidden w-full aspect-[1440/220] sm:aspect-[1440/300] lg:aspect-[1440/400] ">
  <svg
    viewBox="0 0 1440 220"
    className="w-full h-full"
    preserveAspectRatio="none"
  >
    <defs>
      <linearGradient id="gradient" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="#F5EFFF" />
        <stop offset="100%" stopColor="#fdfbff" />
      </linearGradient>
    </defs>
    <path
      fill="url(#gradient)"
      fillOpacity="1"
      d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,224C672,224,768,192,864,165.3C960,139,1056,117,1152,122.7C1248,128,1344,160,1392,176L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
    />
  </svg>
</div>

    
    
    
   <div className="w-full bg-white mt-[120px] sm:mt-[100px] md:mt-[100px] relative">

    <div className="max-w-screen-xl mx-auto  p-5 text-black z-[10000]">
    {data?.sliders?.length > 0 &&(
    <Slider
    items={data.sliders}
    height="h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px]"
    objectFit="cover"
    showNavigation={true}
    showPagination={true}
    autoPlayDelay={6000}
  
    />
    )}
    
    
    </div>
    </div>
    
    
    
    
    <div className="w-full bg-white mt-3">
    
    <div className="p-5 overflow-x-auto scrollbar-hide space-x-reverse flex flex-row-reverse cursor-grab ">
<Swiper
  dir="rtl"
  spaceBetween={12}
  slidesPerView="auto"
  grabCursor={true}
  modules={[FreeMode]}
  freeMode={{ enabled: true, sticky: false }}
  className="px-4"
>
  {chunkArray(data.categories, 2).map((group, index) => (
    <SwiperSlide key={index} style={{ width: 'auto' }}>
      <div className="flex flex-col gap-4"> 
        {group.map((image) => (
          <Link key={image.id} href={`/Categories/${image.id}`}>
            <Circle
              id={image.id}
              image={image.image}
              name={image.name}
            />
          </Link>
        ))}
      </div>
    </SwiperSlide>
  ))}
</Swiper>

    </div>
    </div>
    
    
   <div className="w-full bg-white mt-6 relative shadow-sm rounded-xl">
      <div className="flex justify-center items-center text-2xl mb-4">
      <h2
  className="text-btn-color font-bold text-[26px] sm:text-[30px] mb-4 tracking-tight"
>
  الأكثر مبيعاً
</h2>

      </div>

      <Swiper
        dir="rtl"
        modules={[Autoplay, Navigation]}
        spaceBetween={18}
        slidesPerView={4}
        slidesPerGroup={1}
        loop={true}
        autoplay={{
          delay: 6500,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: '.custom-swiper-button-next',
          prevEl: '.custom-swiper-button-prev',
        }}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 3 },
        }}
        className="relative px-4 sm:px-6 lg:px-8"
      >
        {data.topSelling?.map((image, index) => (
          <SwiperSlide key={index}>
  <div 
    className="px-1 transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
    
  >
<Card 
  {...image} 
  love={(image.user_favourite)} 
  handellove={() => handelfavorit(image.id)} 
/>

  </div>
</SwiperSlide>



        ))}

        <div className="custom-swiper-button-prev absolute top-1/2 -translate-y-1/2 left-2 z-50 bg-white text-[#6B2B7A] shadow-md hover:bg-gray-100 p-2 rounded-full cursor-pointer transition">
          <ChevronLeft size={24} />
        </div>
        <div className="custom-swiper-button-next absolute top-1/2 -translate-y-1/2 right-2 z-50 bg-white text-[#6B2B7A] shadow-md hover:bg-gray-100 p-2 rounded-full cursor-pointer transition">
          <ChevronRight size={24} />
        </div>
      </Swiper>
    </div>
    
    
    
    
   
   <div className="w-full bg-white mt-6 relative shadow-sm rounded-xl">
      <div className="flex justify-center items-center text-xl mb-4">
        <h2 className="text-btn-color font-bold text-[20px] sm:text-[30px] mb-4 tracking-tight">    عروض مميزة
</h2>
      </div>

      {/* السلايدر */}
      <Swiper
        dir="rtl"
        modules={[Autoplay, Navigation]}
        spaceBetween={24}
        slidesPerView={4}
        slidesPerGroup={1}
        loop={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: '.custom-swiper-button-next',
          prevEl: '.custom-swiper-button-prev',
        }}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 3 },
        }}
        className="relative px-6"
      >
        {data.hotDeals?.map((image, index) => (
        <SwiperSlide key={index}>
  <div
    className="px-1 transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
  >
<Card 
  {...image} 
  love={favoriteProducts.includes(image.id)} 
  handellove={() => handelfavorit(image.id)} 
/>
  </div>
</SwiperSlide>
        ))}

        <div className="custom-swiper-button-prev absolute top-1/2 -translate-y-1/2 left-2 z-50 bg-white text-[#6B2B7A] shadow-md hover:bg-gray-100 p-2 rounded-full cursor-pointer transition">
          <ChevronLeft size={24} />
        </div>
        <div className="custom-swiper-button-next absolute top-1/2 -translate-y-1/2 right-2 z-50 bg-white text-[#6B2B7A] shadow-md hover:bg-gray-100 p-2 rounded-full cursor-pointer transition">
          <ChevronRight size={24} />
        </div>
      </Swiper>
    </div>
    
    
  <div className="w-full bg-white mt-3">
  {data.categoriesWithProducts?.map((item) => (
    <div key={item.id} className="mb-6 relative">
     <div className="flex justify-between items-center mb-2">
  <p className="text-btn-color font-bold text-[16px] md:text-[20px] tracking-tight text-center px-4">
    {item.name}
  </p>
  <Link
    href={`/Categories/${item.id}`}
    className="text-btn-color font-bold text-[16px] underline sm:text-[30px] md:text-[16px] tracking-tight text-center px-4"
  >
    عرض المزيد
  </Link>
</div>


      <Swiper
        dir="rtl"
        modules={[Autoplay, Navigation]}
        spaceBetween={24}
        slidesPerView={4}
        slidesPerGroup={1}
        loop={true}
        autoplay={{
          delay: 6100,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: `.swiper-button-next-${item.id}`,
          prevEl: `.swiper-button-prev-${item.id}`,
        }}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 3 },
        }}
        className="relative px-6"
      >
        {item.products.map((product,index) => (
        <SwiperSlide key={index}>
  <div
    className="px-1 transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
  >
    <Card {...product}  handellove={() => {handelfavorit(product.id)}} 
  love={favoriteProducts.includes(product.id)} 
    
    />
  </div>
</SwiperSlide>
        ))}

        {/* Navigation Buttons */}
        <div
          className={`swiper-button-prev-${item.id} absolute top-1/2 -translate-y-1/2 left-2 z-50 bg-white text-[#6B2B7A] shadow-md hover:bg-gray-100 p-2 rounded-full cursor-pointer transition`}
        >
          <ChevronLeft size={24} />
        </div>
        <div
          className={`swiper-button-next-${item.id} absolute top-1/2 -translate-y-1/2 right-2 z-50 bg-white text-[#6B2B7A] shadow-md hover:bg-gray-100 p-2 rounded-full cursor-pointer transition`}
        >
          <ChevronRight size={24} />
        </div>
      </Swiper>
    </div>
  ))}
</div>
    
    </div>
    
    <LoginRequiredModal show={login} />

    </Container>
<Footer/>
    </>
      )}
      </>

    )
    }



  </section>
  );
  } 