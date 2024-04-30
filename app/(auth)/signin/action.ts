'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { z } from 'zod'
import { SigninSchema } from '@/utils/schemas'
import { ValidationDataT } from './page'
import { SigninFormValues } from './_components/view'
import { BASE_URL } from '@/env'

export async function signin({ email, password }: SigninFormValues) {
  const supabase = createClient()


  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  })


  if (error) {
    return { error: error.message }
  }
  const { data: profile, error: profileError } = await supabase.from('profiles').select().eq('id', data.user.id).maybeSingle()

  if(profile.account_type === 'employer') {
    redirect('/developers')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard/general')

}

export async function googleSignin() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',

  })

  if (error) {
    console.log(error.message)
    redirect('/error')
  }

  console.log('GITHUB INFO', data)

  revalidatePath('/', 'layout')
  redirect('/signin')
}

export async function sendResetPassword(email: string) {
  const supabase = createClient()
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${BASE_URL}/reset-password`,
  })

  if (error) {
    console.log(error.message)
    redirect('/error')
  }

  console.log('resetPassword', data)
}

