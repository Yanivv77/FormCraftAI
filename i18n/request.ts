import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';


export default getRequestConfig(async () => {
  const cookieStore = cookies();
  console.log(cookieStore); // Log to confirm cookies are read correctly
  const locale = cookieStore.get('language')?.value || 'en';

  // Ensure the path is correct and accessible
  const messages = (await import(`@/locales/${locale}/translation.json`)).default;

  return {
    locale,
    messages,
  };
});