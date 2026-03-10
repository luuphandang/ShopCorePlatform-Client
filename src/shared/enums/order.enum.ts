import { EOrderStatus, EPaymentStatus, EShippingStatus } from '@/graphql/@types/graphql.type';

export const EOrderStatusMap = {
  [EOrderStatus.Pending]: 'Chờ xác nhận',
  [EOrderStatus.Confirmed]: 'Đã xác nhận',
  [EOrderStatus.Processing]: 'Đang xử lý',
  [EOrderStatus.Shipped]: 'Đã giao hàng',
  [EOrderStatus.Completed]: 'Đã hoàn thành',
  [EOrderStatus.Cancelled]: 'Đã hủy',
  [EOrderStatus.Failed]: 'Thất bại',
  [EOrderStatus.Refunded]: 'Đã hoàn tiền',
};

export const EPaymentStatusMap = {
  [EPaymentStatus.Unpaid]: 'Chưa thanh toán',
  [EPaymentStatus.Paid]: 'Đã thanh toán',
  [EPaymentStatus.Refunded]: 'Đã hoàn tiền',
  [EPaymentStatus.Failed]: 'Thất bại',
  [EPaymentStatus.Cancelled]: 'Đã hủy',
};

export const EShippingStatusMap = {
  [EShippingStatus.NotRequired]: 'Không cần giao hàng',
  [EShippingStatus.Confirmed]: 'Đã xác nhận',
  [EShippingStatus.Pending]: 'Chờ giao hàng',
  [EShippingStatus.Shipped]: 'Đã gửi hàng',
  [EShippingStatus.InTransit]: 'Đang giao hàng',
  [EShippingStatus.Delivered]: 'Đã giao hàng',
  [EShippingStatus.Returned]: 'Đã trả hàng',
  [EShippingStatus.Lost]: 'Đã mất',
};
