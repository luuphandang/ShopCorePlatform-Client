'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { TCategoriesQuery } from '@/graphql/@types/category.type';
import { ECategoryType, EPaginationType } from '@/graphql/@types/graphql.type';
import { useCategoriesQuery } from '@/graphql/hooks';

const Footer = () => {
  const [serviceCategories, setServiceCategories] = useState<TCategoriesQuery>([]);
  const [handmadeCategories, setHandmadeCategories] = useState<TCategoriesQuery>([]);

  const { data: serviceData } = useCategoriesQuery({
    where: { type: ECategoryType.Service },
    pagination: { pagination_type: EPaginationType.All },
    order: { created_at: 'DESC' },
  });
  useEffect(() => {
    if (serviceData?.categories?.data) {
      setServiceCategories(serviceData.categories.data);
    }
  }, [serviceData]);

  const { data: handmadeData } = useCategoriesQuery({
    where: { type: ECategoryType.Product },
    pagination: { pagination_type: EPaginationType.All },
    order: { created_at: 'DESC' },
  });
  useEffect(() => {
    if (handmadeData?.categories?.data) {
      setHandmadeCategories(handmadeData.categories.data);
    }
  }, [handmadeData]);

  return (
    <footer className="bg-primary text-white pt-16 pb-8 mt-auto">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-white/10">
          <div>
            <h4 className="font-serif text-lg font-medium mb-4">Photocopy99</h4>
            <p className="text-white/70 mb-6 leading-relaxed">
              Dịch vụ photocopy chuyên nghiệp và sản phẩm thủ công nghệ thuật ...
            </p>
            <div className="flex space-x-4 mb-6">
              <a
                href="https://www.facebook.com/share/16ChH98Dqv/?mibextid=wwXIfr"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/invites/contact/?igsh=1e52xuukpglo5&utm_content=11168cy"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="https://zalo.me/yourzaloid"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Zalo"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M8 8h8l-8 8h8" strokeWidth="3"></path>
                </svg>
              </a>
              <a
                href="tel:+84868941099"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Phone"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07A19.61 19.61 0 0 1 4.15 11a19.86 19.86 0 0 1-3.07-8.62A2 2 0 0 1 3 0h3a2 2 0 0 1 2 1.72 12.6 12.6 0 0 0 .7 2.8 2 2 0 0 1-.45 2.1L7.09 8.91a16 16 0 0 0 8 8l1.24-1.24a2 2 0 0 1 2.1-.45 12.6 12.6 0 0 0 2.8.7 2 2 0 0 1 1.72 2z"></path>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg font-medium mb-4">Dịch vụ</h4>
            <ul className="space-y-2">
              {serviceCategories?.map((category, index) => (
                <li key={index}>
                  <Link
                    className="text-white/70 hover:text-white transition-colors"
                    href={`/service/category/${category.slug}`}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-medium mb-4">Handmade</h4>
            <ul className="space-y-2">
              {handmadeCategories?.map((category, index) => (
                <li key={index}>
                  <Link
                    className="text-white/70 hover:text-white transition-colors"
                    href={`/handmade/category/${category.slug}`}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-medium mb-4">Giờ mở cửa</h4>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-white/70">Thứ 2 - Thứ 6:</span>
                <span>7:00 - 21:00</span>
              </li>
              <li className="flex justify-between">
                <span className="text-white/70">Thứ 7 - Chủ Nhật:</span>
                <span>7:00 - 20:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/70 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Photocopy99. All rights reserved.
          </p>

          <div className="flex space-x-6">
            <Link
              href="/privacy"
              className="text-white/70 text-sm hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-white/70 text-sm hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
Footer.displayName = 'Footer';

export { Footer };
