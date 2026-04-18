import type { Metadata } from "next";
import { SeniorModeProvider } from "@/components/layout/SeniorModeProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "悠居 - 中国首个旅居民宿平台 | 住进生活，居于山水",
  description:
    "悠居（YouJu）是中国首个专注旅居民宿的线上平台，为银发族、数字游民及旅居爱好者提供经过认证的长期住宿房源，覆盖300+城市。发现理想的第二居所，体验在地生活。",
  keywords: [
    "旅居",
    "民宿",
    "长租",
    "银发旅居",
    "数字游民",
    "悠居",
    "YouJu",
  ],
  openGraph: {
    title: "悠居 - 中国首个旅居民宿平台",
    description: "住进生活，居于山水。发现300+城市的旅居民宿。",
    siteName: "悠居 YouJu",
    locale: "zh_CN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">
        <SeniorModeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </SeniorModeProvider>
      </body>
    </html>
  );
}
