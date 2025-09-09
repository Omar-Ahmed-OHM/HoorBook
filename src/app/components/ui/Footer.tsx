import React from 'react'
import Image from 'next/image'
import Container from '../Container'
import {
  FaFacebookF,
  FaInstagram,
  // FaTwitter,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaLinkedin,
} from 'react-icons/fa'

import Logo from '../../../../public/asset/images/حورلوجو-1.png'
import Link from 'next/link'

const Footer: React.FC = () => {
    const  facebook = "https://www.facebook.com/profile.php?id=100091247261037&mibextid=ZbWKwL"
          const instagram = "https://instagram.com/hoorbook1?igshid=NGExMmI2YTkyZg=="
          const  linkedin = "https://www.linkedin.com/company/hoor-book/"
  return (
    <footer className="bg-[#6B2B7A] text-white mt-20 rounded-t-3xl shadow-2xl pb-3">
      <Container>
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Logo & About */}
          <div>
            <Image src={Logo} alt="Hoor Hyper Logo" width={150} height={75} className="mb-4" unoptimized/>
            <p className="text-sm leading-relaxed text-gray-100">
               تطبيق حور بوك – جميع احتياجاتك في مكان واحد .
            </p>
            <p className="text-sm leading-relaxed text-gray-100">
               عروض يومية، جودة مضمونة، وخدمة عملاء ممتازة.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <Link href={facebook} target='_blank' rel='nooper noreferrer' className="text-white hover:text-purple-200 transition"><FaFacebookF size={18} /></Link>
              <Link href={instagram} target='_blank' rel='nooper noreferrer' className="text-white hover:text-purple-200 transition"><FaInstagram size={18} /></Link>
              <Link href={linkedin} target='_blank' rel='nooper noreferrer' className="text-white hover:text-purple-200 transition"><FaLinkedin size={18} /></Link>
            </div>
             <div className="flex flex-col mt-6">

      <Link href="/Terms&Conditions" target="_blank" rel='nooper noreferrer' className="text-white hover:cursor-pointer hover:underline hover:text-gray-200">
        الشروط والأحكام
      </Link>

      <Link href="/PrivacyPolicy" target="_blank" rel='nooper noreferrer' className="text-white hover:cursor-pointer hover:underline hover:text-gray-200">
        سياسة الخصوصية
      </Link>

      <Link href="/ReturnPolicy" target="_blank" rel='nooper noreferrer' className="text-white hover:cursor-pointer hover:underline hover:text-gray-200">
        سياسة الاستبدال والاسترجاع
      </Link>
    </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-purple-300 pb-2">أقسامنا</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-gray-200">العروض اليومية</a></li>
              <li><a href="#" className="hover:text-gray-200">البقالة</a></li>
              <li><a href="#" className="hover:text-gray-200">خضار وفاكهة</a></li>
              <li><a href="#" className="hover:text-gray-200">أدوات منزلية</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-purple-300 pb-2">تواصل معنا</h3>
            <ul className="space-y-3 text-sm text-gray-100">
              <li className="flex items-center gap-2"><FaMapMarkerAlt /> الفرع الرئيسي: محافظة بنى سويف - بنى سويف</li>
              <li className="flex items-center gap-2"><FaPhoneAlt /> 01014163225</li>
              <li className="flex items-center gap-2"><FaPhoneAlt /> 01555051303</li>
              <li className="flex items-center gap-2"><FaEnvelope /> hoorbookapp@gmail.com</li>
            </ul>
          </div>

          {/* Promotions */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-purple-300 pb-2">عروضنا مستمرة!</h3>
            <p className="text-sm text-gray-100 leading-relaxed mb-3">
              استمتع بأقوى التخفيضات على آلاف المنتجات يوميًا. وفر أكتر وعيش تجربة تسوق ذكية من بيتك!
            </p>
            <ul className="list-disc list-inside text-sm text-purple-100 space-y-1">
              <li>توصيل سريع وآمن لجميع المحافظات</li>
              <li>خدمة عملاء 24/7</li>
              <li>خصومات نهاية الأسبوع %</li>
              <li>منتجات طازجة يوميًا</li>
            </ul>
            <div className="flex items-center gap-4 mt-6 text-white opacity-80">
              <FaCcVisa size={32} className="hover:opacity-100 transition" />
              <FaCcMastercard size={32} className="hover:opacity-100 transition" />
            </div>
            <div className='mt-6 text-center'>
              <h1 className='font-bold border-b border-purple-300 pb-2'>حمل تطبيق حور بوك واطلب الان</h1>
            <div className="grid grid-cols-3 items-center gap-4 mt-6">
              <Link href='https://play.google.com/store/search?q=hoorbook&c=apps&hl=en' target='_blank' rel='noopener noreferrer'>
                <Image src="/asset/images/GooglePlay.png" alt="Google Play" width={130} height={30} className="hover:opacity-80 transition" />
              </Link>
              <Link href='https://apps.apple.com/eg/app/hoorbook/id6478924342' target='_blank' rel='noopener noreferrer'>
                <Image src="/asset/images/App_Store.png" alt="App Store" width={130} height={30} className="hover:opacity-80 transition" />
              </Link>
              <Link href='https://appgallery.huawei.com/#/app/C109527291' target='_blank' rel='noopener noreferrer'>
                <Image src="/asset/images/AppGallery.png" alt="App Gallery" width={130} height={30} className="hover:opacity-80 transition" />
              </Link>
            </div>
            </div>
          </div>
        </div>
        {/* Bottom */}
        <div className="mt-10 border-t border-purple-400 pt-6 text-center text-sm text-gray-200">
          &copy; {new Date().getFullYear()} جميع الحقوق محفوظة – <span className="font-semibold">Hoor Hyper Market</span>
        </div>
      </Container>
    </footer>
  )
}

export default Footer