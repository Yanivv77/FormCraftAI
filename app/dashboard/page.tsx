import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

import FormList from './_components/FormList'

function Dashboard() {
    return (
        <div className='p-10 w-full'>
            
            {/* List of Forms  */}
            <FormList/>
        </div>
    )
}

export default Dashboard
