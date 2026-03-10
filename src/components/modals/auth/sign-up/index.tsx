'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Lock, Phone, User } from 'lucide-react';
import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/auth.context';
import { useSignUpMutation } from '@/graphql/hooks';
import { toast } from '@/hooks/use-toast';
import { BUSINESS_NAME } from '@/shared/constants/business';
import { sanitizeSignUpSchema } from '@/shared/dto/auth.dto';
import { signUpSchema, TSignUpSchema } from '@/shared/schema';
import { StringUtil } from '@/shared/utils/string.util';

interface SignUpModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  onSignInClick: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({
  open,
  onOpenChange,
  onSuccess,
  onSignInClick,
}) => {
  const { login } = useAuth();
  const [signUp] = useSignUpMutation();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: sanitizeSignUpSchema({
      last_name: '',
      phone: '',
      password: '',
      confirm_password: '',
    }),
  });

  const onSubmit = async (data: TSignUpSchema) => {
    setIsLoading(true);

    try {
      const { data: response, errors } = await signUp(sanitizeSignUpSchema(data));
      if (errors && errors.length > 0) {
        throw new Error(errors.map((error) => error.message).join(', '));
      }

      const user = response?.signUp?.user;
      if (user) {
        login(JSON.parse(JSON.stringify(user)));

        toast({
          title: 'Đăng ký tài khoản thành công',
          description: `Xin chào ${[user.first_name, user.last_name].filter(Boolean).join(' ')}, chào mừng bạn đến với ${StringUtil.capitalize(BUSINESS_NAME)}.`,
          variant: 'success',
        });
        if (onSuccess) onSuccess();
      }
      onOpenChange(false);
    } catch (error) {
      toast({
        title: 'Không thể tạo tài khoản. Vui lòng thử lại.',
        description: StringUtil.errorMessage({ error }),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tạo tài khoản</DialogTitle>
          <DialogDescription>
            Đăng ký để truy cập tất cả các tính năng của Photocopy99.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Họ và tên</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        {...field}
                        placeholder="Nhập họ và tên"
                        autoComplete="name"
                        className="pl-10"
                        disabled={isLoading}
                      />
                    </div>
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
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        {...field}
                        placeholder="Nhập số điện thoại"
                        type="text"
                        autoComplete="phone"
                        className="pl-10"
                        disabled={isLoading}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        {...field}
                        placeholder="Nhập mật khẩu"
                        type="password"
                        autoComplete="new-password"
                        className="pl-10"
                        disabled={isLoading}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Xác nhận mật khẩu</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        {...field}
                        placeholder="Xác nhận mật khẩu"
                        type="password"
                        autoComplete="new-password"
                        className="pl-10"
                        disabled={isLoading}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex-col gap-2 sm:flex-row mt-6">
              <div className="flex-1 text-sm">
                Đã có tài khoản?{' '}
                <button
                  type="button"
                  className="text-primary underline-offset-4 hover:underline"
                  onClick={() => {
                    onOpenChange(false);
                    onSignInClick();
                  }}
                >
                  Đăng nhập
                </button>
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Fragment>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang tạo tài khoản...
                  </Fragment>
                ) : (
                  'Đăng ký'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SignUpModal;
