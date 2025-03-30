import { json } from '@sveltejs/kit'
import { supabase } from '$lib/server/supabase'
import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { email, password, firstName, lastName } = await request.json()

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName
        },
        emailRedirectTo: `${process.env.PUBLIC_SITE_URL}/login`
      }
    })

    if (error) {
      return json({ error: error.message }, { status: 400 })
    }

    return json({
      message: 'Please check your email to confirm your account',
      user: data.user
    })
  } catch (error) {
    return json({ error: 'Internal server error' }, { status: 500 })
  }
}
