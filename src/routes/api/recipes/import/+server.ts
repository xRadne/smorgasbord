import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export const POST: RequestHandler = async ({ request }) => {
    const { url } = await request.json();
    
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant that analyzes recipe URLs and extracts recipe information. Respond with a JSON object containing the recipe details in a structured format."
                },
                {
                    role: "user",
                    content: `Please analyze this recipe URL and extract the recipe information: ${url}`
                }
            ],
            response_format: { type: "json_object" }
        });

        const recipeData = JSON.parse(completion.choices[0].message.content);
        console.log('Extracted recipe data:', recipeData);
        
        return json({ 
            success: true,
            data: recipeData
        });
    } catch (error) {
        console.error('Error processing recipe:', error);
        return json({ 
            success: false, 
            error: 'Failed to process recipe URL' 
        }, { status: 500 });
    }
}; 