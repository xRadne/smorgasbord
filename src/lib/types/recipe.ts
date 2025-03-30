import { IsString, IsNumber, IsArray, IsUrl, Min, IsNotEmpty } from 'class-validator'

export class RecipeListing {
  @IsNumber()
  id: number

  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsUrl()
  image: string

  @IsString()
  @IsNotEmpty()
  category: string

  @IsString()
  @IsNotEmpty()
  difficulty: string

  @IsNumber()
  @Min(0)
  preparationTimeMinutes: number

  @IsNumber()
  @Min(0)
  cookingTimeMinutes: number

  @IsNumber()
  @Min(1)
  servings: number
}

export class Recipe extends RecipeListing {
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  ingredients: string[]

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  instructions: string[]
}

export type OpenAIRecipeResponseDto = Omit<Recipe, 'id'>
