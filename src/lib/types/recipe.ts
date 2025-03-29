export type Recipe = {
  id: number
  title: string
  description: string
  ingredients: string[]
  instructions: string[]
  image: string
  category: string
  difficulty: string
  preparationTime: number
  cookingTime: number
  servings: number
}

export type RecipeListing = {
  id: number
  title: string
  description: string
  image: string
  category: string
  difficulty: string
  preparationTime: number
  cookingTime: number
  servings: number
}
