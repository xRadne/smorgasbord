import { supabase } from '$lib/server/supabase'
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
  // Get session from cookie
  const sessionCookie = event.cookies.get('session')
  if (sessionCookie) {
    try {
      const session = JSON.parse(sessionCookie)
      const {
        data: { user },
        error
      } = await supabase.auth.getUser(session.access_token)

      if (error) {
        event.cookies.delete('session', { path: '/' })
        return resolve(event)
      }

      event.locals.user = user
    } catch (error) {
      event.cookies.delete('session', { path: '/' })
    }
  }

  return resolve(event)
}
