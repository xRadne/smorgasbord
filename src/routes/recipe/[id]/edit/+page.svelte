<script lang="ts">
  import { goto } from '$app/navigation'
  import type { RecipeResponseDto } from '$lib/types/recipe.dto'

  export let data: { recipe: RecipeResponseDto }
  const { recipe } = data

  let title = recipe.title
  let description = recipe.description
  let imageUrl = recipe.imageUrl
  let difficulty = recipe.difficulty
  let preparationTimeMinutes = recipe.preparationTimeMinutes
  let cookingTimeMinutes = recipe.cookingTimeMinutes
  let servings = recipe.servings
  let ingredients = [...recipe.ingredients]
  let instructions = [...recipe.instructions]
  
  let loading = false
  let error = ''
  let success = false
  let imageFile: File | null = null
  let imagePreview: string | null = null

  function handleImageUpload(event: Event) {
    const input = event.target as HTMLInputElement
    if (input.files && input.files[0]) {
      imageFile = input.files[0]
      imagePreview = URL.createObjectURL(imageFile)
    }
  }

  function removeImage() {
    imageFile = null
    imagePreview = null
    imageUrl = recipe.imageUrl // Reset to original image URL
  }

  function addIngredient() {
    ingredients = [...ingredients, '']
  }

  function removeIngredient(index: number) {
    ingredients = ingredients.filter((_, i) => i !== index)
  }

  function addInstruction() {
    instructions = [...instructions, '']
  }

  function removeInstruction(index: number) {
    instructions = instructions.filter((_, i) => i !== index)
  }

  async function handleSave() {
    try {
      loading = true
      error = ''
      success = false

      let finalImageUrl = imageUrl
      if (imageFile) {
        const formData = new FormData()
        formData.append('image', imageFile)
        
        const uploadResponse = await fetch('/api/recipes/upload', {
          method: 'POST',
          body: formData
        })

        if (!uploadResponse.ok) {
          throw new Error('Failed to upload image')
        }

        const { imageUrl: uploadedImageUrl } = await uploadResponse.json()
        finalImageUrl = uploadedImageUrl
      }

      const response = await fetch(`/api/recipes/${recipe.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl: finalImageUrl,
          difficulty,
          preparationTimeMinutes,
          cookingTimeMinutes,
          servings,
          ingredients,
          instructions
        })
      })

      if (!response.ok) {
        throw new Error('Failed to update recipe')
      }

      success = true
      setTimeout(() => {
        goto(`/recipe/${recipe.id}`)
      }, 1500)
    } catch (e) {
      error = e instanceof Error ? e.message : 'Failed to update recipe'
    } finally {
      loading = false
    }
  }

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this recipe? This action cannot be undone.')) {
      return
    }

    try {
      loading = true
      error = ''
      success = false

      const response = await fetch(`/api/recipes/${recipe.id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete recipe')
      }

      goto('/')
    } catch (e) {
      error = e instanceof Error ? e.message : 'Failed to delete recipe'
      loading = false
    }
  }

  // Cleanup on component destroy
  import { onDestroy } from 'svelte'
  onDestroy(() => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview)
    }
  })
</script>

