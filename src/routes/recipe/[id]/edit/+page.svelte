<script lang="ts">
  import { goto } from '$app/navigation'
  import type { RecipeEntityDto } from '$lib/types/recipe.dto'

  export let data: { recipe: RecipeEntityDto }
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

      const response = await fetch(`/api/recipes/${recipe.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
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
      <label for="imageUrl">Image URL</label>
      <input type="url" id="imageUrl" bind:value={imageUrl} required />
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

  input, textarea, select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }

  input:focus, textarea:focus, select:focus {
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

  .list-item input, .list-item textarea {
    flex: 1;
  }

  .add-button {
    padding: 0.5rem;
    background: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 0.5rem;
  }

  .remove-button {
    padding: 0.5rem 1rem;
    background: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    white-space: nowrap;
  }

  .form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
  }

  .save-button {
    flex: 1;
    background-color: #4caf50;
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .cancel-button {
    padding: 0.75rem 1.5rem;
    background-color: #6c757d;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    text-decoration: none;
    text-align: center;
  }

  .delete-button {
    padding: 0.75rem 1.5rem;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
  }

  .error {
    color: #dc3545;
    margin-bottom: 1rem;
  }

  .success {
    color: #28a745;
    margin-bottom: 1rem;
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