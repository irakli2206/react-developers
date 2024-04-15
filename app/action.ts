'use server'

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

const supabase = createClient()

export async function getProfileData() {
    const { data, error } = await supabase.auth.getUser()
    const { data: profile, error: profileError } = await supabase.from('profiles').select('*').eq('id', data.user?.id)

    if (profileError) return "No profile found"

    const fullData = { ...profile[0] }

    if (!fullData.skills) fullData.skills = []
    if (!fullData.role_levels) fullData.role_levels = []


    return fullData
}

export async function signout() {

    const { error } = await supabase.auth.signOut()
    revalidatePath('/dashboard')

}