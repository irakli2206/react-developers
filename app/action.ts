'use server'

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";



export async function signout(formData: FormData) {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()
    revalidatePath('/dashboard')
    
}