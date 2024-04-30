'use server'

import { Profile } from "@/types/database.types";
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

    if (!data.user) return null

    const { data: profile, error: profileError } = await supabase.from('profiles').select('*').eq('id', data.user?.id).maybeSingle()


    if (profileError) throw Error("No profile found")

    const formattedData: Profile = {
        ...profile,
    }

    if (!formattedData.skills) formattedData.skills = []
    if (!formattedData.role_levels) formattedData.role_levels = []
    if (!formattedData.languages) formattedData.languages = []
    return formattedData
}



export async function getProfileByID(id: string) {
    const supabase = createClient()

    const { data, error } = await supabase.from('profiles').select('*').eq('id', id).maybeSingle()

    if (error) throw Error("No profile found")

    const { data: avatar } = supabase.storage.from('avatars').getPublicUrl(`public/${data.id}`)

    const formattedData: Profile = { ...data }


    if (!formattedData.skills) formattedData.skills = []
    if (!formattedData.role_levels) formattedData.role_levels = []
    if (!formattedData.languages) formattedData.languages = []

    return formattedData
}

export async function getProfiles(limit?: number, availableOnly?: boolean): Promise<Profile[]> {
    const supabase = createClient()

    const query = supabase.from('profiles').select('*')
    if (availableOnly) query.eq('available', availableOnly)
    if (limit) query.limit(limit)

    const { data, error } = await query

    if (error) throw Error("No data found")


    return data
}


export async function getFilteredProfiles(country: string, role_levels: string[], searchString: string, hourlyRate: number, experience: number) {
    console.log(country)
    console.log(role_levels)
    const supabase = createClient()
    let query = supabase.from('profiles').select()
    query.eq('available', true)
    if (searchString) query = query.ilike('title', `%${searchString}%`)
    if (role_levels) query = query.contains('role_levels', role_levels)
    if (country) query = query.eq('country', country)
    if (hourlyRate) query = query.lte('hourly_rate', hourlyRate)
    if (experience) query = query.gte('experience_years', experience)

    const { data, error } = await query
    if (error) throw Error(error.message)

    return data
}

//Not using this for now, sometimes API gets too much load and it doesn't perform well
export async function getCountryList() {
    const countries = await fetch("https://restcountries.com/v3.1/all?fields=name", { cache: 'force-cache' })
    const countriesData = await countries.json()
    const countryNames = countriesData.map((c: any) => c.name.common).sort((a: any, b: any) => a - b)
    return countryNames
}

export async function signout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    // revalidatePath('/')
}


export async function clearCache(path: string) {
    revalidatePath(path)
}
