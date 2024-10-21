import { useUser } from '@clerk/nextjs';
import { useTranslations } from 'next-intl';

export default function Dashboard() {
  const { user } = useUser();
  const t = useTranslations('dashboard');

  return (
    <div>
      <h1>{t('welcome', { name: user?.firstName })}</h1>
      {/* Dashboard content */}
    </div>
  );
}