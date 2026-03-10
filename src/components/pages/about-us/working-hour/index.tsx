import { Building, Clock, Users } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function AboutUsWorkingHour() {
  return (
    <section className="py-16 md:py-24 bg-primary text-white">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center md:text-left">
            <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mb-6 mx-auto md:mx-0">
              <Building size={28} />
            </div>
            <h4 className="text-xl font-serif font-medium mb-4">Vị trí của chúng tôi</h4>
            <p className="text-white/80">
              253 Nữ Dân Công
              <br />
              Vĩnh Lộc A, Bình Hưng, Bình Chánh,
              <br />
              Hồ Chí Minh
            </p>
          </div>

          <div className="text-center md:text-left">
            <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mb-6 mx-auto md:mx-0">
              <Clock size={28} />
            </div>
            <h4 className="text-xl font-serif font-medium mb-4">Thời gian làm việc</h4>
            <ul className="space-y-2 text-white/80">
              <li>Thứ 2 - Thứ 6: 7:00 - 21:00</li>
              <li>Thứ 7 - Chủ Nhật: 7:00 - 20:00</li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mb-6 mx-auto md:mx-0">
              <Users size={28} />
            </div>
            <h4 className="text-xl font-serif font-medium mb-4">Liên hệ chúng tôi</h4>
            <p className="text-white/80 mb-4">
              Bạn có thắc mắc hoặc muốn tìm hiểu thêm về dịch vụ và sản phẩm của chúng tôi không?
            </p>
            <Link href="/contact">
              <Button variant="secondary" className="mt-2">
                Liên hệ với chúng tôi
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
