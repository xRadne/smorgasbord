import type { OpenaiRecipe } from '../dto/openai.dto'

export interface IRecipeParser {
  /**
   * Extracts recipe information from a URL
   * @param url The URL to extract recipe from
   * @returns A promise that resolves to the extracted recipe
   */
  extractRecipeFromUrl(url: string): Promise<OpenaiRecipe>

  /**
   * Extracts recipe information from an image
   * @param imageBuffer The image data as a Buffer
   * @returns A promise that resolves to the extracted recipe
   */
  extractRecipeFromImage(imageBuffer: Buffer): Promise<OpenaiRecipe>
} 