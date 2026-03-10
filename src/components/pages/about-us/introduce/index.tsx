import Image from 'next/image';

import { Button } from '@/components/ui/button';

export default function AboutUsIntroduce() {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative animate-fade-in">
            <Image
              src="https://images.unsplash.com/photo-1600872897522-5dfa5d1cf0ab?q=80&w=1964&auto=format&fit=crop"
              alt="Craftsman at work"
              className="rounded-lg shadow-lg w-full h-auto"
              width={1964}
              height={1473}
              priority
            />
            <div className="absolute -bottom-6 -right-6 bg-secondary text-primary w-32 h-32 rounded-full flex items-center justify-center p-4 shadow-lg">
              <p className="text-center font-serif font-bold">
                <span className="text-3xl">2024</span>
                <br />
                <span className="text-sm">Năm của Chất Lượng</span>
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-sm font-medium uppercase tracking-wider text-primary">
              Chúng tôi là ai
            </h2>
            <h3 className="text-3xl md:text-4xl font-serif font-medium">
              Từ cửa hàng nhỏ đến Studio Nghệ thuật
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Photocopy99 được thành lập vào năm 2024 với sứ mệnh đơn giản: cung cấp dịch vụ
              photocopy đặc biệt đồng thời tôn vinh nghệ thuật thủ công truyền thống mang hơi thở
              hiện đại. Bắt đầu từ một cửa hàng photocopy khiêm tốn, nay đã phát triển thành một
              doanh nghiệp độc đáo thu hẹp khoảng cách giữa công nghệ kỹ thuật số và nghề thủ công
              truyền thống.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Đội ngũ của chúng tôi bao gồm các kỹ thuật viên lành nghề và những nghệ nhân đam mê,
              những người mang đến cả sự chính xác về mặt kỹ thuật và sự sáng tạo trong mọi thứ
              chúng tôi làm. Chúng tôi tin vào giá trị của cả công nghệ hiện đại và nghề thủ công
              truyền thống, và triết lý này định hướng cách tiếp cận của chúng tôi đối với cả dịch
              vụ và sản phẩm.
            </p>
            <Button variant="outline" className="mt-4">
              Tìm hiểu thêm về cuộc hành trình của chúng tôi
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
