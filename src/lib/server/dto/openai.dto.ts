export class OpenaiRecipe {
  language: string
  title: string
  description: string
  difficulty: string
  preparationTimeMinutes: number
  cookingTimeMinutes: number
  servings: number
  ingredients: string[]
  instructions: string[]

  constructor(language: string, title: string, description: string, difficulty: string, preparationTimeMinutes: number, cookingTimeMinutes: number, servings: number, ingredients: string[], instructions: string[]) {
    this.language = language
    this.title = title
    this.description = description
    this.difficulty = difficulty
    this.preparationTimeMinutes = preparationTimeMinutes
    this.cookingTimeMinutes = cookingTimeMinutes
    this.servings = servings
    this.ingredients = ingredients
    this.instructions = instructions
  }
}

export class OpenaiRecipeResponseDto {
  recipe: OpenaiRecipe
  error?: string

  constructor(recipe: OpenaiRecipe, error?: string) {
    this.recipe = recipe
    this.error = error
  }
}