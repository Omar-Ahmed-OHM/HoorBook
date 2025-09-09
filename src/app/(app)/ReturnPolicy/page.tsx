"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Head from "next/head";
import SmartNavbar from "@/app/components/ui/Navbar";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ReturnPolicy() {
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
        <SmartNavbar />
      </section>

      <div
        className="min-h-screen bg-gradient-to-br from-indigo-100 via-pink-100 to-yellow-100 py-12 px-4 sm:px-6 lg:px-8"
        ref={containerRef}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12" ref={titleRef}>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-btn-color mb-4">
              سياسة الاستبدال والاسترجاع لتطبيق حور بوك
            </h1>
          
          </div>

          <div className="space-y-8" ref={contentRef}>
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border-l-8 border-indigo-500">
              <span className="sentence block mb-2 text-gray-700">
                نحن في تطبيق حور بوك نولي اهتمامًا كبيرًا لرضا عملائنا ونسعى
                لتقديم خدمة عالية الجودة. لذلك، يسرنا أن نوضح لكم سياسة
                الاستبدال والاسترجاع الخاصة بنا:
              </span>
            </div>

            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border-l-8 border-indigo-500">
              <h2 className="text-2xl font-bold text-indigo-700 mb-4">1. الاستبدال</h2>
              <span className="sentence block mb-2">
                في حالة استلامكم لمنتج يحتوي على عيوب في الصناعة أو يختلف عن
                المنتج المطلوب، يمكنكم طلب عملية الاستبدال خلال فترة تصل إلى{" "}
                <strong>30 يومًا</strong> من تاريخ الشراء.
              </span>
              <span className="sentence block mb-2">
                يرجى التواصل مع خدمة العملاء لدينا لترتيب عملية الاستبدال.
              </span>
              <span className="sentence block mb-2">
                سنقوم بتوفير منتج بديل يتوافق مع متطلباتكم دون أي تكلفة إضافية
                عليكم.
              </span>
            </div>

            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border-l-8 border-blue-500">
              <h2 className="text-2xl font-bold text-blue-700 mb-4">2. الاسترجاع</h2>
              <span className="sentence block mb-2">
                إذا قررتم استرجاع المنتج وهو في حالته الأصلية وغير مستخدم،
                يمكنكم طلب عملية الاسترجاع خلال فترة تصل إلى <strong>14 يومًا</strong> من تاريخ الشراء.
              </span>
              <span className="sentence block mb-2">
                يجب إعادة المنتج إلينا بحالته الأصلية ومرفقًا بجميع الملحقات
                والعبوات الأصلية.
              </span>
              <span className="sentence block mb-2">
                سنقوم بإرجاع المبلغ المدفوع بالكامل عند استلامنا للمنتج
                والتحقق من حالته.
              </span>
              <span className="sentence block mb-2">
                يرجى ملاحظة أنه قد يتم تطبيق رسوم إعادة التوجيه أو شروط إضافية
                وفقًا لنوع المنتج وحالته. سيتم إشعاركم بأي رسوم إضافية قبل
                إتمام العملية.
              </span>
            </div>

            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border-l-8 border-purple-500">
              <span className="sentence block mb-2 text-gray-700">
                نأمل أن تكون هذه السياسة واضحة وشافية. إذا كان لديكم أي أسئلة
                أو استفسارات إضافية، فلا تترددوا في التواصل مع فريق خدمة
                العملاء لدينا.
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