<div class="container">
  <div class="header">
    <h1>Edit Recipe</h1>
    <div class="actions">
      <button type="button" class="delete-button" on:click={handleDelete} disabled={loading}>
        Delete Recipe
      </button>
    </div>
  </div>

  <form on:submit|preventDefault={handleSave} class="edit-form">
    <div class="form-group">
      <label for="title">Title</label>
      <input type="text" id="title" bind:value={title} required />
    </div>

    <div class="form-group">
      <label for="description">Description</label>
      <textarea id="description" bind:value={description} required rows="3"></textarea>
    </div>

    <div class="form-group">
      <label>Recipe Image</label>
      <div class="image-upload-container">
        <div class="image-preview">
          <img src={imagePreview || imageUrl} alt="Recipe preview" />
          <div class="image-actions">
            <label for="image" class="upload-button">
              Choose New Image
            </label>
            {#if imagePreview || imageUrl !== recipe.imageUrl}
              <button type="button" class="remove-button" on:click={removeImage}>
                Remove Image
              </button>
            {/if}
          </div>
        </div>
        <input
          type="file"
          id="image"
          accept="image/*"
          on:change={handleImageUpload}
          class="hidden"
        />
      </div>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="difficulty">Difficulty</label>
        <select id="difficulty" bind:value={difficulty} required>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      <div class="form-group">
        <label for="preparationTimeMinutes">Preparation Time (minutes)</label>
        <input type="number" id="preparationTimeMinutes" bind:value={preparationTimeMinutes} required min="0" />
      </div>

      <div class="form-group">
        <label for="cookingTimeMinutes">Cooking Time (minutes)</label>
        <input type="number" id="cookingTimeMinutes" bind:value={cookingTimeMinutes} required min="0" />
      </div>

      <div class="form-group">
        <label for="servings">Servings</label>
        <input type="number" id="servings" bind:value={servings} required min="1" />
      </div>
    </div>

    <div class="form-group">
      <label>Ingredients</label>
      <div class="list-container">
        {#each ingredients as ingredient, index}
          <div class="list-item">
            <input type="text" bind:value={ingredients[index]} required />
            <button type="button" class="remove-button" on:click={() => removeIngredient(index)}>
              Remove
            </button>
          </div>
        {/each}
        <button type="button" class="add-button" on:click={addIngredient}>
          Add Ingredient
        </button>
      </div>
    </div>

    <div class="form-group">
      <label>Instructions</label>
      <div class="list-container">
        {#each instructions as instruction, index}
          <div class="list-item">
            <textarea bind:value={instructions[index]} required rows="2"></textarea>
            <button type="button" class="remove-button" on:click={() => removeInstruction(index)}>
              Remove
            </button>
          </div>
        {/each}
        <button type="button" class="add-button" on:click={addInstruction}>
          Add Instruction
        </button>
      </div>
    </div>

    {#if error}
      <p class="error">{error}</p>
    {/if}

    {#if success}
      <p class="success">Recipe updated successfully! Redirecting...</p>
    {/if}

    <div class="form-actions">
      <button type="submit" disabled={loading} class="save-button">
        {#if loading}
          <span class="spinner"></span>
        {/if}
        {loading ? 'Saving...' : 'Save Changes'}
      </button>
      <a href="/recipe/{recipe.id}" class="cancel-button">Cancel</a>
    </div>
  </form>
</div>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  h1 {
    color: #2c3e50;
    margin: 0;
  }

  .edit-form {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #2c3e50;
    font-weight: 500;
  }

  input[type="text"],
  input[type="number"],
  input[type="url"],
  textarea,
  select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }

  input:focus,
  textarea:focus,
  select:focus {
    outline: none;
    border-color: #4caf50;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
  }

  .list-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .list-item {
    display: flex;
    gap: 0.5rem;
  }

  .list-item input,
  .list-item textarea {
    flex: 1;
  }

  .add-button,
  .remove-button,
  .upload-button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.2s;
  }

  .add-button {
    background: #4caf50;
    color: white;
    margin-top: 0.5rem;
  }

  .add-button:hover {
    background: #45a049;
  }

  .remove-button {
    background: #dc3545;
    color: white;
  }

  .remove-button:hover {
    background: #c82333;
  }

  .upload-button {
    background: #4caf50;
    color: white;
  }

  .upload-button:hover {
    background: #45a049;
  }

  .hidden {
    display: none;
  }

  .image-upload-container {
    margin: 1rem 0;
  }

  .image-preview {
    position: relative;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
  }

  .image-preview img {
    width: 100%;
    height: auto;
    border-radius: 4px;
    display: block;
  }

  .image-actions {
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 0.5rem;
    background: rgba(0, 0, 0, 0.7);
    padding: 0.5rem;
    border-radius: 4px;
  }

  .form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
  }

  .save-button,
  .cancel-button {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    text-decoration: none;
    text-align: center;
    transition: all 0.2s;
  }

  .save-button {
    background: #4caf50;
    color: white;
    flex: 1;
  }

  .save-button:hover:not(:disabled) {
    background: #45a049;
  }

  .save-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .cancel-button {
    background: #6c757d;
    color: white;
  }

  .cancel-button:hover {
    background: #5a6268;
  }

  .delete-button {
    padding: 0.75rem 1.5rem;
    background: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.2s;
  }

  .delete-button:hover:not(:disabled) {
    background: #c82333;
  }

  .delete-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .error {
    color: #dc3545;
    margin: 1rem 0;
  }

  .success {
    color: #28a745;
    margin: 1rem 0;
  }

  .spinner {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border: 2px solid #fff;
    border-radius: 50%;
    border-top-color: transparent;
    animation: spin 1s linear infinite;
    margin-right: 0.5rem;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style> 