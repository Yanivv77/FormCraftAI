"use client"
import { db } from '@/configs'
import { JsonForms } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm'
import { ArrowLeft, Share2, SquareArrowOutUpRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import FormUi from '../_components/FormUi'
import { fromJSON } from 'postcss'
import { toast } from 'sonner'
import Controller from '../_components/Controller'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { RWebShare } from 'react-web-share'

interface Field {
  label: string;
  placeholder: string;
  // Add other field properties as needed
}

interface JsonForm {
  formHeading: string;
  formTitle: string;
  fields: Field[];
  background: string;
  theme: string;
  style: Record<string, any>;
  // Add other form properties as needed
}

function EditForm({ params }:any) {

  const { user } = useUser();
  const [jsonForm, setJsonForm] = useState<JsonForm>({
    formHeading: "",
    formTitle: "",
    fields: [],
    background: "",
    theme: "light",
    style: {},
    // Initialize other properties as needed
  });
  const router = useRouter();
  const [updateTrigger, setUpdateTrigger] = useState<any>();
  const [record, setRecord] = useState<any>();

  const [selectedTheme, setSelectedTheme] = useState('light');
  const [selectedBackground, setSelectedBackground] = useState<any>();
  const [selectedStyle, setSelectedStyle] = useState<any>();

  useEffect(() => {
    user && GetFormData();
  }, [user])
  const GetFormData = async () => {
    const result = await db.select().from(JsonForms)
      .where(and(eq(JsonForms.id, params?.formId),
        eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)));

    setRecord(result[0])
    console.log(result[0])
    setJsonForm(JSON.parse(result[0].jsonform))
    setSelectedBackground(result[0].background)
    setSelectedTheme(result[0].theme)
    setSelectedStyle(JSON.parse(result[0].style))



  }

  useEffect(() => {
    if (updateTrigger) {
      setJsonForm(jsonForm);
      updateJsonFormInDb();
    }
  }, [updateTrigger])

  const onFieldUpdate = (value: any, index: number) => {
    setJsonForm(prevForm => {
      const updatedFields = [...prevForm.fields];
      updatedFields[index] = {
        ...updatedFields[index],
        label: value.label,
        placeholder: value.placeholder,
      };
      return { ...prevForm, fields: updatedFields };
    });
    setUpdateTrigger(Date.now());
  };

  const updateJsonFormInDb = async () => {
    const result = await db.update(JsonForms)
      .set({
        jsonform: jsonForm
      }).where(and(eq(JsonForms.id, record.id),
        eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)))
      .returning({ id: JsonForms.id })

    toast('Updated!!!')
    console.log(result);
  }

  const deleteField = (indexToRemove: number) => {
    const result = jsonForm.fields.filter((item, index) => index != indexToRemove)

    jsonForm.fields = result;
    setUpdateTrigger(Date.now())
  }

  const updateControllerFields = async (value: any, columnName: string) => {
    console.log(value, columnName)
    const result = await db.update(JsonForms).set({
      [columnName]: value
    }).where(and(eq(JsonForms.id, record.id),
      eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)))
      .returning({ id: JsonForms.id })

    toast('Updated!!!')

  }

  return (
    <div className='p-10'>
      <div className='flex justify-between items-center'>
        <h2 className='flex gap-2 items-center my-5 cursor-pointer
        hover:font-bold ' onClick={() => router.back()}>
          <ArrowLeft /> Back
        </h2>
        <div className='flex gap-2'>
          <Link href={'/aiform/' + record?.id} target="_blank">
            <Button className="flex gap-2" > <SquareArrowOutUpRight className='h-5 w-5' /> Live Preview</Button>
          </Link>
          <RWebShare
            data={{
              text: jsonForm?.formHeading + " , Build your form in seconds with AI form Builder ",
              url: process.env.NEXT_PUBLIC_BASE_URL + "/aiform/" + record?.id,
              title: jsonForm?.formTitle,
            }}
            onClick={() => console.log("shared successfully!")}
          >
            <Button className="flex gap-2 bg-green-600 hover:bg-green-700"> <Share2 /> Share</Button>

          </RWebShare>

        </div>
      </div>
      <div className='grid grid-cols-1  md:grid-cols-3 gap-5'>
        <div className='p-5 border rounded-lg shadow-md'>
          <Controller
            selectedTheme={(value: React.SetStateAction<string>) => {
              updateControllerFields(value, 'theme')
              setSelectedTheme(value)
            }}
            selectedBackground={(value: any) => {
              updateControllerFields(value, 'background')

              setSelectedBackground(value)
            }
            }
            selectedStyle={(value: any) => {
              setSelectedStyle(value);
              updateControllerFields(value, 'style')
            }}

            setSignInEnable={(value: any) => {
              updateControllerFields(value, 'enabledSignIn')
            }}
          />
        </div>
        <div className='md:col-span-2 border rounded-lg p-5 
             flex items-center justify-center'
          style={{
            backgroundImage: selectedBackground
          }}
        >

          <FormUi jsonForm={jsonForm}
            selectedTheme={selectedTheme}
            selectedStyle={selectedStyle}
            onFieldUpdate={onFieldUpdate}
            deleteField={(index: number) => deleteField(index)}
          />
        </div>
      </div>
    </div>
  )
}

export default EditForm
