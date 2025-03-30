import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ request }) => {
  try {
    // Example JSON server URL - you can replace this with your actual JSON server URL
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: 'Example Post',
        body: 'This is an example post',
        userId: 1
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })

    const data = await response.json()
    return json(data)
  } catch (error) {
    return json({ error: 'Failed to send request' }, { status: 500 })
  }
}
