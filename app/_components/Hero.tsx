
"use client"; 

import { AtomIcon, Edit, Share2 } from 'lucide-react';
import React from 'react';
import { useTranslations } from 'next-intl';

function Hero() {
  const t = useTranslations('hero'); // Specify the namespace if using

  return (
    <section className="bg-[url('/grid.svg')] bg-cover bg-center">
      <div className="mx-auto max-w-screen-xl px-4 pt-32 lg:flex">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            {t('title')}
            <strong className="font-extrabold text-default sm:block">
              {t('subtitle')}
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed text-gray-500">
            {t('description')}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <a
               className="inline-block rounded bg-primary px-12 py-3 text-sm font-medium text-white transition hover:bg-purple-700 focus:outline-none focus:ring focus:ring-yellow-400"
              href="#"
            >
              {t('createAIForm')}
            </a>

            <a
              className="w-full sm:w-auto block rounded px-12 py-3 text-sm font-medium text-primary shadow hover:text-purple-600 focus:outline-none focus:ring active:text-red-500"
              href="#"
            >
              {t('learnMore')}
            </a>
          </div>
        </div>
      </div>

      <section className="">
        <div className="mx-auto max-w-screen-xl px-4 py-16">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">{t('howItWorks')}</h2>

            <p className="mt-4 text-gray-800">
              {t('howItWorksDescription')}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <a
              className="block rounded-xl border border-gray-800 p-6 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
              href="#"
            >
              <AtomIcon className='h-8 w-8' />

              <h2 className="mt-4 text-xl font-bold text-black">{t('steps.step1Title')}</h2>

              <p className="mt-1 text-sm text-gray-600">
                {t('steps.step1Description')}
              </p>
            </a>

            <a
              className="block rounded-xl border border-gray-800 p-6 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
              href="#"
            >
              <Edit className='h-8 w-8' />

              <h2 className="mt-4 text-xl font-bold text-black">{t('steps.step2Title')}</h2>

              <p className="mt-1 text-sm text-gray-600">
                {t('steps.step2Description')}
              </p>
            </a>

            <a
              className="block rounded-xl border border-gray-800 p-6 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
              href="#"
            >
              <Share2 className='h-8 w-8' />

              <h2 className="mt-4 text-xl font-bold text-black">{t('steps.step3Title')}</h2>

              <p className="mt-1 text-sm text-gray-600">
                {t('steps.step3Description')}
              </p>
            </a>
          </div>

          <div className="mt-12 text-center">
            <a
              href="/sign-in"
              className="inline-block rounded bg-primary px-12 py-3 text-sm font-medium text-white transition hover:bg-purple-700 focus:outline-none focus:ring focus:ring-yellow-400"
            >
              {t('getStartedToday')}
            </a>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Hero;
