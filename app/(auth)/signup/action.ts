'use server'

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from '@/utils/supabase/server'
import { redirect } from "next/navigation";
import { ValidationDataT } from "./page";
import { SignupSchema } from "@/utils/form/schemas";
import { SignupFormValues } from "./_components/view";
 

export async function signup({email, password, firstName, lastName}: SignupFormValues) {
    const supabase = createClient()
  
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                first_name: firstName,
                last_name: lastName,
            }
        }
    })

    if (error) {
        return { error: error.message }
    }

    const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .insert([
            {
                id: data.user?.id,
                email: data.user?.email,
                name: data.user?.user_metadata.first_name + " " + data.user?.user_metadata.last_name
            },
        ])
        .select()

    if (profileError) {
        redirect('/error')
    }



    revalidatePath('/', 'layout')
    redirect('/dashboard')
}