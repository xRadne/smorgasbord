import type { RecipeEntity, RecipeListing } from '../types/recipe'
import { supabase } from './supabase'

class RecipeRepository {
  async getRecipeById(id: string): Promise<RecipeEntity> {
    const { data, error } = await supabase.from('recipes').select('*').eq('id', id)

    if (error || !data || data.length === 0) {
      throw new Error('Error fetching recipe:' + error?.message)
    }

    return data[0]
  }

  async getRecipeListing(): Promise<RecipeListing[]> {
    const { data, error } = await supabase
      .from('recipes')
      .select(
        'id, title, description, image_url, difficulty, preparation_time_minutes, cooking_time_minutes, servings'
      )

    if (error) {
      throw new Error('Error fetching recipes:' + error.message)
    }

    return data.map((recipe) => ({
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      imageUrl: recipe.image_url,
      difficulty: recipe.difficulty,
      preparationTimeMinutes: recipe.preparation_time_minutes,
      cookingTimeMinutes: recipe.cooking_time_minutes,
      servings: recipe.servings
    }))
  }

  async add(recipe: RecipeEntity): Promise<void> {
    const { data, error } = await supabase.from('recipes').insert(recipe)

    if (error) {
      throw new Error('Error adding recipe:' + error.message)
    }
  }

  async updateById(id: string, recipe: RecipeEntity): Promise<void> {
    const { data, error } = await supabase.from('recipes').update(recipe).eq('id', id)

    if (error) {
      throw new Error('Error updating recipe:' + error.message)
    }
  }

  async deleteById(id: string): Promise<void> {
    const { error } = await supabase.from('recipes').delete().eq('id', id)

    if (error) {
      throw new Error('Error deleting recipe:' + error.message)
    }
  }
}

const recipeRepository = new RecipeRepository()
export default recipeRepository
