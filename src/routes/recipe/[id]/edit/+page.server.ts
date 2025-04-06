import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import recipeRepository from '$lib/server/recipe.repository'

export const load: PageServerLoad = async ({ params }) => {
  try {
    const recipe = await recipeRepository.getRecipeById(params.id)

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