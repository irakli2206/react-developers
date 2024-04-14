'use server'

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from '@/utils/supabase/server'
import { redirect } from "next/navigation";
import { ValidationDataT } from "./page";
import { SignupSchema } from "@/utils/form/schemas";

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


export async function signup(prevState: { validationData: ValidationDataT }, formData: FormData) {
    const supabase = createClient()


    // type-casting here for convenience
    // in practice, you should validate your inputs
    const parsedForm = SignupSchema.safeParse({
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        first_name: formData.get('first_name') as string,
        last_name: formData.get('last_name') as string,
    })

    if (!parsedForm.success) {
        console.log(parsedForm.error)
        return { validationData: parsedForm.error.flatten() }
    }


    let { email, password, first_name, last_name } = parsedForm.data

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                first_name: first_name,
                last_name: last_name,
            }
        }
    })

    if (error) {
        redirect('/error')
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
        redirect('/error')
    }
    console.log('created user data', data)



    revalidatePath('/', 'layout')
    redirect('/dashboard')
}