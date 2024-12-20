import { Button } from '@/components/ui/button'
import { Edit, Share, Trash } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { useUser } from '@clerk/nextjs'
import { db } from '@/configs'
import { JsonForms } from '@/configs/schema'
import { and, eq } from 'drizzle-orm'
import { toast } from 'sonner'
import { RWebShare } from 'react-web-share'
import { useTranslations } from 'next-intl';
  
function FormListItem({formRecord,jsonForm,refreshData}:{formRecord:any,jsonForm:any,refreshData:()=>void}) {

    const {user}=useUser();
    const t = useTranslations();

    const onDeleteForm=async()=>{
        const result=await db.delete(JsonForms)
        .where(and(eq(JsonForms.id,formRecord.id),
        eq(JsonForms.createdBy,user?.primaryEmailAddress?.emailAddress)))
        
        if(result)
        {
            toast(t('dashboard.forms.formDeleted'));
            refreshData()
        }
    }
  return (
    <div className='border shadow-sm rounded-lg p-4'>
        <div className='flex justify-between'>
            <h2></h2>
            
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Trash className='h-5 w-5 text-red-600 
                    cursor-pointer hover:scale-105 transition-all' 
                   
                    />
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>{t('dashboard.forms.deleteConfirm.title')}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {t('dashboard.forms.deleteConfirm.description')}
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>{t('dashboard.forms.deleteConfirm.cancel')}</AlertDialogCancel>
                    <AlertDialogAction
                     onClick={()=>onDeleteForm()}
                     >{t('dashboard.forms.deleteConfirm.continue')}</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialog>

        </div>
        <h2 className='text-lg text-black'>{jsonForm?.formTitle}</h2>
        <h2 className='text-sm text-gray-500'>{jsonForm?.formHeading}</h2>
        <hr className='my-4'></hr>
        <div className='flex flex-col md:flex-row justify-between'>
        <RWebShare
        data={{
          text: `${jsonForm?.formHeading}, ${t('dashboard.forms.shareText')}`,
          url: process.env.NEXT_PUBLIC_BASE_URL+"/aiform/"+formRecord?.id,
          title: jsonForm?.formTitle,
        }}
     
      >
    <Button variant="outline" size="sm" className="flex gap-2"> <Share className='h-5 w-5'/> {t('dashboard.forms.share')}</Button>

      </RWebShare>
            <Link href={'/edit-form/'+formRecord?.id}>
                <Button className="flex gap-2"  size="sm"> <Edit className='h-5 w-5'/> {t('dashboard.forms.edit')}</Button>
            </Link>
        </div>
    </div>
  )
}

export default FormListItem