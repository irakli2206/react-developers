'use server'

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from '@/utils/supabase/server'
import { redirect } from "next/navigation";

// export async function createTodo(
//     prevState: {
//         message: string;
//     },
//     formData: FormData,
// ) {
//     const schema = z.object({
//         todo: z.string().min(1),
//     });
//     const parse = schema.safeParse({
//         todo: formData.get("todo"),
//     });

//     if (!parse.success) {
//         return { message: "Failed to create todo" };
//     }

//     const data = parse.data;

//     try {
//         await sql`
//         INSERT INTO todos (text)
//         VALUES (${data.todo})
//       `;

//         revalidatePath("/");
//         return { message: `Added todo ${data.todo}` };
//     } catch (e) {
//         return { message: "Failed to create todo" };
//     }
// }


export async function signup(prevState: { message: string }, formData: FormData) {
    const supabase = createClient()

    const schema = z.object({
        first_name: z.string().min(1),
        last_name: z.string().min(1),
        email: z.string().email().min(1),
        password: z.string().min(1)
    })


    // type-casting here for convenience
    // in practice, you should validate your inputs
    const parsedForm = schema.parse({
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        first_name: formData.get('first_name') as string,
        last_name: formData.get('last_name') as string,
    })


    const { data, error } = await supabase.auth.signUp({
        email: parsedForm.email, 
        password: parsedForm.password,
        options: {
            data: {
                first_name: parsedForm.first_name,
                last_name: parsedForm.last_name,
            }
        }
    })

    if (error) {
        // redirect('/error')
        console.log(error.name)
        return { message: error.code }
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
        // redirect('/error')
        return { message: `Failed to create profile` }
    }
    console.log('created user data', data)



    revalidatePath('/', 'layout')
    redirect('/dashboard')
}