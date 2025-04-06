import { IsString, IsNumber, IsArray, IsUrl, Min, IsNotEmpty } from 'class-validator'

export class RecipeResponseDto {
  @IsString()
  id: string

  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsUrl()
  imageUrl: string

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

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  ingredients: string[]

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  instructions: string[]

  constructor(
    id: string,
    title: string,
    description: string,
    imageUrl: string,
    difficulty: string,
    preparationTimeMinutes: number,
    cookingTimeMinutes: number,
    servings: number,
    ingredients: string[],
    instructions: string[]
  ) {
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

export type RecipeListingDto = Omit<RecipeResponseDto, 'ingredients' | 'instructions'>