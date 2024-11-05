import { Button } from '@/components/ui/button'
import { db } from '@/configs'
import { userResponses } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import { Loader2 } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import * as XLSX from 'xlsx';

interface FormRecord {
  id: string; 
}

function FormListItemResp({jsonForm, formRecord}: {jsonForm: any, formRecord: FormRecord}) {
 
    
    const [loading,setLoading]=useState(false);
    const [responseCount, setResponseCount] = useState(0);

    useEffect(() => {
        getResponseCount();
    }, []);

    const getResponseCount = async () => {
        const result = await db.select().from(userResponses)
            .where(eq(userResponses.formRef, formRecord.id));
        setResponseCount(result.length);
    };

    const ExportData=async()=>{
        let jsonData: any[] = [];
        setLoading(true);
        const result=await db.select().from(userResponses)
        .where(eq(userResponses.formRef,formRecord.id));

        console.log(result);
        if(result)
        { 
            result.forEach((item)=>{
                const jsonItem=JSON.parse(item.jsonResponse);
                jsonData.push(jsonItem);
            })
            setLoading(false);
        }
        console.log(jsonData);
        exportToExcel(jsonData)
    }

    
    /**
     * Convert Json to Excel and then Donwload it
     */
    const exportToExcel=(jsonData: any[])=>{
        const worksheet = XLSX.utils.json_to_sheet(jsonData);
        
        // Calculate maximum width for each column based on content and headers
        const colWidths: { wch: number }[] = [];
        const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');
        
        for (let C = range.s.c; C <= range.e.c; ++C) {
            let maxLength = 0;
            
            // Get column letter (A, B, C, etc.)
            const columnLetter = XLSX.utils.encode_col(C);
            
            // Check header length
            const headerAddress = columnLetter + "1";
            if (worksheet[headerAddress]) {
                maxLength = Math.max(maxLength, String(worksheet[headerAddress].v).length);
            }
            
            // Check content length for each row
            for (let R = range.s.r + 1; R <= range.e.r; ++R) {
                const address = columnLetter + (R + 1);
                if (worksheet[address]) {
                    maxLength = Math.max(maxLength, String(worksheet[address].v).length);
                }
            }
            
            // Set column width (add some padding)
            colWidths[C] = { wch: Math.min(maxLength + 2, 50) }; // Cap width
        }
        
        worksheet['!cols'] = colWidths;

        // Style the header row
        for (let C = range.s.c; C <= range.e.c; ++C) {
            const address = XLSX.utils.encode_col(C) + "1";
            if (!worksheet[address]) continue;
            worksheet[address].s = {
                font: { bold: true },
                fill: { fgColor: { rgb: "EEEEEE" } },
                alignment: { horizontal: "center" }
            };
        }

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, jsonForm?.formTitle+".xlsx");
    }

  return (
    <div className='border shadow-sm rounded-lg p-4 my-5'>
       
        <h2 className='text-lg text-black'>{jsonForm?.formTitle}</h2>
        <h2 className='text-sm text-gray-500'>{jsonForm?.formHeading}</h2>
        <hr className='my-4'></hr>
        <div className='flex flex-col md:flex-row justify-between items-center'>
            <h2 className='text-sm'><strong>{responseCount}</strong> Responses</h2>
            <Button className="" size="sm"
            onClick={()=>ExportData()}
            disabled={loading}
            >
                {loading?<Loader2 className='animate-spin' />:'Export' }
                </Button>
        </div>
    </div>
  )
}

export default FormListItemResp