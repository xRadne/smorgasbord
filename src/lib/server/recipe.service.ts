import { RecipeEntity, type OpenaiRecipeResponseDto } from '$lib'
import openaiService from './openai.service'
import recipeRepository from './recipe.repository'

class RecipeService {
  async createRecipeFromUrl(url: string): Promise<OpenaiRecipeResponseDto> {
    const recipeData = await openaiService.extractRecipeFromUrl(url)


    const recipe: Omit<RecipeEntity, 'id'> = {
        title: recipeData.title,
        description: recipeData.description,
        imageUrl: recipeData.imageUrl,
        difficulty: recipeData.difficulty,
        preparationTimeMinutes: recipeData.preparationTimeMinutes,
        cookingTimeMinutes: recipeData.cookingTimeMinutes,
        servings: recipeData.servings,
        ingredients: recipeData.ingredients,
        instructions: recipeData.instructions
    }

    await recipeRepository.createRecipe(recipe)

    return recipeData
  }
}

const recipeService = new RecipeService()
export default recipeService
