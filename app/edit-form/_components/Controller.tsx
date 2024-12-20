import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import Themes from '@/app/_data/Themes'
import GradientBg from '@/app/_data/GradientBg'
import { Button } from '@/components/ui/button'
import Style from '@/app/_data/Style'
import { Checkbox } from '@/components/ui/checkbox'
import { useTranslations } from 'next-intl';


interface ControllerProps {
    selectedTheme: (theme: string) => void;
    selectedBackground: (background: string) => void;
    selectedStyle: (style: string) => void;
    setSignInEnable: (enable: boolean) => void;
}

function Controller({ selectedTheme, selectedBackground, selectedStyle, setSignInEnable }: ControllerProps) {
    const [showMore, setShowMore] = useState(6);
    const t = useTranslations();

    return (
        <div>
            {/* Theme selection Controller */}
            <h2 className='my-1'>{t('editor.controller.themes')}</h2>
            <Select onValueChange={(value)=>selectedTheme(value)}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={t('editor.controller.select.themePlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                    {Themes.map((theme,index)=>(
                        <SelectItem value={theme.theme} key={index}>
                            <div className='flex gap-3'>
                                <div className='flex'>
                                    <div className='h-5 w-5 rounded-l-md' 
                                    style={{backgroundColor:theme.primary}}
                                    ></div>
                                     <div className='h-5 w-5' 
                                    style={{backgroundColor:theme.secondary}}
                                    ></div>
                                     <div className='h-5 w-5' 
                                    style={{backgroundColor:theme.accent}}
                                    ></div>
                                     <div className='h-5 w-5 rounded-r-md' 
                                    style={{backgroundColor:theme.neutral}}
                                    ></div>
                                  
                                </div>
                                {theme.theme}
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Background Selection Controller */}
            <h2 className='mt-8 my-1'>{t('editor.controller.background')}</h2>
            <div className='grid grid-cols-3 gap-5'>
                {GradientBg.map((bg,index)=>(index<showMore)&&(
                    <div 
                        key={index}
                        onClick={()=>selectedBackground(bg.gradient)}
                        className='w-full h-[70px] rounded-lg cursor-pointer hover:border-black hover:border-2 flex items-center justify-center'
                        style={{background:bg.gradient}}
                    >
                        {index==0 && t('editor.controller.none')}
                    </div>
                ))}
            </div>
            <Button 
                variant="ghost" 
                size="sm" 
                className="w-full my-1"
                onClick={()=>setShowMore(showMore>6?6:20)}
            >
                {showMore>6 ? t('editor.controller.showLess') : t('editor.controller.showMore')}
            </Button>

            {/* Style Selection Controller */}
            <div>
                <label>{t('editor.controller.style')}</label>
                <div className='grid grid-cols-3 gap-3'>
                    {Style.map((item, index) => (
                        <div className='max-w-[120px] max-h-[100px] justify-self-center' key={index}>
                            <div className='cursor-pointer hover:border-2 rounded-lg' onClick={() => selectedStyle(item.value)}>
                                <img src={item.img} width={600} height={80} className='rounded-lg'/>
                            </div>
                            <h2 className='text-center'>{item.name}</h2>
                        </div>
                    ))}
                </div>
            </div>

            <div className='flex gap-2 my-4 items-center mt-10'>
                <Checkbox onCheckedChange={(e: boolean) => setSignInEnable(e)} /> 
                <h2>{t('editor.controller.authentication.label')}</h2>
            </div>
        </div>
    )
}

export default Controller
