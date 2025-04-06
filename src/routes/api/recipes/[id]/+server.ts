import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import type { RecipeEntityDto } from '$lib/types/recipe.dto'
import recipeRepository from '$lib/server/recipe.repository'

export const GET: RequestHandler = async ({ params }) => {
  const recipe = await recipeRepository.getRecipeById(params.id)

  if (!recipe) {
    return new Response('Recipe not found', { status: 404 })
  }

  return json(recipe)
}

export const PUT: RequestHandler = async ({ params, request }) => {
  try {
    const recipeData = await request.json() as Partial<RecipeEntityDto>
    const updatedRecipe = await recipeRepository.updateById(params.id, recipeData)

    return json({
      success: true,
      recipe: updatedRecipe
    })
  } catch (error) {
    console.error('Error updating recipe:', error)
    return json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update recipe'
      },
      { status: 500 }
    )
  }
}

export const DELETE: RequestHandler = async ({ params }) => {
  try {
    await recipeRepository.deleteById(params.id)

    return json({
      success: true
    })
  } catch (error) {
    console.error('Error deleting recipe:', error)
    return json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete recipe'
      },
      { status: 500 }
    )
  }
}
