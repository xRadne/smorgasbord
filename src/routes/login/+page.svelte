<script lang="ts">
  import { goto } from '$app/navigation'

  let email = ''
  let password = ''
  let loading = false
  let error: string | null = null

  async function handleLogin() {
    try {
      loading = true
      error = null

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to sign in')
      }

      goto('/')
    } catch (e: any) {
      error = e.message
    } finally {
      loading = false
    }
  }
</script>

<div class="container">
  <div class="login-form">
    <h1>Welcome to Smörgåsbord</h1>
    <p class="subtitle">Sign in to manage your recipes</p>

    <form on:submit|preventDefault={handleLogin}>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" bind:value={email} required placeholder="your@email.com" />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          bind:value={password}
          required
          placeholder="••••••••"
        />
      </div>

      {#if error}
        <p class="error">{error}</p>
      {/if}

      <button type="submit" disabled={loading}>
        {loading ? 'Signing in...' : 'Sign in'}
      </button>
    </form>

    <p class="signup-link">
      Don't have an account? <a href="/signup">Create one</a>
    </p>
  </div>
</div>

<style>
  .container {
    max-width: 400px;
    margin: 2rem auto;
    padding: 0 1rem;
  }

  .login-form {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  h1 {
    color: #2c3e50;
    margin: 0 0 0.5rem 0;
    text-align: center;
  }

  .subtitle {
    color: #666;
    text-align: center;
    margin-bottom: 2rem;
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
    width: 100%;
    background-color: #4caf50;
    color: white;
    padding: 0.75rem;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  button:hover:not(:disabled) {
    background-color: #45a049;
  }

  button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }

  .error {
    color: #dc3545;
    margin-bottom: 1rem;
    text-align: center;
    font-size: 0.9rem;
    padding: 0.5rem;
    background-color: #f8d7da;
    border-radius: 4px;
    border: 1px solid #f5c6cb;
  }

  .signup-link {
    text-align: center;
    margin-top: 1.5rem;
    color: #666;
  }

  .signup-link a {
    color: #4caf50;
    text-decoration: none;
    font-weight: 500;
  }

  .signup-link a:hover {
    text-decoration: underline;
  }
</style>
