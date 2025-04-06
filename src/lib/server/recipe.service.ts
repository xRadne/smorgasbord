import { RecipeResponseDto, type RecipeListingDto } from '$lib/types/recipe.dto'
import type { IRecipeParser } from './interfaces/recipeParser.interface'
import recipeRepository from './recipe.repository'

export class RecipeService {
    constructor(private readonly recipeParser: IRecipeParser) {}

    async createRecipeFromUrl(url: string): Promise<RecipeResponseDto> {
        throw new Error('Not implemented')
        try {
            const recipeData = await this.recipeParser.extractRecipeFromUrl(url)
            const recipe = Object.assign(recipeData, { imageUrl: '' })

            return await recipeRepository.createRecipe(recipe)
        } catch (error) {
            console.error('Error creating recipe from URL:', error)
            throw new Error('Failed to create recipe from URL')
        }
    }

    async createRecipeFromImageFile(image: File): Promise<RecipeResponseDto> {
        try {
            const imageBuffer = Buffer.from(await image.arrayBuffer())
            const imageUrl = await uploadsRepository.uploadImage(image)
            const recipeData = await this.recipeParser.extractRecipeFromImage(imageBuffer)
            const recipe = Object.assign(recipeData, { imageUrl })

            const recipeEntity = await recipeRepository.createRecipe(recipe)
            return new RecipeResponseDto(
                recipeEntity.id,
                recipeEntity.title,
                recipeEntity.description,
                imageUrl,
                recipeEntity.difficulty,
                recipeEntity.preparationTimeMinutes,
                recipeEntity.cookingTimeMinutes,
                recipeEntity.servings,
                recipeEntity.ingredients,
                recipeEntity.instructions
            )
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
import uploadsRepository from './uploads.repository'
export default new RecipeService(openAIService)
