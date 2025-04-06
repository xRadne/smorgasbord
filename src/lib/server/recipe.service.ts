import { RecipeResponseDto, type RecipeListingDto } from '$lib/types/recipe.dto'
import type { IRecipeParser } from './interfaces/recipeParser.interface'
import recipeRepository from './recipe.repository'

export class RecipeService {
    constructor(private readonly recipeParser: IRecipeParser) {}

    async createRecipeFromUrl(url: string): Promise<RecipeResponseDto> {
        try {
            const recipeData = await this.recipeParser.extractRecipeFromUrl(url)
            const recipeDto = new RecipeResponseDto(
                crypto.randomUUID(),
                recipeData.title,
                recipeData.description,
                recipeData.imageUrl,
                recipeData.difficulty,
                recipeData.preparationTimeMinutes,
                recipeData.cookingTimeMinutes,
                recipeData.servings,
                recipeData.ingredients,
                recipeData.instructions
            )
            return await recipeRepository.createRecipe(recipeDto)
        } catch (error) {
            console.error('Error creating recipe from URL:', error)
            throw new Error('Failed to create recipe from URL')
        }
    }

    async createRecipeFromImage(imageBuffer: Buffer): Promise<RecipeResponseDto> {
        try {
            const recipeData = await this.recipeParser.extractRecipeFromImage(imageBuffer)
            const recipeDto = new RecipeResponseDto(
                crypto.randomUUID(),
                recipeData.title,
                recipeData.description,
                recipeData.imageUrl,
                recipeData.difficulty,
                recipeData.preparationTimeMinutes,
                recipeData.cookingTimeMinutes,
                recipeData.servings,
                recipeData.ingredients,
                recipeData.instructions
            )
            return await recipeRepository.createRecipe(recipeDto)
        } catch (error) {
            console.error('Error creating recipe from image:', error)
            throw new Error('Failed to create recipe from image')
        }
    }

    async getRecipeById(id: string): Promise<RecipeResponseDto> {
        return await recipeRepository.getRecipeById(id)
    }

    async getRecipeListing(): Promise<RecipeListingDto[]> {
        return await recipeRepository.getRecipeListing()
    }

    async updateRecipe(id: string, recipe: Partial<RecipeResponseDto>): Promise<RecipeResponseDto> {
        return await recipeRepository.updateById(id, recipe)
    }

    async deleteRecipe(id: string): Promise<void> {
        await recipeRepository.deleteById(id)
    }
}

// Create a singleton instance with the OpenAI service as the parser
// import openAIService from './openai.service'
import openAIService from './openaiMock.service'
export default new RecipeService(openAIService)
