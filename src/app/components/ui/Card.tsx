import { type CardProps } from '@/app/lib/type'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Heart, Star } from 'lucide-react'
import Container from '../Container'
import { BaseUrl } from '../Baseurl'
import Logo from '../../../../public/asset/images/حورلوجو-1.png'
import Link from 'next/link'

export const Card: React.FC<CardProps> = ({
  id, name, description, image, category,
  price, discount, originalPrice,
  stock, soldOut = false, love = false, handellove = () => {},
  packet_pieces, packet_price, piece_price_after_offer,
  packet_price_after_offer, reviews_avg,piece_price,offer
}) => {
  const [loveit, setLove] = useState<boolean>(love)


  useEffect(() => {
    setLove(love)
  }, [love])

  const handleLoveToggle = () => {
    setLove(!loveit)
    handellove()
  }

  const renderStars = (rating?: number) => {
    const totalStars = 5
    const fullStars = rating ? Math.floor(rating) : 0
    const hasHalfStar = rating ? rating % 1 >= 0.5 : false

    return (
      <div className="flex items-center justify-end gap-1">
        {[...Array(totalStars)].map((_, i) => (
          <Star key={i} size={16}
            className={
              i < fullStars
                ? 'fill-yellow-400 text-yellow-400'
                : hasHalfStar && i === fullStars
                ? 'fill-yellow-300 text-yellow-300'
                : 'text-gray-300'
            }
          />
        ))}
        <span className="text-xs text-gray-500 font-medium">
          {typeof rating === 'number' ? `(${rating.toFixed(1)})` : '(بدون تقييم)'}
        </span>
      </div>
    )
  }

  return (
    <Container>
      <div className="group w-full max-w-[360px] md:w-[360px] min-h-[460px] rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-[#e8f3f0] to-[#f8f8f8] hover:shadow-xl transition relative mx-auto">
        
        {/* زر القلب */}
        <div className="absolute top-2 left-2 bg-pink-100 p-1 rounded-full cursor-pointer z-50" onClick={handleLoveToggle}>
          {loveit ? (
            <Heart size={18} className="text-pink-500" fill="#ec4899" stroke="#ec4899" />
          ) : (
            <Heart size={18} className="text-gray-500" fill="none" stroke="#6b7280" />
          )}
        </div>

        {/* أوفرلي عند الهوفر */}
        <div className="absolute inset-0 bg-[#6B2B7A]/80 flex flex-col items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <Link href={`/details/${id}`} className="text-white font-bold text-lg mb-2">
          
          <Image src={Logo} alt="Logo" width={220} height={220} className="w-[120px] h-[120px] object-contain rounded-full mb-4" unoptimized />
            </Link>
          <div dir="rtl">
            <Link href={`/details/${id}`} className="text-white font-bold text-lg mb-2">
              <button className="font-bold text-lg px-6 py-2 rounded-xl bg-[#ffc94d] transition w-full">عرض التفاصيل</button>
            </Link>
          </div>
        </div>

        {/* صورة المنتج */}
        <div className="relative w-full h-56">
           <Image src={`${BaseUrl}${image}`} alt={name} fill unoptimized className="object-contain rounded-t-2xl pt-5" />
        </div>

        {/* التفاصيل */}
        <div className="p-4 space-y-2 text-left" dir="rtl">
          {category && (
            <span className="text-xs font-medium text-gray-500 uppercase">
              {typeof category === 'string' ? category : category.name}
            </span>
          )}

          <h2 className="text-lg font-semibold text-gray-900 truncate">{name}</h2>

          <p className="text-sm text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">
            {description}
          </p>

          {renderStars(reviews_avg)}

          <div className="flex items-center justify-end mt-2">
            <div className="space-x-1 rtl:space-x-reverse">
              <span className="font-bold text-lg text-black">
              {(piece_price_after_offer===null||piece_price_after_offer=="")?(
                <span className='text-black' dir='rtl'>ج.م {piece_price} </span>
              ):(
                <>
                <span className='text-black ' dir='rtl'> {piece_price_after_offer} ج.م <br /><span className='text-gray-500 line-through'>{piece_price} ج.م</span></span>
                </>

              )}
              
              </span>
            
            </div>
            {discount && (
              <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs font-semibold">
                خصم {discount}%
              </span>
            )}
          </div>

      

          {typeof stock === 'number' && (
            <p className={`text-xs font-bold ${stock === 0 ? 'text-red-500' : stock <= 4 ? 'text-orange-300' : 'text-gray-600'}`}>
              {stock === 0 ? 'نفذت الكميه ' : stock <= 4 ? ` متبقى  ${stock} قطعة اطلبه الان `  : ``}
            </p>
          )}
          {Number(offer)>0?(
             <span className="inline-block absolute left-0 bottom-0 w-[100px] h-7 rounded-md bg-pink-100 text-black text-center leading-7">
     {offer}% خصم   
  </span>
          ):('')}
          {soldOut && (
            <span className="text-red-600 font-bold text-xl">نفذت الكمية</span>
          )}
        </div>
      </div>
    </Container>
  )
}