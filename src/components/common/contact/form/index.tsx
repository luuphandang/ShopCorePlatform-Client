'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/auth.context';
import { useCreateAppointmentMutation } from '@/graphql/hooks/mutations/appointment.mutation';
import { toast } from '@/hooks/use-toast';
import { sanitizeAppointmentSchema } from '@/shared/dto/appointment.dto';
import { appointmentSchema, TAppointmentSchema } from '@/shared/schema';
import { StringUtil } from '@/shared/utils/string.util';

export default function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { user: authUser, isLoading: isAuthLoading } = useAuth();

  const form = useForm<TAppointmentSchema>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: sanitizeAppointmentSchema({
      name: StringUtil.getFullName(authUser) || '',
      phone: authUser?.phone || '',
      email: authUser?.email || '',
    }),
  });

  const [createAppointment] = useCreateAppointmentMutation();

  if (isAuthLoading) {
    return (
      <div className="bg-white space-y-4 p-8 rounded-lg shadow-sm border border-border/50 animate-fade-in">
        <div className="flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      </div>
    );
  }

  const onSubmit = async (data: TAppointmentSchema) => {
    setIsLoading(true);
    try {
      const response = await createAppointment(sanitizeAppointmentSchema(data));

      if (response) {
        toast({
          title: 'Gửi liên hệ thành công!',
          description: 'Liên hệ của bạn đã được gửi thành công.',
          variant: 'success',
        });

        form.reset();
      }
    } catch (error) {
      toast({
        title: 'Gửi liên hệ thất bại!',
        description: StringUtil.errorMessage({ error }),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        className="bg-white space-y-4 p-8 rounded-lg shadow-sm border border-border/50 animate-fade-in"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-full px-4 py-2 border border-border rounded-md focus:ring-1 focus:ring-primary focus:border-primary transition-all-300"
                  placeholder="Tên của bạn"
                />
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
                <Input
                  {...field}
                  className="w-full px-4 py-2 border border-border rounded-md focus:ring-1 focus:ring-primary focus:border-primary transition-all-300"
                  placeholder="Số điện thoại của bạn"
                />
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
                <Input
                  {...field}
                  className="w-full px-4 py-2 border border-border rounded-md focus:ring-1 focus:ring-primary focus:border-primary transition-all-300"
                  placeholder="Email của bạn"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Chủ đề</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-full px-4 py-2 border border-border rounded-md focus:ring-1 focus:ring-primary focus:border-primary transition-all-300"
                  placeholder="Chủ đề của bạn"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nội dung</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={4}
                  className="w-full px-4 py-2 border border-border rounded-md focus:ring-1 focus:ring-primary focus:border-primary transition-all-300"
                  placeholder="Nội dung của bạn"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-primary/90 transition-all active:scale-[0.98] font-medium"
        >
          {isLoading ? (
            <Fragment>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Đang gửi...
            </Fragment>
          ) : (
            'Gửi liên hệ'
          )}
        </Button>
      </form>
    </Form>
  );
}
