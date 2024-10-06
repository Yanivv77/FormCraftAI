"use client"

import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FlagProps {
  className?: string
}

const USFlag = ({ className }: FlagProps) => (
  <svg className={className} viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
    <g fillRule="evenodd">
      <g strokeWidth="1pt">
        <path fill="#bd3d44" d="M0 0h912v37H0zm0 73.9h912v37H0zm0 73.8h912v37H0zm0 73.8h912v37H0zm0 74h912v36.8H0zm0 73.7h912v37H0z"/>
        <path fill="#fff" d="M0 37h912v37H0zm0 73.8h912v37H0zm0 73.8h912v37H0zm0 73.9h912v37H0zm0 73.8h912v37H0z"/>
      </g>
      <path fill="#192f5d" d="M0 0h364.8v258.5H0z"/>
      <path fill="#fff" d="m30.4 11 3.4 10.3h10.6l-8.6 6.3 3.3 10.3-8.7-6.4-8.6 6.3L25 27.6l-8.7-6.3h10.9zm60.8 0 3.3 10.3h10.8l-8.7 6.3 3.2 10.3-8.6-6.4-8.7 6.3 3.3-10.2-8.6-6.3h10.6zm60.8 0 3.3 10.3H166l-8.6 6.3 3.3 10.3-8.7-6.4-8.7 6.3 3.3-10.2-8.7-6.3h10.8zm60.8 0 3.3 10.3h10.8l-8.7 6.3 3.3 10.3-8.7-6.4-8.7 6.3 3.4-10.2-8.8-6.3h10.7zm60.8 0 3.3 10.3h10.7l-8.6 6.3 3.3 10.3-8.7-6.4-8.7 6.3 3.3-10.2-8.6-6.3h10.7zm60.8 0 3.3 10.3h10.8l-8.8 6.3 3.4 10.3-8.7-6.4-8.7 6.3 3.3-10.2-8.6-6.3h10.6zM60.8 37l3.3 10.2H75l-8.7 6.2 3.2 10.3-8.5-6.3-8.7 6.3 3.1-10.3-8.4-6.2h10.7zm60.8 0 3.4 10.2h10.7l-8.8 6.2 3.4 10.3-8.7-6.3-8.7 6.3 3.3-10.3-8.7-6.2h10.8zm60.8 0 3.3 10.2h10.8l-8.7 6.2 3.3 10.3-8.7-6.3-8.7 6.3 3.3-10.3-8.6-6.2H179zm60.8 0 3.4 10.2h10.7l-8.8 6.2 3.4 10.3-8.7-6.3-8.6 6.3 3.2-10.3-8.7-6.2H240zm60.8 0 3.3 10.2h10.8l-8.7 6.2 3.3 10.3-8.7-6.3-8.7 6.3 3.3-10.3-8.6-6.2h10.7z"/>
    </g>
  </svg>
)

const IsraelFlag = ({ className }: FlagProps) => (
  <svg className={className} viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <clipPath id="a">
        <path fillOpacity=".7" d="M-87.6 0H595v512H-87.6z"/>
      </clipPath>
    </defs>
    <g fillRule="evenodd" clipPath="url(#a)" transform="translate(82.1) scale(.94)">
      <path fill="#fff" d="M619.4 512H-112V0h731.4z"/>
      <path fill="#00c" d="M619.4 115.2H-112V48h731.4zm0 350.5H-112v-67.2h731.4zm-483-275l110.1 191.6L359 191.6l-222.6-.8z"/>
      <path fill="#fff" d="M225.8 317.8l20.9 35.5 21.4-35.3-42.4-.2z"/>
      <path fill="#00c" d="M136 320.6L246.2 129l112.4 190.8-222.6.8z"/>
      <path fill="#fff" d="M225.8 191.6l20.9-35.5 21.4 35.4-42.4.1zM182 271.1l-21.7 36 41-.1-19.3-36zm-21.3-66.5l41.2.3-19.8 36.3-21.4-36.6zm151.2 67l20.9 35.5-41.7-.5 20.8-35zm20.5-67l-41.2.3 19.8 36.3 21.4-36.6zm-114.3 0L189.7 256l28.8 50.3 52.8 1.2 32-51.5-29.6-52-55.6.5z"/>
    </g>
  </svg>
)

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation()

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
    localStorage.setItem('language', lang) // Store preference
  }
  
  useEffect(() => {
    const storedLang = localStorage.getItem('language')
    if (storedLang && storedLang !== i18n.language) {
      i18n.changeLanguage(storedLang)
    }
  }, [i18n])

  return (
    <Select value={i18n.language} onValueChange={changeLanguage}>
      <SelectTrigger className="flex items-center">
        <SelectValue>
          {i18n.language === "en" ? (
            <div className="flex items-center">
              <USFlag className="w-5 h-3 mr-2" />
              <span className="hidden sm:inline">English</span>
            </div>
          ) : (
            <div className="flex items-center">
              <IsraelFlag className="w-5 h-3 mr-2" />
              <span className="hidden sm:inline">עברית</span>
            </div>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">
          <div className="flex items-center">
            <USFlag className="w-5 h-3 mr-2" />
            <span className="hidden sm:inline">English</span>
          </div>
        </SelectItem>
        <SelectItem value="he">
          <div className="flex items-center">
            <IsraelFlag className="w-5 h-3 mr-2" />
            <span className="hidden sm:inline">עברית</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  )
}

export default LanguageSwitcher