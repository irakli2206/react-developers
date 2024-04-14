'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { z } from 'zod'

export async function signin(prevState: {message: string}, formData: FormData) {
    const supabase = createClient()

    const schema = z.object({
        email: z.string().email().min(1),
        password: z.string().min(1)
    })
  
    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = schema.parse({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    })
  
    const { error } = await supabase.auth.signInWithPassword(data)
  
    if (error) {
      redirect('/error')
    }
  
    revalidatePath('/', 'layout')
    redirect('/dashboard')
  }