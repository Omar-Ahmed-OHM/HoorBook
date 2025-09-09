'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import logo from '../../../../public/asset/images/حورلوجو-1.png';

export default function LogoImageAnimation() {
  const logoRef = useRef(null);
  const containerRef = useRef(null);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setTimeout(() => setShowLoader(false), 200);
        },
      });

      tl.fromTo(
        logoRef.current,
        {
          opacity: 0,
          scale: 0.5,
          rotateY: 90,
          filter: 'blur(10px)',
        },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'power4.out',
        }
      );

      // أنيميشن الخروج
      tl.to(containerRef.current, {
        opacity: 0,
        y: -50,
        duration: 0.8,
        ease: 'power2.inOut',
        delay: 0.5,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (!showLoader) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#F5EFFF]"
    >
      <Image
        ref={logoRef}
        src={logo}
        alt="Hoor Book Logo"
        className="w-64 h-auto"
        unoptimized
      />
    </div>
  );
}
