import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import uploadsRepository from '$lib/server/uploads.repository'

export const POST: RequestHandler = async ({ request }) => {
  return handleImageUpload(request)
}

export const PUT: RequestHandler = async ({ request }) => {
  return handleImageUpload(request)
}

async function handleImageUpload(request: Request) {
  try {
    const formData = await request.formData()
    const image = formData.get('image') as File

    if (!image) {
      return json(
        {
          success: false,
          error: 'No image provided'
        },
        { status: 400 }
      )
    }

    const imageUrl = await uploadsRepository.uploadImage(image)

    return json({
      success: true,
      imageUrl
    })
  } catch (error) {
    console.error('Error uploading image:', error)
    return json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to upload image'
      },
      { status: 500 }
    )
  }
} 