import { redirect, json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import openaiService from '$lib/server/openai.service'
import recipeService from '$lib/server/recipe.service'

export const POST: RequestHandler = async ({ request }) => {
  const { url } = await request.json()

  try {
    const recipeData = await recipeService.createRecipeFromUrl(url)

    return json({
      success: true,
      data: recipeData
    })
  } catch (error) {
    console.error('Error processing recipe:', error)
    return json(
      {
        success: false,
        error: 'Failed to process recipe URL'
      },
      { status: 500 }
    )
  }
}
