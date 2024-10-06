// src/components/Hero.tsx

"use client"; // Ensure client-side rendering if necessary

import { AtomIcon, Edit, Share2 } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next'; // Import the hook

function Hero() {
  const { t } = useTranslation(); // Destructure the translation function

  return (
    <section className="h-[500px] bg-[url('/grid.svg')]">
      <div className="mx-auto max-w-screen-xl z-30 px-4 pt-32 lg:flex">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            {t('hero.title')}
            <strong className="font-extrabold text-primary sm:block">
              {t('hero.subtitle')}
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed text-gray-500">
            {t('hero.description')}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-purple-600 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
              href="#"
            >
              {t('hero.createAIForm')}
            </a>

            <a
              className="block w-full rounded px-12 py-3 text-sm font-medium text-primary shadow hover:text-purple-600 focus:outline-none focus:ring active:text-red-500 sm:w-auto"
              href="#"
            >
              {t('hero.learnMore')}
            </a>
          </div>
        </div>
      </div>

      <section className="">
        <div className="mx-auto max-w-screen-xl px-4 py-56">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">{t('hero.howItWorks')}</h2>

            <p className="mt-4 text-gray-300">
              {t('hero.howItWorksDescription')}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <a
              className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
              href="#"
            >
              <AtomIcon className='h-8 w-8' />

              <h2 className="mt-4 text-xl font-bold text-black">{t('hero.steps.step1Title')}</h2>

              <p className="mt-1 text-sm text-gray-600">
                {t('hero.steps.step1Description')}
              </p>
            </a>

            <a
              className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
              href="#"
            >
              <Edit className='h-8 w-8' />

              <h2 className="mt-4 text-xl font-bold text-black">{t('hero.steps.step2Title')}</h2>

              <p className="mt-1 text-sm text-gray-600">
                {t('hero.steps.step2Description')}
              </p>
            </a>

            <a
              className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
              href="#"
            >
              <Share2 className='h-8 w-8' />

              <h2 className="mt-4 text-xl font-bold text-black">{t('hero.steps.step3Title')}</h2>

              <p className="mt-1 text-sm text-gray-600">
                {t('hero.steps.step3Description')}
              </p>
            </a>
          </div>

          <div className="mt-12 text-center">
            <a
              href="/sign-in"
              className="inline-block rounded bg-pink-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-pink-700 focus:outline-none focus:ring focus:ring-yellow-400"
            >
              {t('hero.getStartedToday')}
            </a>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Hero;
