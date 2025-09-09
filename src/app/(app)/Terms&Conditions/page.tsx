'use client'

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Head from "next/head";
import SmartNavbar from "@/app/components/ui/Navbar";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TermsAndConditions() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!titleRef.current || !contentRef.current) return;

    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    const sentences = contentRef.current.querySelectorAll<HTMLSpanElement>(
      "span.sentence"
    );

    sentences.forEach((sentence) => {
      gsap.fromTo(
        sentence,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sentence,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    const headings = contentRef.current.querySelectorAll<HTMLHeadingElement>(
      "h2"
    );

    headings.forEach((heading) => {
      gsap.fromTo(
        heading,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          scrollTrigger: {
            trigger: heading,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <>
    <section className="mb-10">
      <SmartNavbar/>
    </section>
      <div
        className="min-h-screen  bg-gradient-to-br from-indigo-100 via-pink-100 to-yellow-100 py-12 px-4 sm:px-6 lg:px-8"
        ref={containerRef}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12" ref={titleRef}>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-btn-color mb-4">
              شروط وأحكام استخدام تطبيق حور بوك
            </h1>
        
          </div>

          <div className="space-y-8" ref={contentRef}>
            {/* مقدمة */}
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border-l-8 border-indigo-500">
              <span className="sentence block mb-2 text-gray-700">
                تحكم هذه الشروط والأحكام استخدامك لتطبيق حور بوك وتحدد الحقوق
                والالتزامات بينك (المستخدم) وصاحب التطبيق.
              </span>
              <span className="sentence block text-gray-700">
                من خلال الوصول إلى التطبيق أو استخدامه، فإنك توافق على
                الامتثال لهذه الشروط والأحكام.
              </span>
            </div>

            {/* 1. قبول الشروط */}
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border-l-8 border-indigo-500">
              <h2 className="text-2xl font-bold text-indigo-700 mb-4">1. قبول الشروط</h2>
              <span className="sentence block mb-2">
                <strong>1.1.</strong> بتنزيل أو تثبيت أو استخدام تطبيق حور بوك،
                فإنك توافق على الالتزام بهذه الشروط والأحكام.
              </span>
              <span className="sentence block">
                <strong>1.2.</strong> إذا لم توافق على أي جزء من هذه الشروط
                والأحكام، فيجب عليك عدم استخدام تطبيق حور بوك.
              </span>
            </div>

            {/* 2. حساب المستخدم */}
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border-l-8 border-blue-500">
              <h2 className="text-2xl font-bold text-blue-700 mb-4">2. حساب المستخدم</h2>
              <span className="sentence block mb-2">
                <strong>2.1.</strong> لاستخدام بعض ميزات تطبيق حور بوك، قد يُطلب
                منك إنشاء حساب مستخدم.
              </span>
              <span className="sentence block mb-2">
                <strong>2.2.</strong> أنت مسؤول عن الحفاظ على سرية معلومات
                حسابك وضمان أمانه.
              </span>
              <span className="sentence block">
                <strong>2.3.</strong> يجب عليك تقديم معلومات دقيقة وحديثة عند
                إنشاء حسابك.
              </span>
            </div>

            {/* 3. استخدام التطبيق */}
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border-l-8 border-purple-500">
              <h2 className="text-2xl font-bold text-purple-700 mb-4">3. استخدام التطبيق</h2>
              <span className="sentence block mb-2">
                <strong>3.1.</strong> توافق على استخدام تطبيق حور بوك لأغراض
                قانونية فقط وتطبيق جميع القوانين واللوائح المعمول بها.
              </span>
              <span className="sentence block mb-2">
                <strong>3.2.</strong> يجب عليك عدم القيام بأي أنشطة قد تضر أو
                تعطل وظيفة تطبيق حور بوك أو المستخدمين الآخرين.
              </span>
              <span className="sentence block">
                <strong>3.3.</strong> أنت مسؤول بشكل كامل عن أي محتوى تنشره أو
                تشاركه أو تنقله عبر تطبيق حور بوك.
              </span>
            </div>

            {/* 4. الملكية الفكرية */}
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border-l-8 border-indigo-500">
              <h2 className="text-2xl font-bold text-indigo-700 mb-4">4. الملكية الفكرية</h2>
              <span className="sentence block mb-2">
                <strong>4.1.</strong> تطبيق حور بوك، بما في ذلك تصميمه ورسوماته
                وشعاراته ومحتواه، هي ملكية فكرية لصاحب التطبيق ومحمية بقوانين
                حقوق النشر.
              </span>
              <span className="sentence block">
                <strong>4.2.</strong> لا يجوز لك نسخ أو تعديل أو توزيع أو
                استنساخ أي جزء من التطبيق دون إذن صريح من المالك.
              </span>
            </div>

            {/* 5. الخصوصية */}
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border-l-8 border-blue-500">
              <h2 className="text-2xl font-bold text-blue-700 mb-4">5. الخصوصية</h2>
              <span className="sentence block">
                <strong>5.1.</strong> نحن نهتم بخصوصيتك. جمع واستخدام المعلومات
                الشخصية يخضع لسياسة الخصوصية الخاصة بنا، والتي تُدرج ضمن هذه
                الشروط والأحكام.
              </span>
            </div>

            {/* 6. تحمل المسؤولية المحدودة */}
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border-l-8 border-purple-500">
              <h2 className="text-2xl font-bold text-purple-700 mb-4">6. تحمل المسؤولية المحدودة</h2>
              <span className="sentence block mb-2">
                <strong>6.1.</strong> تطبيق حور بوك يُقدم "كما هو" و"حسب
                التوفر" دون أي ضمانات أو ضمانات من أي نوع.
              </span>
              <span className="sentence block">
                <strong>6.2.</strong> صاحب التطبيق غير مسؤول عن أي أضرار مباشرة
                أو غير مباشرة أو عرضية أو تبعية أو عقابية تنشأ عن استخدام تطبيق
                حور بوك أو تتعلق به.
              </span>
            </div>

            {/* 7. تعديلات على الشروط */}
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border-l-8 border-indigo-500">
              <h2 className="text-2xl font-bold text-indigo-700 mb-4">7. تعديلات على الشروط والأحكام</h2>
              <span className="sentence block mb-2">
                <strong>7.1.</strong> يحتفظ صاحب التطبيق بحق تعديل أو تحديث هذه
                الشروط والأحكام في أي وقت دون إشعار مسبق.
              </span>
              <span className="sentence block">
                <strong>7.2.</strong> تتحمل مسؤولية مراجعة هذه الشروط والأحكام
                بشكل دوري للتعرف على أي تغييرات.
              </span>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200 text-center">
              <p className="text-gray-600">
                © {new Date().getFullYear()} تطبيق حور بوك. جميع الحقوق محفوظة.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
