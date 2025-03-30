import type { PageServerLoad } from './$types'
import recipeRepository from '$lib/server/recipe.repository'

export const load: PageServerLoad = async () => {
  const recipes = await recipeRepository.getRecipeListing()

  return {
    recipes
  }
}
