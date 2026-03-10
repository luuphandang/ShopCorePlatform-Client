import Contact from '@/components/pages/contact/content';

export default function HomeContact() {
  return (
    <section id="contact" className="py-20 bg-secondary/30">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in-up">
          <h2 className="font-serif text-sm md:text-base uppercase tracking-widest text-primary/80">
            Liên hệ
          </h2>
          <h3 className="mt-2 text-3xl md:text-4xl font-serif font-medium text-primary">
            Liên hệ với chúng tôi
          </h3>
          <p className="mt-4 text-muted-foreground">
            Bạn có câu hỏi về dịch vụ photocopy, in ấn hay sản phẩm thủ công?
          </p>
          <p className="text-muted-foreground">
            Hãy điền thông tin vào biểu mẫu dưới đây để chúng tôi có thể phản hồi đến bạn sớm nhất!
          </p>
        </div>

        <Contact />
      </div>
    </section>
  );
}
