import { json } from '@sveltejs/kit'
import { supabase } from '$lib/server/supabase'
import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ request, cookies }) => {
  try {
    const { email, password } = await request.json()

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      return json({ error: error.message }, { status: 400 })
    }

    // Set the session cookie
    const { session } = data
    cookies.set('session', JSON.stringify(session), {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    })

    return json({ user: data.user })
  } catch (error) {
    return json({ error: 'Internal server error' }, { status: 500 })
  }
}
