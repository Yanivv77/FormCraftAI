"use client"
import { db } from '@/configs'
import { JsonForms } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import FormListItemResp from './_components/FormListItemResp'

// Add this import at the top of the file
import { InferModel } from 'drizzle-orm'

// Define the type for a single form
type FormType = InferModel<typeof JsonForms>

function Responses() {
    const {user} = useUser();
    // Update the state type
    const [formList, setFormList] = useState<FormType[]>([]);

    useEffect(() => {
        user && getFormList();
    }, [user])

    const getFormList = async () => {
        const result = await db.select().from(JsonForms)
            .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))
        
            console.log(result[0].jsonform)
        setFormList(result);
    }

    return formList && (
        <div className='p-10'>
            <h2 className='font-bold text-3xl flex items-center justify-between'>Responses</h2>

            <div className='grid grid-cols-2 lg:grid-cols-3 gap-5'>
                {formList.map((form: FormType, index: number) => (
                    <FormListItemResp
                        key={form.id} // Add a key prop for better React performance
                        formRecord={form}
                        jsonForm={JSON.parse(form.jsonform)}
                    />
                ))}
            </div>
        </div>
    )
}

export default Responses
