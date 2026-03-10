'use client';

import { Edit2, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { User } from '@/graphql/@types';
import { StringUtil } from '@/shared/utils/string.util';

interface IProfileUserProps {
  user: User;
}

export default function ProfileUser({ user }: IProfileUserProps) {
  return (
    <Card className="w-full md:w-1/3">
      <CardHeader className="text-center">
        <Avatar className="h-24 w-24 mx-auto mb-4">
          <AvatarImage
            src={user.avatar?.url}
            alt={[user.first_name, user.last_name].filter(Boolean).join(' ')}
          />
          <AvatarFallback className="bg-primary text-white text-xl">
            {StringUtil.getFirstLetters([user.first_name, user.last_name].filter(Boolean).join(' '))
              .slice(-2)
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="text-2xl">
          {[user.first_name, user.last_name].filter(Boolean).join(' ')}
        </CardTitle>
        <CardDescription>
          Thành viên từ {new Date(user.created_at || '').toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
          </div>
          <div>
            <p className="text-sm font-medium">Email</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
          </div>
          <div>
            <p className="text-sm font-medium">Số điện thoại</p>
            <p className="text-sm text-muted-foreground">{user.phone}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
          </div>
          <div>
            <p className="text-sm font-medium">Địa chỉ</p>
            <p className="text-sm text-muted-foreground">{user.address}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <Link href="/profile/settings">
            <Edit2 className="mr-2 h-4 w-4" />
            Cập nhật thông tin
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
