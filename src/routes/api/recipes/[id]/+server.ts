import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import recipeRepository from '$lib/server/recipe.repository'

export const GET: RequestHandler = async ({ params }) => {
  const recipe = await recipeRepository.getRecipeById(params.id)

  if (!recipe) {
    return new Response('Recipe not found', { status: 404 })
  }

  return json(recipe)
}
