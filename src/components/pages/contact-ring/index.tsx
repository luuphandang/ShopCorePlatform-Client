'use client';

import { Facebook, Instagram, Phone } from 'lucide-react';
import Image from 'next/image';
import React, { Fragment, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { BUSINESS_FACEBOOK, BUSINESS_INSTAGRAM, BUSINESS_PHONE } from '@/shared/constants/business';

const ContactRing = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('zalo');

  const contactOptions = {
    phone: {
      icon: <Phone className="h-8 w-8 text-primary" />,
      title: 'Gọi ngay',
      qrData: `tel:${BUSINESS_PHONE}`,
      qrImage: null,
      actionText: BUSINESS_PHONE,
      url: `tel:${BUSINESS_PHONE}`,
      actionIcon: <Phone className="h-4 w-4" />,
    },
    facebook: {
      icon: <Facebook className="h-8 w-8 text-primary" />,
      title: 'Facebook',
      qrData: BUSINESS_FACEBOOK,
      qrImage: null,
      actionText: 'Trang Facebook',
      url: BUSINESS_FACEBOOK,
      actionIcon: <Facebook className="h-4 w-4" />,
    },
    zalo: {
      icon: (
        <Image
          className="h-8 w-8 text-primary"
          src="/icons/zalo-1.svg"
          alt="Zalo"
          width={4000}
          height={4000}
        />
      ),
      title: 'Zalo',
      qrData: 'https://zaloapp.com/qr/p/1a1d9x5lwjnc5',
      qrImage: '/images/zalo-qr.jpg',
      actionText: 'Zalo',
      url: 'https://zaloapp.com/qr/p/1a1d9x5lwjnc5',
      actionIcon: (
        <Image className="h-4 w-4" src="/icons/zalo-1.svg" alt="Zalo" width={4000} height={4000} />
      ),
    },
    instagram: {
      icon: <Instagram className="h-8 w-8 text-primary" />,
      title: 'Instagram',
      qrData: BUSINESS_INSTAGRAM,
      qrImage: null,
      actionText: 'Trang Instagram',
      url: BUSINESS_INSTAGRAM,
      actionIcon: <Instagram className="h-4 w-4" />,
    },
  };

  const selectedOption = contactOptions[selected as keyof typeof contactOptions];

  return (
    <Fragment>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setOpen(true)}
          className="bg-primary text-white rounded-full w-36 h-14 flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors"
          aria-label="Contact options"
        >
          Liên hệ
          <Phone className="h-6 w-6 ml-4 animate-wiggle" />
        </button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Liên hệ với chúng tôi</DialogTitle>
            <DialogClose className="absolute right-4 top-4" />
          </DialogHeader>

          <div className="flex flex-col space-y-6 py-4">
            {/* Contact Option Selector */}
            <RadioGroup
              value={selected}
              onValueChange={setSelected}
              className="flex justify-center gap-8"
            >
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`rounded-full p-4 cursor-pointer transition-colors ${
                    selected === 'zalo' ? 'bg-primary/20' : 'bg-secondary/50'
                  }`}
                >
                  <label htmlFor="zalo-option" className="cursor-pointer">
                    <Image
                      className={`h-8 w-8 ${
                        selected === 'zalo' ? 'text-primary' : 'text-muted-foreground'
                      }`}
                      src="/icons/zalo-1.svg"
                      alt="Zalo"
                      width={4000}
                      height={4000}
                    />
                  </label>
                </div>
                <RadioGroupItem value="zalo" id="zalo-option" className="sr-only" />
                <span
                  className={`text-sm font-medium ${
                    selected === 'zalo' ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  Zalo
                </span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div
                  className={`rounded-full p-4 cursor-pointer transition-colors ${
                    selected === 'phone' ? 'bg-primary/20' : 'bg-secondary/50'
                  }`}
                >
                  <label htmlFor="phone-option" className="cursor-pointer">
                    <Phone
                      className={`h-8 w-8 ${
                        selected === 'phone' ? 'text-primary' : 'text-muted-foreground'
                      }`}
                    />
                  </label>
                </div>
                <RadioGroupItem value="phone" id="phone-option" className="sr-only" />
                <span
                  className={`text-sm font-medium ${
                    selected === 'phone' ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  Gọi ngay
                </span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div
                  className={`rounded-full p-4 cursor-pointer transition-colors ${
                    selected === 'facebook' ? 'bg-primary/20' : 'bg-secondary/50'
                  }`}
                >
                  <label htmlFor="facebook-option" className="cursor-pointer">
                    <Facebook
                      className={`h-8 w-8 ${
                        selected === 'facebook' ? 'text-primary' : 'text-muted-foreground'
                      }`}
                    />
                  </label>
                </div>
                <RadioGroupItem value="facebook" id="facebook-option" className="sr-only" />
                <span
                  className={`text-sm font-medium ${
                    selected === 'facebook' ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  Facebook
                </span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div
                  className={`rounded-full p-4 cursor-pointer transition-colors ${
                    selected === 'instagram' ? 'bg-primary/20' : 'bg-secondary/50'
                  }`}
                >
                  <label htmlFor="instagram-option" className="cursor-pointer">
                    <Instagram
                      className={`h-8 w-8 ${
                        selected === 'instagram' ? 'text-primary' : 'text-muted-foreground'
                      }`}
                    />
                  </label>
                </div>
                <RadioGroupItem value="instagram" id="instagram-option" className="sr-only" />
                <span
                  className={`text-sm font-medium ${
                    selected === 'instagram' ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  Instagram
                </span>
              </div>
            </RadioGroup>

            {/* Selected Contact Option Details */}
            <div className="flex flex-col items-center space-y-4">
              <h3 className="font-medium text-lg">{selectedOption.title}</h3>
              <div className="bg-white p-3 border rounded-lg shadow-sm">
                {selectedOption.qrData ? (
                  <Image
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                      selectedOption.qrData,
                    )}`}
                    alt={`${selected} QR Code`}
                    className="w-48 h-48"
                    width={4000}
                    height={4000}
                  />
                ) : (
                  <Image
                    src={selectedOption.qrImage as string}
                    alt={`${selected} QR Code`}
                    className="w-48 h-48"
                    width={4000}
                    height={4000}
                  />
                )}
              </div>
              <Button
                variant="outline"
                className="flex items-center gap-2 w-full justify-center"
                onClick={() => window.open(selectedOption.url, '_blank')}
              >
                {selectedOption.actionIcon}
                {selectedOption.actionText}
              </Button>
            </div>
          </div>

          <div className="mt-2 text-center text-sm text-muted-foreground">
            Quét mã QR hoặc nhấp vào nút để liên hệ với chúng tôi
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default ContactRing;
