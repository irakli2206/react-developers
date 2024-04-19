'use server'

import { ProfileT } from "@/types/general";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";


export async function getUser() {
    const supabase = createClient()
    const { data, error } = await supabase.auth.getUser()
    return data.user
}

export async function getProfileData() {
    const supabase = createClient()

    const { data, error } = await supabase.auth.getUser()
    const { data: profile, error: profileError } = await supabase.from('profiles').select('*').eq('id', data.user?.id).maybeSingle()

    if (profileError) throw Error("No profile found")

    const formattedData: ProfileT = { ...profile }

    if (!formattedData.skills) formattedData.skills = []
    if (!formattedData.role_levels) formattedData.role_levels = []
    if (!formattedData.languages) formattedData.languages = []

    return formattedData
}


export async function getProfileByID(id: string) {
    const supabase = createClient()

    const { data, error } = await supabase.from('profiles').select('*').eq('id', id).maybeSingle()

    if (error) throw Error("No profile found")

    const formattedData: ProfileT = { ...data }

    if (!formattedData.skills) formattedData.skills = []
    if (!formattedData.role_levels) formattedData.role_levels = []
    if (!formattedData.languages) formattedData.languages = []

    return formattedData
}

export async function getProfiles(limit?: number): Promise<ProfileT[]> {
    const supabase = createClient()

    const query = supabase.from('profiles').select('*')
    if (limit) query.limit(limit)

    const { data, error } = await query

    if (error) throw Error("No data found")


    return data
}


export async function getFilteredProfiles(country?: string, role_levels?: string[], searchString?: string) {

    const supabase = createClient()
    let query = supabase.from('profiles').select()
    console.log(searchString)
    if (searchString) query = query.ilike('title', `%${searchString}%`)
    if (role_levels) query = query.contains('role_levels', role_levels)
    if (country) query = query.eq('country', country)

    const { data, error } = await query
    if (error) throw Error(error.message)

    return data
}
