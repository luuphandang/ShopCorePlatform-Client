import Image from 'next/image';

export default function HomeAbout() {
  return (
    <section id="about" className="py-24 bg-primary text-white">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in-up">
            <h2 className="font-serif text-sm md:text-base uppercase tracking-widest text-white/70">
              Giới thiệu
            </h2>

            <h3 className="text-3xl md:text-4xl font-serif font-medium">
              Tận Tâm - Sáng Tạo - Chất Lượng
            </h3>
            <p className="text-white/80 leading-relaxed">
              Chào mừng bạn đến với Photocopy99, nơi kết hợp giữa công nghệ in ấn hiện đại và nghệ
              thuật thủ công tinh tế.
            </p>
            <p className="text-white/80 leading-relaxed">
              Được thành lập từ năm 2024, chúng tôi bắt đầu với một cửa hàng photocopy nhỏ, nhưng
              với đam mê và sự tận tâm, chúng tôi đã phát triển thành một thương hiệu cung cấp dịch
              vụ in ấn, photocopy chuyên nghiệp và sản phẩm thủ công độc đáo.
            </p>

            <h3 className="text-3xl md:text-4xl font-serif font-medium">Sứ Mệnh Của Chúng Tôi</h3>
            <p className="text-white/80 leading-relaxed">
              <strong>Dịch vụ photocopy chất lượng cao</strong> với công nghệ in ấn hiện đại, đáp
              ứng mọi nhu cầu từ tài liệu cá nhân đến tài liệu doanh nghiệp.
            </p>
            <p className="text-white/80 leading-relaxed">
              <strong>Sản phẩm thủ công sáng tạo</strong> mang đậm dấu ấn cá nhân và sự tỉ mỉ của
              người thợ.
            </p>
            <p className="text-white/80 leading-relaxed">
              <strong>Trải nghiệm khách hàng tuyệt vời</strong> với sự tận tâm, hỗ trợ nhanh chóng
              và giá cả hợp lý.
            </p>

            <h3 className="text-3xl md:text-4xl font-serif font-medium">Vì Sao Chọn Chúng Tôi?</h3>
            <p className="text-white/80 leading-relaxed">
              <strong>Chất lượng in ấn vượt trội</strong> - Sử dụng máy móc hiện đại để đảm bảo độ
              sắc nét và bền màu.
            </p>
            <p className="text-white/80 leading-relaxed">
              <strong>Sáng tạo & Tinh tế</strong> - Sản phẩm thủ công được chế tác tỉ mỉ, mang nét
              đẹp riêng biệt.
            </p>
            <p className="text-white/80 leading-relaxed">
              <strong>Dịch vụ nhanh chóng & linh hoạt</strong> - Đáp ứng mọi yêu cầu, từ in số lượng
              lớn đến thiết kế theo yêu cầu.
            </p>
            <p className="text-white/80 leading-relaxed">
              <strong>Giá cả cạnh tranh</strong> - Luôn mang đến mức giá hợp lý nhất cho khách hàng.
            </p>

            <h2 className="font-serif text-sm md:text-base uppercase tracking-widest text-white/70 text-justify">
              Hãy đến với Photocopy99 để trải nghiệm sự kết hợp hoàn hảo giữa công nghệ và thủ công!
            </h2>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-lg overflow-hidden animate-fade-in">
              <Image
                src="/images/lang-hoa-kem-nhung.png"
                alt="Craftsman working on handmade paper products"
                className="w-full h-full object-cover"
                width={4000}
                height={4000}
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 md:w-32 md:h-32 bg-secondary rounded-full flex items-center justify-center animate-fade-in delay-150">
              <p className="text-primary font-serif font-bold text-lg md:text-xl text-center">
                2024
                <br />
                <span className="font-normal text-xs md:text-sm">Năm của sự bắt đầu</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
