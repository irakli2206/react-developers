'use server'

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateGeneralInfo(state: any, formData: FormData) {
    const supabase = createClient()

    const parsedForm = {
        name: formData.get('name'),
        title: formData.get('title'),
        country: formData.get('country'),
        bio: formData.get('bio'),
    }

    const { data: updateData, error: updateError } = await supabase.from('profiles').update(
        parsedForm
    )

    return revalidatePath('/dashboard/general')
}


export async function getGeneralInfo(){
    
}