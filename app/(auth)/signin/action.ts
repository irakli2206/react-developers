'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { z } from 'zod'
import { SigninSchema } from '@/utils/form/schemas'
import { ValidationDataT } from './page'

export async function signin(prevState: { validationData: ValidationDataT }, formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const parsedForm = SigninSchema.safeParse({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })

  if (!parsedForm.success) {
    console.log(parsedForm.error)
    return { validationData: parsedForm.error.flatten() }
  }

  let { email, password } = parsedForm.data

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  })

  if (error) {
    console.log(error)
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}