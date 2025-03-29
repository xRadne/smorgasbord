import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
    const { url } = await request.json();
    
    // Log the URL to the console
    console.log('Received recipe URL:', url);
    
    return json({ success: true });
}; 