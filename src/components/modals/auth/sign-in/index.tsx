'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, Phone } from 'lucide-react';
import { Loader2 } from 'lucide-react';
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
import { useSignInMutation } from '@/graphql/hooks';
import { toast } from '@/hooks/use-toast';
import { sanitizeSignInSchema } from '@/shared/dto/auth.dto';
import { signInSchema, TSignInSchema } from '@/shared/schema';
import { StringUtil } from '@/shared/utils/string.util';

interface SignInModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSignUpClick: () => void;
}
const SignInModal: React.FC<SignInModalProps> = ({ open, onOpenChange, onSignUpClick }) => {
  const { login } = useAuth();
  const [signIn] = useSignInMutation();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: sanitizeSignInSchema({
      phone: '',
      password: '',
    }),
  });

  const onSubmit = async (data: TSignInSchema) => {
    setIsLoading(true);

    try {
      const { data: response, errors } = await signIn(sanitizeSignInSchema(data));
      if (errors && errors.length > 0) {
        throw new Error(errors.map((error) => error.message).join(', '));
      }

      const user = response?.signIn?.user;
      if (!user) throw new Error('Số điện thoại hoặc mật khẩu không chính xác.');

      login(JSON.parse(JSON.stringify(user)));

      toast({
        title: 'Đăng nhập thành công',
        description: `Xin chào ${[user.first_name, user.last_name].join(' ')}, bạn đã đăng nhập thành công vào tài khoản của bạn.`,
        variant: 'success',
      });

      onOpenChange(false);
    } catch (error) {
      toast({
        title: 'Đăng nhập thất bại. Vui lòng thử lại.',
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
          <DialogTitle>Đăng nhập</DialogTitle>
          <DialogDescription>
            Đăng nhập vào tài khoản của bạn để truy cập tất cả các tính năng.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
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
                        autoComplete="current-password"
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
                Không có tài khoản?{' '}
                <button
                  type="button"
                  className="text-primary underline-offset-4 hover:underline"
                  onClick={() => {
                    onOpenChange(false);
                    onSignUpClick();
                  }}
                >
                  Đăng ký
                </button>
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Fragment>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang đăng nhập...
                  </Fragment>
                ) : (
                  'Đăng nhập'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SignInModal;
