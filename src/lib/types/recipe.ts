export type Recipe = RecipeListing & {
  ingredients: string[]
  instructions: string[]
}

export type RecipeListing = {
  id: number
  title: string
  description: string
  image: string
  category: string
  difficulty: string
  preparationTimeMinutes: number
  cookingTimeMinutes: number
  servings: number
}
