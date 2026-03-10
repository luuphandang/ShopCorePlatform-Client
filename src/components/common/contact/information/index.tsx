import { Mail, MapPin, Phone } from 'lucide-react';

import {
  BUSINESS_DISTRICT,
  BUSINESS_PHONE,
  BUSINESS_PROVINCE,
  BUSINESS_STREET,
  BUSINESS_WARD,
} from '@/shared/constants/business';

export default function ContactInformation() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex items-start space-x-4">
        <div className="bg-white p-3 rounded-full shadow-sm">
          <MapPin className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h4 className="text-lg font-medium text-primary mb-1">Địa chỉ</h4>
          <p className="text-muted-foreground">{BUSINESS_STREET}</p>
          <p className="text-muted-foreground">
            {[BUSINESS_WARD, BUSINESS_DISTRICT, BUSINESS_PROVINCE].join(', ')}
          </p>
        </div>
      </div>

      <div className="flex items-start space-x-4">
        <div className="bg-white p-3 rounded-full shadow-sm">
          <Phone className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h4 className="text-lg font-medium text-primary mb-1">Điện thoại</h4>
          <p className="text-muted-foreground">{BUSINESS_PHONE}</p>
          <p className="text-muted-foreground">Thứ 2 - Thứ 6: 07:00 - 21:00</p>
          <p className="text-muted-foreground">Thứ 7 - Chủ Nhật: 07:00 - 20:00</p>
        </div>
      </div>

      <div className="flex items-start space-x-4">
        <div className="bg-white p-3 rounded-full shadow-sm">
          <Mail className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h4 className="text-lg font-medium text-primary mb-1">Email</h4>
          <p className="text-muted-foreground">photocopy99@gmail.com</p>
          <p className="text-muted-foreground">tngaa099@gmail.com</p>
        </div>
      </div>
    </div>
  );
}
