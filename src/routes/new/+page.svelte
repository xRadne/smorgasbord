<script lang="ts">
  let url = ''
  let submitted = false
  let error = ''
  let loading = false
  let imageFile: File | null = null
  let imagePreview: string | null = null
  let useCamera = false
  let stream: MediaStream | null = null
  let videoElement: HTMLVideoElement

  async function startCamera() {
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoElement) {
        videoElement.srcObject = stream
      }
      useCamera = true
    } catch (e) {
      error = 'Failed to access camera. Please check permissions.'
    }
  }

  function stopCamera() {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      stream = null
    }
    useCamera = false
  }

  function captureImage() {
    if (!videoElement) return

    const canvas = document.createElement('canvas')
    canvas.width = videoElement.videoWidth
    canvas.height = videoElement.videoHeight
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.drawImage(videoElement, 0, 0)
    canvas.toBlob((blob) => {
      if (blob) {
        imageFile = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' })
        imagePreview = URL.createObjectURL(blob)
        stopCamera()
      }
    }, 'image/jpeg')
  }

  function handleImageUpload(event: Event) {
    const input = event.target as HTMLInputElement
    if (input.files && input.files[0]) {
      imageFile = input.files[0]
      imagePreview = URL.createObjectURL(imageFile)
    }
  }

  async function handleSubmit() {
    try {
      loading = true
      const formData = new FormData()
      
      if (imageFile) {
        formData.append('image', imageFile)
      } else if (url) {
        formData.append('url', url)
      } else {
        throw new Error('Please provide either a URL or an image')
      }

      const response = await fetch('/api/recipes/import', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Failed to submit recipe')
      }

      const { data } = await response.json()
      submitted = true
      url = ''
      imageFile = null
      imagePreview = null
      error = ''
      
      // Redirect to the newly created recipe
      window.location.href = `/recipe/${data.id}`
    } catch (e) {
      error = e instanceof Error ? e.message : 'Failed to submit recipe. Please try again.'
    } finally {
      loading = false
    }
  }

  // Cleanup on component destroy
  import { onDestroy } from 'svelte'
  onDestroy(() => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview)
    }
    stopCamera()
  })
</script>

<div class="container">
  <h1>Import Recipe</h1>

  <form on:submit|preventDefault={handleSubmit} class="import-form">
    <div class="form-group">
      <label for="url">Recipe URL</label>
      <input
        type="url"
        id="url"
        bind:value={url}
        placeholder="https://example.com/recipe"
      />
    </div>

    <div class="form-group">
      <label>Or upload an image</label>
      <div class="image-upload-container">
        <input
          type="file"
          id="image"
          accept="image/*"
          on:change={handleImageUpload}
          class="hidden"
        />
        <label for="image" class="upload-button">
          Choose Image
        </label>
        <button type="button" class="camera-button" on:click={startCamera}>
          Use Camera
        </button>
      </div>
    </div>

    {#if useCamera}
      <div class="camera-container">
        <video bind:this={videoElement} autoplay playsinline></video>
        <button type="button" class="capture-button" on:click={captureImage}>
          Capture Image
        </button>
      </div>
    {/if}

    {#if imagePreview}
      <div class="image-preview">
        <img src={imagePreview} alt="Preview" />
        <button type="button" class="remove-button" on:click={() => {
          imageFile = null
          imagePreview = null
        }}>
          Remove Image
        </button>
      </div>
    {/if}

    {#if error}
      <p class="error">{error}</p>
    {/if}

    {#if submitted}
      <p class="success">Recipe submitted successfully!</p>
    {/if}

    <button type="submit" disabled={loading || (!url && !imageFile)} class="submit-button">
      {#if loading}
        <span class="spinner"></span>
      {/if}
      {loading ? 'Importing...' : 'Import Recipe'}
    </button>
  </form>
</div>

<style>
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
  }

  h1 {
    color: #2c3e50;
    margin-bottom: 2rem;
    text-align: center;
  }

  .import-form {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #2c3e50;
    font-weight: 500;
  }

  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }

  input:focus {
    outline: none;
    border-color: #4caf50;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
  }

  .hidden {
    display: none;
  }

  .image-upload-container {
    display: flex;
    gap: 1rem;
  }

  .upload-button,
  .camera-button {
    flex: 1;
    padding: 0.75rem;
    border: 1px solid #4caf50;
    border-radius: 4px;
    background: white;
    color: #4caf50;
    cursor: pointer;
    text-align: center;
    transition: all 0.2s;
  }

  .upload-button:hover,
  .camera-button:hover {
    background: #4caf50;
    color: white;
  }

  .camera-container {
    margin: 1rem 0;
  }

  .camera-container video {
    width: 100%;
    border-radius: 4px;
    margin-bottom: 1rem;
  }

  .capture-button {
    width: 100%;
    padding: 0.75rem;
    background: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .image-preview {
    margin: 1rem 0;
    text-align: center;
  }

  .image-preview img {
    max-width: 100%;
    max-height: 300px;
    border-radius: 4px;
    margin-bottom: 1rem;
  }

  .remove-button {
    padding: 0.5rem 1rem;
    background: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button {
    background-color: #4caf50;
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  button:hover {
    background-color: #45a049;
  }

  .error {
    color: #dc3545;
    margin-bottom: 1rem;
  }

  .success {
    color: #28a745;
    margin-bottom: 1rem;
  }

  .submit-button {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .spinner {
    width: 1rem;
    height: 1rem;
    border: 2px solid transparent;
    border-top-color: white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
</style>
