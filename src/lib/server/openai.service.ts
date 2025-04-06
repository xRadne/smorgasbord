import { OPENAI_API_KEY } from "$env/static/private"
import { OpenaiRecipe, OpenaiRecipeResponseDto } from "./dto/openai.dto"
import OpenAI from "openai"
import type { IRecipeParser } from "./interfaces/recipeParser.interface"

if (!OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY environment variable is not set')
}

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY
})

const exampleRecipe = new OpenaiRecipe(
  'english',
  'Example Recipe',
  'A delicious example recipe',
  'https://example.com/recipe-image.jpg',
  'Easy',
  15,
  30,
  4,
  ['2 cups flour', '1 cup sugar', '2 eggs'],
  ['Mix ingredients', 'Bake at 350F']
)

const exampleResponseObject = new OpenaiRecipeResponseDto(exampleRecipe)

const exampleResponseObjectPrompt = `Use this exact structure: ${JSON.stringify(exampleResponseObject)}`
const recipeAssistantPrompt = `You are a helpful assistant that analyzes recipe images and extracts recipe information.`
const mustBeJsonPrompt = `Respond with a JSON object containing the recipe details in a structured format. Do not include any other text or comments in your response. The response should be a valid JSON object. Do not use any "\`\`\`json" or "\`\`\`" in your response.`
const answerInSameLanguageAsImagePrompt = `Answer in the same language as the image. When responding writing language field use the english name of the language, for example 'swedish', 'french', etc.`

class OpenAIService implements IRecipeParser {
  async extractRecipeFromUrl(url: string): Promise<OpenaiRecipe> {
    throw new Error('Not implemented')

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `${recipeAssistantPrompt}. ${mustBeJsonPrompt}. ${exampleResponseObjectPrompt}. ${answerInSameLanguageAsImagePrompt}`
        },
        {
          role: 'user',
          content: `Please analyze this recipe URL and extract the recipe information: ${url}`
        }
      ],
      response_format: { type: 'json_object' }
    })

    const responseData = JSON.parse(completion.choices[0].message.content ?? '') as OpenaiRecipeResponseDto
    return responseData.recipe
  }

  async extractRecipeFromImage(imageBuffer: Buffer): Promise<OpenaiRecipe> {
    const base64Image = imageBuffer.toString('base64')

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `${recipeAssistantPrompt}. ${mustBeJsonPrompt}. ${exampleResponseObjectPrompt}. ${answerInSameLanguageAsImagePrompt}`
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Please analyze this recipe image and extract the recipe information. Include all visible ingredients, instructions, and any other relevant details.'
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`
              }
            }
          ]
        }
      ],
      max_tokens: 1000
    })

    const responseData = JSON.parse(completion.choices[0].message.content ?? '') as OpenaiRecipeResponseDto

    if (!responseData.recipe) {
      throw new Error('No recipe found in the response')
    }

    return responseData.recipe
  }
}

export default new OpenAIService()
