'use server'

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";


export async function getProfileData() {
    const supabase = createClient()

    const { data, error } = await supabase.auth.getUser()
    const { data: profile, error: profileError } = await supabase.from('profiles').select('*').eq('id', data.user?.id)

    if (profileError) return "No profile found"

    const formattedData = { ...profile[0] }

    if (!formattedData.skills) formattedData.skills = []
    if (!formattedData.role_levels) formattedData.role_levels = []
    if (!formattedData.languages) formattedData.languages = []

    return formattedData
}


export async function getProfileByID(id: string) {
    const supabase = createClient()

    const { data, error } = await supabase.from('profiles').select('*').eq('id', id)

    if (error) return "No profile found"

    const formattedData = { ...data[0] }

    if (!formattedData.skills) formattedData.skills = []
    if (!formattedData.role_levels) formattedData.role_levels = []
    if (!formattedData.languages) formattedData.languages = []

    return formattedData
}

