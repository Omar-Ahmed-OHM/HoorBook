import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Providers from "./providers";
const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "700", "800"],
  variable: "--font-tajawal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hoor-Book ",
  description: "أفضل تجربة عربية بخط جميل",
 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${tajawal.variable} font-sans antialiased`}>
        <Providers>
        <Toaster/>
        {children}
        </Providers>
      </body>
    </html>
  );
}
