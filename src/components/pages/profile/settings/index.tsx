'use client';

import { useQuery } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Loader2, Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/auth.context';
import { FileUpload, User } from '@/graphql/@types';
import { MY_USER } from '@/graphql/gql/queries/user.query';
import { useFileUpload, useUpdateUserMutation } from '@/graphql/hooks/mutations';
import { toast } from '@/hooks/use-toast';
import { userSchema } from '@/shared/schema';
import { StringUtil } from '@/shared/utils/string.util';

const formSchema = userSchema
  .extend({
    new_password: z.string(),
    confirm_password: z.string(),
    notification_order: z.boolean(),
    notification_promotion: z.boolean(),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: 'Mật khẩu không khớp',
    path: ['confirm_password'],
  });

type FormValues = z.infer<typeof formSchema>;

export default function ProfileSettings() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [avatar, setAvatar] = useState<FileUpload | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user: authUser, isLoading: isAuthLoading } = useAuth();

  const [updateUser] = useUpdateUserMutation();
  const { uploadFile } = useFileUpload();

  const { data, loading } = useQuery<{ myUser: User }>(MY_USER, {
    variables: {
      query: {
        where: JSON.stringify({ id: authUser?.id }),
      },
    },
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: data?.myUser?.first_name || '',
      last_name: data?.myUser?.last_name || '',
      phone: data?.myUser?.phone || '',
      email: data?.myUser?.email || '',
      birthday: data?.myUser?.birthday || '',
      address: data?.myUser?.address || '',
      password: '',
      new_password: '',
      confirm_password: '',
      notification_order: false,
      notification_promotion: false,
    },
  });

  // Update form values when data is loaded
  useEffect(() => {
    if (isAuthLoading) return;

    if (data?.myUser) {
      form.reset({
        first_name: data.myUser.first_name || '',
        last_name: data.myUser.last_name || '',
        phone: data.myUser.phone || '',
        email: data.myUser.email || '',
        birthday: data.myUser.birthday || '',
        address: data.myUser.address || '',
        password: '',
        new_password: '',
        confirm_password: '',
        notification_order: false,
        notification_promotion: false,
      });
    }
    if (data?.myUser?.avatar) {
      setAvatar(data.myUser.avatar);
    }
  }, [data, form, isAuthLoading]);

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);

    try {
      if (!authUser?.id) throw new Error('Không tìm thấy người dùng.');

      const { data: response, errors } = await updateUser(authUser?.id, {
        phone: data.phone,
        password: data.password,
        last_name: data.last_name,
        avatar: data.avatar,
        first_name: data.first_name,
        birthday: data.birthday,
        address: data.address,
      });

      if (errors) {
        throw new Error(errors.map((error) => error.message).join(', '));
      }

      if (response?.updateUser) {
        const newUser = response.updateUser;
        form.reset({
          first_name: newUser.first_name || '',
          last_name: newUser.last_name || '',
          phone: newUser.phone || '',
          email: newUser.email || '',
          birthday: newUser.birthday || '',
          address: newUser.address || '',
          password: '',
          new_password: '',
          confirm_password: '',
          notification_order: false,
          notification_promotion: false,
        });

        localStorage.setItem('user', JSON.stringify(newUser));
        if (newUser.avatar) setAvatar(newUser.avatar as FileUpload);

        toast({
          title: 'Cập nhật thông tin thành công',
          description: 'Thông tin của bạn đã được cập nhật thành công.',
          variant: 'success',
        });

        window.location.reload();
      }
    } catch (error) {
      toast({
        title: 'Cập nhật thông tin thất bại',
        description: StringUtil.errorMessage({ error }),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !authUser?.id) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Lỗi',
        description: 'Vui lòng chọn file ảnh',
        variant: 'destructive',
      });
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast({
        title: 'Lỗi',
        description: 'Kích thước file không được vượt quá 5MB',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);
    try {
      const newFile = await uploadFile(file);
      if (!newFile) throw new Error('Upload file thất bại');

      setAvatar(newFile);
    } catch (error) {
      toast({
        title: 'Cập nhật ảnh đại diện thất bại',
        description: StringUtil.errorMessage({ error }),
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const user = data?.myUser;

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Trở về
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Chỉnh sửa hồ sơ</CardTitle>
          <CardDescription>Cập nhật thông tin cá nhân và sở thích của bạn</CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-8">
              {/* Profile Picture */}
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={avatar?.url} alt={`${user.first_name} ${user.last_name}`} />
                  <AvatarFallback className="bg-primary text-white text-xl">
                    {StringUtil.getFirstLetters(StringUtil.getFullName(user))
                      .slice(-2)
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <Fragment>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Đang tải lên...
                    </Fragment>
                  ) : (
                    <Fragment>
                      <Upload className="mr-2 h-4 w-4" />
                      Thay đổi ảnh đại diện
                    </Fragment>
                  )}
                </Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Thông tin cá nhân</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Họ</FormLabel>
                        <FormControl>
                          <Input {...field} className="w-full px-3 py-2 border rounded-md" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tên</FormLabel>
                        <FormControl>
                          <Input {...field} className="w-full px-3 py-2 border rounded-md" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} className="w-full px-3 py-2 border rounded-md" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Số điện thoại</FormLabel>
                        <FormControl>
                          <Input {...field} className="w-full px-3 py-2 border rounded-md" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="birthday"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ngày sinh</FormLabel>
                        <FormControl>
                          <Input {...field} className="w-full px-3 py-2 border rounded-md" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Địa chỉ</FormLabel>
                      <FormControl>
                        <Input {...field} className="w-full px-3 py-2 border rounded-md" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              {/* Password Change Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Đổi mật khẩu</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-sm font-medium">Mật khẩu hiện tại</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="w-full px-3 py-2 border rounded-md"
                            type="password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="new_password"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-sm font-medium">Mật khẩu mới</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="w-full px-3 py-2 border rounded-md"
                              type="password"
                              autoComplete="new-password"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="confirm_password"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-sm font-medium">Xác nhận khẩu mới</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="w-full px-3 py-2 border rounded-md"
                              type="password"
                              autoComplete="new-password"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Notification Preferences */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Thông báo</h3>

                <div className="space-y-3">
                  <FormField
                    control={form.control}
                    name="notification_order"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <div>
                          <FormLabel className="text-sm font-medium">Cập nhật đơn hàng</FormLabel>
                          <p className="text-sm text-muted-foreground">
                            Nhận thông báo về trạng thái đơn hàng của bạn
                          </p>
                        </div>
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="notification_promotion"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <div>
                          <FormLabel className="text-sm font-medium">Email khuyến mãi</FormLabel>
                          <p className="text-sm text-muted-foreground">
                            Nhận các ưu đãi, giảm giá và tin tức
                          </p>
                        </div>
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => router.push('/profile')}>
                Hủy bỏ
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Fragment>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang cập nhật...
                  </Fragment>
                ) : (
                  'Cập nhật'
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
