'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, ShoppingCart, Heart, User2 , LayoutGrid,Package, Home, ScanBarcode  } from 'lucide-react'
import Logo from '../../../../public/asset/images/حورلوجو-1.png'
import { getCartLength } from '@/app/lib/api/cart'
import { useCartStore } from '@/app/store/cartStore'

const SmartNavbar = () => {
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
const { cartCount, refreshCartCount } = useCartStore()
  const controlNavbar = () => {
    const currentScrollY = window.scrollY
    setVisible(currentScrollY < lastScrollY || currentScrollY < 80)
    setLastScrollY(currentScrollY)
  }

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar)
    return () => window.removeEventListener('scroll', controlNavbar)
  }, [lastScrollY])


  useEffect(() => {
    refreshCartCount()
  }, [])
 return (
    <>
      <header
        dir="rtl"
        className={`fixed top-0 left-0 w-full z-[100] transition-transform duration-300 ${
          visible ? 'translate-y-0' : '-translate-y-full'
        } bg-gradient-to-tr from-[#6B2B7A] via-[#844C9A] to-[#6B2B7A] shadow-lg backdrop-blur-md`}
      >
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex flex-row items-center justify-between gap-6">
         <div className="flex flex-row md:justify-between items-center w-full md:gap-60 gap-2">
  <div className="w-full md:w-36 flex justify-center md:justify-start">
    <Link href="/" className="block">
      <Image
        src={Logo}
        alt="شعار"
        width={90}
        height={90}
        className="w-[60px] md:w-[70px] object-contain transition-all duration-300"
        unoptimized
      />
    </Link>
  </div>

  <div className="w-full md:w-full flex justify-center items-center">
    <Link href="/Products" className="w-full md:w-full flex justify-center items-center">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center bg-white/90 rounded-full px-4 py-2 shadow-inner focus-within:ring-2 focus-within:ring-yellow-400 transition">
          <Search className="text-gray-500 ml-2" size={18} />
          <input
            type="text"
            placeholder="إبحث عن منتج..."
            className="bg-transparent flex-1 text-sm focus:outline-none text-gray-700 placeholder:text-gray-400"
          />
        </div>
      </div>
    </Link>
  </div>

<div>

    <Link href={'/scanner'} className='flex text-white   flex-col items-center hover:text-pink-300 transition transform hover:scale-110'>
     <div className="p-2 rounded-full bg-white/10 hover:bg-pink-300/20 transition">
        <ScanBarcode size={18} />
      </div>
      <span  className='hidden md:block'>
    باركود
      </span>
    </Link>
</div>
</div>

          <div className="hidden md:flex justify-center items-center gap-4 text-white text-xs sm:text-sm w-full md:w-auto ">
            {IconsBlock(cartCount)}
          </div>
        </div>
      </header>

<div
  className={`fixed bottom-0 left-0 w-full z-[100]  lg:hidden transition-transform duration-300 ${
    visible ? 'translate-y-0' : 'translate-y-full'
  } bg-gradient-to-tr from-[#6B2B7A] via-[#844C9A] to-[#6B2B7A] shadow-inner px-6 py-2 flex justify-around items-center text-white text-xs`}
>
  {IconsBlock(cartCount)}
</div>

    </>
  )
}

const IconsBlock = (cartCount: number) => (
  <>

    <Link href="/" className="  flex flex-col items-center hover:text-pink-300 transition transform hover:scale-110">
      <div className="p-2 rounded-full bg-white/10 hover:bg-pink-300/20 transition">
        <Home size={18} />
      </div>
        الرئيسيه 
    </Link>

    <Link href="/dashboard" className="flex flex-col items-center hover:text-pink-300 transition transform hover:scale-110">
      <div className="p-2 rounded-full bg-white/10 hover:bg-pink-300/20 transition">
        <LayoutGrid size={18} />
      </div>
      الفئات
    </Link>

<Link
  href="/cart"
  className="flex flex-col items-center hover:text-yellow-400 transition transform hover:scale-110"
>
  <div className="relative p-2 rounded-full bg-white/10 hover:bg-yellow-400/20 transition">
    <ShoppingCart size={18} />
    
    {cartCount > 0 && (
      <span className="absolute -top-1 -left-1 bg-[#d2a400] text-white text-[12px] px-1.5 py-[1px] rounded-full font-bold">
        {cartCount}
      </span>
    )}
  </div>

  <span className="whitespace-nowrap">عربة التسوق</span>
</Link>



    <Link href="/orders" className="flex flex-col items-center hover:text-green-300 transition transform hover:scale-110">
      <div className="p-2 rounded-full text-white bg-white/10 hover:bg-green-300/20 transition">
        <Package size={18} />
      </div>
      الطلبات
    </Link>
    <Link href="/login" className="flex flex-col items-center hover:text-yellow-400 transition transform hover:scale-110">
      <div className="p-2 rounded-full bg-white/10 hover:bg-yellow-400/20 transition">
        <User2 size={18} />
      </div>
        الحساب
    </Link>
  </>
)

export default SmartNavbar