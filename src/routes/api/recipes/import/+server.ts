import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import recipeService from '$lib/server/recipe.service'

export const POST: RequestHandler = async ({ request }) => {
  try {
    const formData = await request.formData()
    const url = formData.get('url') as string | null
    const image = formData.get('image') as File | null

    if (!url && !image) {
      return json(
        {
          success: false,
          error: 'Please provide either a URL or an image'
        },
        { status: 400 }
      )
    }

    let recipe
    if (image) {
      // Convert File to Buffer
      const imageBuffer = Buffer.from(await image.arrayBuffer())
      recipe = await recipeService.createRecipeFromImage(imageBuffer)
    } else if (url) {
      recipe = await recipeService.createRecipeFromUrl(url)
    }

    if (!recipe) {
      return json(
        {
          success: false,
          error: 'Failed to create recipe'
        },
        { status: 500 }
      )
    }

    return json({
      success: true,
      data: recipe
    })
  } catch (error) {
    console.error('Error processing recipe:', error)
    return json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to process recipe'
      },
      { status: 500 }
    )
  }
}
