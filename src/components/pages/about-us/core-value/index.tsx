import { Award, Heart, Target } from 'lucide-react';

export default function AboutUsCoreValue() {
  return (
    <section className="py-16 md:py-24 bg-primary/5">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-medium uppercase tracking-wider text-primary mb-3">
            Giá trị cốt lõi của chúng tôi
          </h2>
          <h3 className="text-3xl md:text-4xl font-serif font-medium mb-6">
            Điều gì đang dẫn chúng tôi tiến bộ
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Tại Photocopy99, các giá trị cốt lõi của chúng tôi định hình mọi quyết định chúng tôi
            đưa ra và mọi sản phẩm chúng tôi tạo ra. Những nguyên tắc này đã định hướng cho sự phát
            triển của chúng tôi trong hơn một thập kỷ.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-secondary/20 text-primary rounded-full flex items-center justify-center mb-6">
              <Award size={28} />
            </div>
            <h4 className="text-xl font-serif font-medium mb-4">Tay nghề thủ công chất lượng</h4>
            <p className="text-gray-700">
              Chúng tôi tự hào cung cấp chất lượng vượt trội trong cả dịch vụ sao chép và sản phẩm
              thủ công. Mọi chi tiết đều quan trọng với chúng tôi.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-secondary/20 text-primary rounded-full flex items-center justify-center mb-6">
              <Heart size={28} />
            </div>
            <h4 className="text-xl font-serif font-medium mb-4">Niềm đam mê sáng tạo</h4>
            <p className="text-gray-700">
              Chúng tôi tiếp cận mỗi dự án bằng sự nhiệt tình và năng lượng sáng tạo, luôn tìm cách
              vượt quá sự mong đợi.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-secondary/20 text-primary rounded-full flex items-center justify-center mb-6">
              <Target size={28} />
            </div>
            <h4 className="text-xl font-serif font-medium mb-4">Tập trung vào khách hàng</h4>
            <p className="text-gray-700">
              Sự hài lòng của bạn là ưu tiên hàng đầu của chúng tôi. Chúng tôi lắng nghe nhu cầu của
              bạn và cố gắng cung cấp các giải pháp được cá nhân hóa đáp ứng các yêu cầu riêng biệt
              của bạn.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
