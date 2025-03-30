import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import recipeRepository from '$lib/server/recipe.repository'

export const GET: RequestHandler = async () => {
  const recipes = recipeRepository.getRecipeListing()
  return json(recipes)
}
