import type { PageServerLoad } from './$types'
import recipeService from '$lib/server/recipe.service'

export const load: PageServerLoad = async () => {
  const recipes = await recipeService.getRecipeListing()

  return {
    recipes
  }
}
