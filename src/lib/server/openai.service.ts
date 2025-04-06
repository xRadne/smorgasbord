import { OPENAI_API_KEY } from "$env/static/private"
import type { OpenaiRecipeResponseDto } from "$lib"
import OpenAI from "openai"

if (!OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY environment variable is not set')
}

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY
})

const exampleResponseObject: OpenaiRecipeResponseDto = {
  title: 'Example Recipe',
  description: 'A delicious example recipe',
  ingredients: ['2 cups flour', '1 cup sugar', '2 eggs'],
  instructions: ['Mix ingredients', 'Bake at 350F'],
  imageUrl: 'https://example.com/recipe-image.jpg',
  difficulty: 'Easy',
  preparationTimeMinutes: 15,
  cookingTimeMinutes: 30,
  servings: 4
}

const exampleResponseObjectString = JSON.stringify(exampleResponseObject)

class OpenAIService {
  async extractRecipeFromUrl(url: string): Promise<OpenaiRecipeResponseDto> {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a helpful assistant that analyzes recipe URLs and extracts recipe information. Respond with a JSON object containing the recipe details in a structured format. Use this exact structure: ${exampleResponseObjectString}`
        },
        {
          role: 'user',
          content: `Please analyze this recipe URL and extract the recipe information: ${url}`
        }
      ],
      response_format: { type: 'json_object' }
    })

    const recipeData = JSON.parse(completion.choices[0].message.content ?? '')
    console.log('Extracted recipe data:', recipeData)

    return recipeData
  }
}

const openaiService = new OpenAIService()
export default openaiService
