import ContactForm from '@/components/common/contact/form';
import ContactInformation from '@/components/common/contact/information';

export default function Contact() {
  return (
    <div className="grid md:grid-cols-2 gap-12">
      <ContactInformation />

      <ContactForm />
    </div>
  );
}
