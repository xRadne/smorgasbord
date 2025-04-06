export class OpenaiRecipe {
  title: string
  description: string
  imageUrl: string
  difficulty: string
  preparationTimeMinutes: number
  cookingTimeMinutes: number
  servings: number
  ingredients: string[]
  instructions: string[]

  constructor(title: string, description: string, imageUrl: string, difficulty: string, preparationTimeMinutes: number, cookingTimeMinutes: number, servings: number, ingredients: string[], instructions: string[]) {
    this.title = title
    this.description = description
    this.imageUrl = imageUrl
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