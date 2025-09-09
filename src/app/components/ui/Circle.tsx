import {type CategoryProps } from '@/app/lib/type'
import Image from 'next/image'
import React from 'react'
import Container from '../Container'
import { BaseUrl } from '../Baseurl'
import Link from 'next/link'
export const Circle:React.FC<CategoryProps>=({
    id,
    image,
    name
})=>{
    return(
        <Container>



<div dir="rtl" className="flex flex-col items-center space-y-2">

      <div className="w-24 h-24 rounded-md bg-[linear-gradient(135deg,_#e8f3f0,_#f8f8f8)] flex items-center justify-center overflow-hidden">
        <Image
          src={`${BaseUrl}${image}`}
          alt={name}
          width={70}
          height={70}
          className="object-contain"
          unoptimized
        />
      </div>
      <p className="text-sm font-bold text-center leading-tight text-gray-800">
        {name}
      </p>
    </div>



            </Container>
    )
}
