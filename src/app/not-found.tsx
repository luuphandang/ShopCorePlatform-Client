import Link from 'next/link';
import React from 'react';

export default function NotFound() {
  return (
    <main className="flex-grow flex items-center justify-center py-20">
      <div className="container px-4 md:px-6 mx-auto flex flex-col items-center text-center animate-fade-in-up">
        <h1 className="text-6xl md:text-8xl font-serif font-medium text-primary mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-serif text-primary/80 mb-8">
          Trang không tồn tại
        </h2>
        <p className="text-muted-foreground max-w-md mb-8">
          Trang bạn đang tìm kiếm có thể đã bị xóa, đã đổi tên hoặc tạm thời không khả dụng.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium bg-primary text-white rounded-md transition-all hover:bg-primary/90 active:scale-[0.98]"
        >
          Trở lại trang chủ
        </Link>
      </div>
    </main>
  );
}
