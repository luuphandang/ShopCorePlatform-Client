import Image from 'next/image';

export default function AboutUsOurTeam() {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-medium uppercase tracking-wider text-primary mb-3">
            Đội ngũ của chúng tôi
          </h2>
          <h3 className="text-3xl md:text-4xl font-serif font-medium mb-6">
            Những người đồng hành cùng Photocopy99
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Đội ngũ chuyên gia lành nghề của chúng tôi kết hợp chuyên môn kỹ thuật với tài năng nghệ
            thuật để biến tầm nhìn của bạn thành hiện thực.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="relative mb-6 mx-auto w-48 h-48 rounded-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop"
                alt="Team Member"
                className="w-full h-full object-cover"
                width={4000}
                height={4000}
              />
            </div>
            <h4 className="text-xl font-serif font-medium mb-1">Emily Chen</h4>
            <p className="text-primary mb-3">Founder & Creative Director</p>
            <p className="text-gray-700 text-sm">
              Với hơn 15 năm kinh nghiệm trong thiết kế và in ấn, Emily dẫn dắt tầm nhìn sáng tạo
              của chúng tôi.
            </p>
          </div>

          <div className="text-center">
            <div className="relative mb-6 mx-auto w-48 h-48 rounded-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
                alt="Team Member"
                className="w-full h-full object-cover"
                width={4000}
                height={4000}
              />
            </div>
            <h4 className="text-xl font-serif font-medium mb-1">David Park</h4>
            <p className="text-primary mb-3">Giám đốc kỹ thuật</p>
            <p className="text-gray-700 text-sm">
              David đảm bảo dịch vụ sao chép và in ấn của chúng tôi sử dụng công nghệ mới nhất để
              mang lại kết quả tối ưu.
            </p>
          </div>

          <div className="text-center">
            <div className="relative mb-6 mx-auto w-48 h-48 rounded-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format&fit=crop"
                alt="Team Member"
                className="w-full h-full object-cover"
                width={4000}
                height={4000}
              />
            </div>
            <h4 className="text-xl font-serif font-medium mb-1">Sarah Johnson</h4>
            <p className="text-primary mb-3">Nghệ nhân chính</p>
            <p className="text-gray-700 text-sm">
              Sarah mang tầm nhìn nghệ thuật vào các sản phẩm thủ công của chúng tôi, chuyên về đồ
              thủ công bằng giấy và đóng sách.
            </p>
          </div>

          <div className="text-center">
            <div className="relative mb-6 mx-auto w-48 h-48 rounded-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop"
                alt="Team Member"
                className="w-full h-full object-cover"
                width={4000}
                height={4000}
              />
            </div>
            <h4 className="text-xl font-serif font-medium mb-1">Michael Torres</h4>
            <p className="text-primary mb-3">Quản lý quan hệ khách hàng</p>
            <p className="text-gray-700 text-sm">
              Michael đảm bảo mọi khách hàng đều nhận được sự quan tâm chu đáo và dịch vụ đặc biệt.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
