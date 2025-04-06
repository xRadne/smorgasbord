<script lang="ts">
  let url = ''
  let submitted = false
  let error = ''
  let loading = false

  async function handleSubmit() {
    try {
      loading = true
      const response = await fetch('/api/recipes/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
      })

      if (!response.ok) {
        throw new Error('Failed to submit URL')
      }

      const { data } = await response.json()
      submitted = true
      url = ''
      error = ''
      
      // Redirect to the newly created recipe
      window.location.href = `/recipe/${data.id}`
    } catch (e) {
      error = 'Failed to submit URL. Please try again.'
    } finally {
      loading = false
    }
  }
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
        required
      />
    </div>

    {#if error}
      <p class="error">{error}</p>
    {/if}

    {#if submitted}
      <p class="success">URL submitted successfully!</p>
    {/if}

    <button type="submit" disabled={loading} class="submit-button">
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
