'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function HomeHero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-20 pb-16 md:pt-24 md:pb-24"
    >
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        // style={{
        //   backgroundImage: `url('https://flowrpool.com/wp-content/uploads/2020/01/Best-Blockchain-Stake-Pool-FLOWR.jpg)`,
        // }}
      >
        <div className="absolute inset-0 bg-white/0"></div>
      </div>

      <div className="container px-4 md:px-6 mx-auto grid lg:grid-cols-2 gap-10 items-center">
        <div className="flex flex-col space-y-6 animate-fade-in-up">
          <div className="space-y-2">
            <h2 className="font-serif text-sm md:text-base uppercase tracking-widest text-primary/80">
              Dịch vụ photocopy chất lượng cao và sản phẩm thủ công đẹp mắt
            </h2>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-primary">
              <div className="italic">Chất lượng tốt nhất</div>
              <div className="italic">Giá cả rẻ nhất</div>
              <div className="italic">Thời gian nhanh nhất</div>
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-lg leading-relaxed">
              Dịch vụ photocopy chuyên nghiệp kết hợp với các sản phẩm thủ công độc đáo. Trải nghiệm
              làm hài lòng khách hàng khó tính nhất.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link
              href="/service"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium bg-primary text-white rounded-md transition-all hover:bg-primary/90 active:scale-[0.98]"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Photocopy
            </Link>
            <Link
              href="/handmade"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium border border-primary/20 text-primary rounded-md transition-all hover:bg-secondary active:scale-[0.98]"
            >
              Handmade
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="hidden lg:block relative">
          <div className="relative w-full aspect-square rounded-md overflow-hidden bg-white animate-fade-in">
            <Image
              src="https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-ln79rkmy259v85"
              alt="Professional photocopier in modern office"
              className="w-full h-full object-cover"
              width={4000}
              height={4000}
            />
          </div>
          <div className="absolute -bottom-10 -left-10 w-3/4 aspect-square rounded-md overflow-hidden bg-white  shadow-xl animate-fade-in delay-1000">
            <Image
              src="https://shopmayphoto.com/wp-content/uploads/2021/09/scan-tai-lieu-la-gi.jpg"
              alt="Handcrafted paper products"
              className="w-full h-full object-cover"
              width={4000}
              height={4000}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
