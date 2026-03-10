import ProfileContainer from '@/components/pages/profile';

export default function ProfilePage() {
  return (
    <main className="container mx-auto px-4 py-20 md:py-24 min-h-[calc(100vh-80px)]">
      <div className="max-w-6xl mx-auto">
        <ProfileContainer />
      </div>
    </main>
  );
}
