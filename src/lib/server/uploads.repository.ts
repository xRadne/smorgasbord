import { supabase } from './supabase'

class UploadsRepository {
  private readonly BUCKET_NAME = 'uploaded-images'

  /**
   * Uploads an image buffer to Supabase storage
   * @param buffer The image data as a Buffer
   * @param originalFilename The original filename (used to determine file extension)
   * @param fileName Optional custom filename. If not provided, a UUID will be generated
   * @returns The public URL of the uploaded image
   */
  async uploadImage(buffer: Buffer, originalFilename: string, fileName?: string): Promise<string> {
    try {
      const fileExt = originalFilename.split('.').pop()
      const filePath = fileName 
        ? `${fileName}.${fileExt}`
        : `${crypto.randomUUID()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from(this.BUCKET_NAME)
        .upload(filePath, buffer, {
          contentType: `image/${fileExt}`,
          upsert: false
        })

      if (uploadError) {
        throw new Error(`Error uploading image: ${uploadError.message}`)
      }

      const { data: { publicUrl } } = supabase.storage
        .from(this.BUCKET_NAME)
        .getPublicUrl(filePath)

      return publicUrl
    } catch (error) {
      console.error('Error in uploadImage:', error)
      throw error
    }
  }

  /**
   * Downloads an image from Supabase storage
   * @param filePath The path of the file to download
   * @returns The file data as a Blob
   */
  async downloadImage(filePath: string): Promise<Blob> {
    try {
      const { data, error } = await supabase.storage
        .from(this.BUCKET_NAME)
        .download(filePath)

      if (error) {
        throw new Error(`Error downloading image: ${error.message}`)
      }

      return data
    } catch (error) {
      console.error('Error in downloadImage:', error)
      throw error
    }
  }

  /**
   * Deletes an image from Supabase storage
   * @param filePath The path of the file to delete
   */
  async deleteImage(filePath: string): Promise<void> {
    try {
      const { error } = await supabase.storage
        .from(this.BUCKET_NAME)
        .remove([filePath])

      if (error) {
        throw new Error(`Error deleting image: ${error.message}`)
      }
    } catch (error) {
      console.error('Error in deleteImage:', error)
      throw error
    }
  }
}

export default new UploadsRepository() 