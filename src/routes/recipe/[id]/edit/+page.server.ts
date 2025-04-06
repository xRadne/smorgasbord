import { error } from '@sveltejs/kit'
import recipeService from '$lib/server/recipe.service'
import type { PageServerLoad } from '../$types'

export const load: PageServerLoad = async ({ params }) => {
  try {
    const recipe = await recipeService.getRecipeById(params.id)

    if (!recipe) {
      throw error(404, 'Recipe not found')
    }

    return {
      recipe
    }
  } catch (e) {
    console.error('Error loading recipe:', e)
    throw error(500, 'Failed to load recipe')
  }
} 