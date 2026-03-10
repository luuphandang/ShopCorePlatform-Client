import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  FileUpload,
  FileUploadImageItem,
  FileUploadInfo,
  FileUploadTrigger,
  MultipleSelect,
  MultipleSelectContent,
  MultipleSelectItem,
  MultipleSelectTrigger,
  MultipleSelectValue,
} from '@/components/ui';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { TabsContent } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/auth.context';
import { TCategoriesQuery, TCategoryQuery, TProductQuery, TProductsQuery } from '@/graphql/@types';
import {
  EBookingType,
  ECategoryType,
  EFileType,
  EPaginationType,
} from '@/graphql/@types/graphql.type';
import { useCategoriesQuery } from '@/graphql/hooks';
import { useCreateBookingMutation } from '@/graphql/hooks/mutations/booking.mutation';
import { useFileUpload } from '@/graphql/hooks/mutations/file-upload.mutation';
import { useProductsQuery } from '@/graphql/hooks/queries/product.query';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/libs/utils';
import { sanitizeBookingSchema } from '@/shared/dto/booking.dto';
import { bookingSchema, TBookingSchema } from '@/shared/schema';
import { StringUtil } from '@/shared/utils/string.util';

export default function BookingServiceTab() {
  const { user: authUser } = useAuth();
  const { uploadFile } = useFileUpload();

  const [categories, setCategories] = useState<TCategoriesQuery>([]);
  const [products, setProducts] = useState<TProductsQuery>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const [createBooking] = useCreateBookingMutation();

  const { data: categoriesResponse } = useCategoriesQuery({
    where: { type: ECategoryType.Service },
    pagination: { pagination_type: EPaginationType.All },
    order: { created_at: 'DESC' },
  });
  useEffect(() => {
    if (categoriesResponse?.categories?.data) {
      setCategories(categoriesResponse.categories.data);
    }
  }, [categoriesResponse]);
  const categoryMap = new Map<string, TCategoryQuery>(
    categories?.map((category) => [category.id.toString(), category]),
  );

  const { data: productsResponse } = useProductsQuery({
    where: {
      ...(Array.isArray(selectedCategoryIds) && {
        category_ids: { $containsAnyInteger: selectedCategoryIds },
      }),
    },
    pagination: { pagination_type: EPaginationType.All },
    order: { created_at: 'DESC' },
  });
  useEffect(() => {
    if (productsResponse?.products?.data) {
      setProducts(productsResponse.products.data);
    }
  }, [productsResponse]);
  const productMap = new Map<string, TProductQuery>(
    products?.map((product) => [product.id.toString(), product]),
  );

  const form = useForm<TBookingSchema>({
    resolver: zodResolver(bookingSchema),
    defaultValues: sanitizeBookingSchema({
      name: StringUtil.getFullName(authUser),
      email: authUser?.email || '',
      phone: authUser?.phone || '',
      estimated_date: new Date(),
      agree_terms: true,
      type: EBookingType.Service,
    }),
  });

  const handleFileSelect = async (selectedFiles: File[]) => {
    if (selectedFiles.length === 0) return;

    try {
      setIsUploading(true);
      const uploadPromises = selectedFiles.map((file) => uploadFile(file));

      const uploadedFiles = await Promise.all(uploadPromises);
      const successfulUploads = uploadedFiles.filter(Boolean);

      if (successfulUploads.length > 0) {
        const currentAttachments = form.getValues('attachments') || [];
        const newAttachments = successfulUploads.map((file) => ({
          id: file?.id,
          name: file?.name || '',
          url: file?.url || '',
          type: file?.type || EFileType.Image,
        }));

        form.setValue('attachments', [...currentAttachments, ...newAttachments]);
      }
    } catch (error) {
      console.error('File upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const onChangeCategories = (ids: string[]) => {
    const results: number[] = [];
    for (const id of ids) {
      const category = categoryMap.get(id);

      if (category?.id) results.push(Number(category.id));
    }

    setSelectedCategoryIds(results);
    form.setValue('category_ids', results);
  };

  const attachmentsValue = form.watch('attachments') || [];
  const attachmentsSimpleValue = attachmentsValue.map((file) => ({
    name: file.name || '',
    url: file.url || '',
    type: file.type || 'image/jpeg',
  }));

  const onSubmit = async (data: TBookingSchema) => {
    try {
      const { data: response, errors } = await createBooking(sanitizeBookingSchema(data));

      if (errors) {
        const errorMessage = errors.map((error) => error.message).join(', ');

        throw new Error(errorMessage);
      }

      if (response?.createBooking) {
        toast({
          title: 'Đặt lịch thành công!',
          description: 'Đặt lịch của bạn đã được gửi thành công.',
          variant: 'success',
        });
      }

      form.reset();
    } catch (error) {
      toast({
        title: 'Đặt lịch thất bại!',
        description: StringUtil.errorMessage({ error }),
        variant: 'destructive',
      });
    }
  };

  return (
    <TabsContent value="service" className="bg-white rounded-md shadow-sm border p-6">
      <div className="mb-6">
        <h4 className="text-xl font-serif font-medium mb-2">Đặt lịch hẹn lấy tài liệu</h4>
        <p className="text-muted-foreground text-sm">
          Đặt lịch để thảo luận về yêu cầu của bạn, gửi tài liệu hoặc tham khảo ý kiến của nhóm
          chúng tôi.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Họ và tên</FormLabel>
                  <FormControl>
                    <Input placeholder="Nguyễn Văn A" {...field} />
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
                    <Input placeholder="0123456789" {...field} />
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
                    <Input placeholder="nguyenvana@gmail.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category_ids"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loại dịch vụ</FormLabel>
                  <MultipleSelect
                    value={(field.value || [])?.map((id) => id.toString())}
                    onValueChange={onChangeCategories}
                  >
                    <MultipleSelectTrigger placeholder="Chọn loại dịch vụ">
                      {field.value?.map((id) => (
                        <MultipleSelectValue key={id} value={id.toString()}>
                          {categoryMap.get(id.toString())?.name}
                        </MultipleSelectValue>
                      ))}
                    </MultipleSelectTrigger>
                    <MultipleSelectContent>
                      {categories?.map((category) => (
                        <MultipleSelectItem key={category.id} value={category.id.toString()}>
                          {category.name}
                        </MultipleSelectItem>
                      ))}
                    </MultipleSelectContent>
                  </MultipleSelect>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="product_ids"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dịch vụ</FormLabel>
                  <MultipleSelect
                    value={(field.value || [])?.map((id) => id.toString())}
                    onValueChange={field.onChange}
                  >
                    <MultipleSelectTrigger placeholder="Chọn dịch vụ">
                      {field.value?.map((id) => (
                        <MultipleSelectValue key={id} value={id.toString()}>
                          {productMap.get(id.toString())?.name}
                        </MultipleSelectValue>
                      ))}
                    </MultipleSelectTrigger>
                    <MultipleSelectContent>
                      {products?.map((product) => (
                        <MultipleSelectItem key={product.id} value={product.id.toString()}>
                          {product.name}
                        </MultipleSelectItem>
                      ))}
                    </MultipleSelectContent>
                  </MultipleSelect>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="estimated_date"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Ngày hoàn thành</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'dd-MM-yyyy')
                            ) : (
                              <span>Chọn ngày</span>
                            )}
                            <Calendar className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => field.onChange(date)}
                          disabled={(date) => {
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            const minDate = new Date(today);
                            minDate.setDate(today.getDate() + 2);
                            return date < minDate;
                          }}
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Vui lòng chờ ít nhất 2 ngày từ ngày hôm nay để đặt hàng tùy chỉnh
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thông tin thêm</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Vui lòng chia sẻ bất kỳ thông tin thêm nào về cuộc hẹn của bạn..."
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="attachments"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bộ sưu tập ảnh (tùy chọn)</FormLabel>
                <FormControl>
                  <FileUpload
                    value={attachmentsSimpleValue}
                    onValueChange={(files) => {
                      const newAttachments = files.map((file, index) => {
                        const existingFile = attachmentsValue[index];
                        return {
                          id: existingFile?.id,
                          name: file.name || file.url.split('/').pop() || 'File',
                          url: file.url,
                          type: file.type as EFileType,
                        };
                      });
                      field.onChange(newAttachments);
                    }}
                    onFileSelect={handleFileSelect}
                    isUploading={isUploading}
                    allowedFileTypes={['image/*']}
                    allowedFileSize={10 * 1024 * 1024}
                    allowedFileExtensions={['.jpg', '.jpeg', '.png', '.gif', '.webp']}
                  >
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mt-4">
                      {attachmentsSimpleValue.map((_, index) => (
                        <FileUploadImageItem key={index} index={index} />
                      ))}
                      <FileUploadTrigger multiple={true} />
                    </div>
                    <FileUploadInfo />
                  </FileUpload>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="agree_terms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Tôi đồng ý với điều khoản và điều kiện</FormLabel>
                  <FormDescription>
                    Bằng cách gửi biểu mẫu này, bạn đồng ý với chính sách riêng tư và điều khoản
                    dịch vụ của chúng tôi
                  </FormDescription>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full md:w-auto">
            Đặt lịch hẹn lấy tài liệu
          </Button>
        </form>
      </Form>
    </TabsContent>
  );
}
