"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Head from "next/head";
import SmartNavbar from "@/app/components/ui/Navbar";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PrivacyPolicy() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!titleRef.current || !contentRef.current) return;

    // Animation للعنوان
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    // Animation للجمل
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

    // Animation للعناوين
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
        <SmartNavbar />
      </section>

      <div
        className="min-h-screen bg-gradient-to-br from-indigo-100 via-pink-100 to-yellow-100 py-12 px-4 sm:px-6 lg:px-8"
        ref={containerRef}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12" ref={titleRef}>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-btn-color mb-4">
              سياسة الخصوصية لتطبيق حور بوك
            </h1>
        
          </div>

          <div className="space-y-8" ref={contentRef}>
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border-l-8 border-indigo-500">
              <span className="sentence block mb-2 text-gray-700">
                نحن في تطبيق حور بوك نحرص على خصوصية المستخدمين وحماية بياناتهم
                الشخصية. يُرجى قراءة سياسة الخصوصية هذه لفهم كيفية جمع واستخدام
                وحماية المعلومات التي تُقدّم لنا عند استخدام التطبيق.
              </span>
            </div>

            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border-l-8 border-indigo-500">
              <h2 className="text-2xl font-bold text-indigo-700 mb-4">
                1. جمع المعلومات الشخصية
              </h2>
              <span className="sentence block mb-2">
                نحن قد نقوم بجمع بعض المعلومات الشخصية التي تُقدّمها طواعية عند
                التسجيل في التطبيق أو أثناء استخدامه. يشمل ذلك اسم المستخدم،
                عنوان البريد الإلكتروني، ومعلومات الاتصال الأخرى التي تُقدّمها.
              </span>
            </div>

            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border-l-8 border-blue-500">
              <h2 className="text-2xl font-bold text-blue-700 mb-4">
                2. استخدام المعلومات
              </h2>
              <span className="sentence block mb-2">
                نحن نستخدم المعلومات التي تم جمعها لتوفير وتحسين خدماتنا في
                تطبيق حور بوك. يمكن استخدام المعلومات لتخصيص تجربة المستخدم،
                معالجة الطلبات، تقديم المنتجات والخدمات المطلوبة، والتواصل مع
                المستخدمين.
              </span>
            </div>

            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border-l-8 border-purple-500">
              <h2 className="text-2xl font-bold text-purple-700 mb-4">
                3. مشاركة المعلومات
              </h2>
              <span className="sentence block mb-2">
                نحن لا نقوم ببيع أو تأجير أو مشاركة المعلومات الشخصية للمستخدمين
                مع أطراف ثالثة بطرق غير مذكورة في سياسة الخصوصية هذه، إلا إذا
                كانت هناك موافقة صريحة من المستخدم.
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
