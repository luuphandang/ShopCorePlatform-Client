import React from 'react';
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from '@/components/ui/breadcrumb';

export default function HandmadeHero() {
  return (
    <section className="text-center py-20 md:py-28 animate-fade-in-up bg-gradient-to-b from-secondary/50 to-white">
      <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-primary mb-4">
        Sản phẩm thủ công
      </h1>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        Các mặt hàng thủ công độc đáo được làm bằng sự chú ý đến từng chi tiết và vật liệu chất
        lượng. Mỗi sản phẩm được tạo ra bởi những nghệ nhân lành nghề của chúng tôi với tình yêu và
        sự chăm chút.
      </p>

      {/* <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Trang Chủ</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Handmade</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb> */}
    </section>
  );
}
