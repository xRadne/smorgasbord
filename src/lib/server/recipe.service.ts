import type { OpenaiRecipeResponseDto } from './dto/openai.dto'
import type { RecipeEntity } from './entity/recipe.entity'
import openaiService from './openai.service'
import recipeRepository from './recipe.repository'

class RecipeService {
    async getRecipeById(id: string): Promise<RecipeEntity> {
        return recipeRepository.getRecipeById(id)
    }
  
    async createRecipeFromUrl(url: string): Promise<RecipeEntity> {
        const recipeData = await openaiService.extractRecipeFromUrl(url)

        if (recipeData.error) {
            throw new Error(recipeData.error)
        }

        const recipe: Omit<RecipeEntity, 'id'> = {
            title: recipeData.recipe.title,
            description: recipeData.recipe.description,
            imageUrl: recipeData.recipe.imageUrl,
            difficulty: recipeData.recipe.difficulty,
            preparationTimeMinutes: recipeData.recipe.preparationTimeMinutes,
            cookingTimeMinutes: recipeData.recipe.cookingTimeMinutes,
            servings: recipeData.recipe.servings,
            ingredients: recipeData.recipe.ingredients,
            instructions: recipeData.recipe.instructions
        }

        return recipeRepository.createRecipe(recipe)
    }

    async createRecipeFromImage(imageBuffer: Buffer): Promise<RecipeEntity> {
        const recipeData = await openaiService.extractRecipeFromImage(imageBuffer)

        if (recipeData.error) {
            throw new Error(recipeData.error)
        }

        const recipe: Omit<RecipeEntity, 'id'> = {
            title: recipeData.recipe.title,
            description: recipeData.recipe.description,
            imageUrl: recipeData.recipe.imageUrl,
            difficulty: recipeData.recipe.difficulty,
            preparationTimeMinutes: recipeData.recipe.preparationTimeMinutes,
            cookingTimeMinutes: recipeData.recipe.cookingTimeMinutes,
            servings: recipeData.recipe.servings,
            ingredients: recipeData.recipe.ingredients,
            instructions: recipeData.recipe.instructions
        }

        return recipeRepository.createRecipe(recipe)
    }
}

const recipeService = new RecipeService()
export default recipeService
