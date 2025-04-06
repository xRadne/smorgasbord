export class RecipeEntity {
  id: string
  title: string
  description: string
  imageUrl: string
  difficulty: string
  preparationTimeMinutes: number
  cookingTimeMinutes: number
  servings: number
  ingredients: string[]
  instructions: string[]

  constructor(id: string, title: string, description: string, imageUrl: string, difficulty: string, preparationTimeMinutes: number, cookingTimeMinutes: number, servings: number, ingredients: string[], instructions: string[]) {
    this.id = id
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

