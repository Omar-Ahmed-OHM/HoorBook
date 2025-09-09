"use client"
import React from 'react'
import {type SwiperSliderProps } from '@/app/lib/type'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Container from '../Container'
import Image from 'next/image'
import { Autoplay, Pagination ,Navigation} from 'swiper/modules'
import Link from 'next/link'
import { BaseUrl } from '../Baseurl'
import clsx from 'clsx'

export const Slider:React.FC<SwiperSliderProps>=({
  items ,
  height = "h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px]",
  objectFit = "cover",
  showNavigation = true,
  showPagination = true,
  autoPlayDelay = 3000,
})=>{
    return (
      <Container>
         <div className="relative w-full max-w-screen-xl mx-auto">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation={showNavigation}
        pagination={showPagination ? { clickable: true } : false}
        autoplay={{ delay: autoPlayDelay }}
        loop
        className="w-full"
      >
{Array.isArray(items) && items.length > 0 && items.map((src, i) => (
  <SwiperSlide key={i}>
    {src.product.offer===0?
    <Link href={`/Categories/${src.product.category_id}`} className="block w-full h-full">
      <div className={`relative w-full ${height}`}>
        <Image
          src={`${BaseUrl}${src.image}`} 
          alt={`Slide ${i + 1}`}
          fill
          className={clsx("rounded-xl", {
            "object-cover": objectFit === "cover",
            "object-contain": objectFit === "contain"
          })}
          sizes="100vw"
          priority={i === 0}
          unoptimized
          />
      </div>
    </Link>
        :(
          <Link href={`/details/${src.product_id}`} className="block w-full h-full">
      <div className={`relative w-full ${height}`}>
        <Image
          src={`${BaseUrl}${src.image}`} 
          alt={`Slide ${i + 1}`}
          fill
          className={clsx("rounded-xl", {
            "object-cover": objectFit === "cover",
            "object-contain": objectFit === "contain"
          })}
          sizes="100vw"
          priority={i === 0}
          unoptimized
          />
      </div>
    </Link>
        )}
  </SwiperSlide>
))}

      </Swiper>

      {/* Custom button styling */}
      <style jsx global>{`
        .swiper-button-prev,
        .swiper-button-next {
          color: white;
          background-color: rgba(0, 0, 0, 0.6);
          padding: 12px;
          border-radius: 9999px;
          width: 40px;
          height: 40px;
          top: 50%;
          transform: translateY(-50%);
        }

        .swiper-button-prev::after,
        .swiper-button-next::after {
          font-size: 16px;
          font-weight: bold;
        }
      `}</style>
    </div>
      </Container>
    )
}