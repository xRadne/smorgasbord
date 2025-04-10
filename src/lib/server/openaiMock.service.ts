import { OpenaiRecipe, OpenaiRecipeResponseDto } from "./dto/openai.dto"
import type { IRecipeParser } from "./interfaces/recipeParser.interface"

const mockResponse: OpenaiRecipeResponseDto = {
  recipe: {
    language: 'swedish',
    title: 'Salsiccia med champinjoner och pasta',
    description: 'En läcker rätt med salsiccia, champinjoner och pasta.',
    difficulty: 'Medium',
    preparationTimeMinutes: 15,
    cookingTimeMinutes: 25,
    servings: 2,
    ingredients: [
      '150 g champinjoner',
      '½ gul lök',
      '½ vitlöksklyfta',
      '½ msks smör',
      '2 färska salsicciakorvar (150 g)',
      '150 g körsbärstomater',
      '½ tsk torkad timjan',
      '1 dl vitt vin',
      'salt och peppar',
      '120 g pasta (okokt vikt)',
      '35 g rucola'
    ],
    instructions: [
      'Putsa och klyfta champinjonerna, skala och hacka lök och vitlök. Fräs det långsamt i smör.',
      'Ta bort skinnet från korvarna. Stek korvfärsen med svamp och lök. Finfördela färsen med en trägaffel eller liknande under tiden.',
      'Tillsätt tomater (ev halverade), timjan och vin. Låt puttra under lock ca 5 min. Späd ev med vatten och smaka av med salt och peppar.',
      'Servering: Koka pastan enl anvisning. Blanda med korvröran och rucola.'
    ]
  }
}

class OpenAIService implements IRecipeParser {
  async extractRecipeFromUrl(url: string): Promise<OpenaiRecipe> {
    return mockResponse.recipe
  }

  async extractRecipeFromImage(imageBuffer: Buffer): Promise<OpenaiRecipe> {
    return mockResponse.recipe
  }
}

export default new OpenAIService()
