'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { z } from 'zod'
import { SigninSchema } from '@/utils/form/schemas'
import { ValidationDataT } from './page'

 

export async function updatePassword(newPassword: string) {
  const supabase = createClient()
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  })
  console.log('updatePassword', data)

  if (error) {
    console.log(error.message)
    redirect('/error')
  }

  redirect('/dashboard')
}