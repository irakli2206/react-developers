'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { z } from 'zod'
import { SigninSchema } from '@/utils/form/schemas'
import { ValidationDataT } from './page'
import { SigninFormValues } from './_components/view'

export async function signin({ email, password }: SigninFormValues) {
  const supabase = createClient()


  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')

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
    redirectTo: `${process.env.NEXT_PUBLIC_URL}/reset-password`,
  })

  if (error) {
    console.log(error.message)
    redirect('/error')
  }

  console.log('resetPassword', data)
}

