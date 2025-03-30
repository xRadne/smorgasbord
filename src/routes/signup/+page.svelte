<script lang="ts">
  import { goto } from '$app/navigation'

  let email = ''
  let password = ''
  let confirmPassword = ''
  let firstName = ''
  let lastName = ''
  let loading = false
  let error: string | null = null

  function validateName(name: string): string | null {
    if (name.length < 2) return 'Name must be at least 2 characters long'
    if (name.length > 50) return 'Name must be less than 50 characters'
    if (!/^[a-zA-Z\s-']+$/.test(name))
      return 'Name can only contain letters, spaces, hyphens, and apostrophes'
    return null
  }

  async function handleSignup() {
    try {
      loading = true
      error = null

      // Validate names
      const firstNameError = validateName(firstName)
      if (firstNameError) throw new Error(`First name: ${firstNameError}`)

      const lastNameError = validateName(lastName)
      if (lastNameError) throw new Error(`Last name: ${lastNameError}`)

      if (password !== confirmPassword) {
        throw new Error('Passwords do not match')
      }

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, firstName, lastName })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create account')
      }

      // Show success message and redirect to login
      alert('Please check your email to confirm your account')
      goto('/login')
    } catch (e: any) {
      error = e.message
    } finally {
      loading = false
    }
  }
</script>

<div class="container">
  <div class="signup-form">
    <h1>Create Account</h1>
    <p class="subtitle">Join Smörgåsbord to start organizing your recipes</p>

    <form on:submit|preventDefault={handleSignup}>
      <div class="form-group">
        <label for="firstName">First Name</label>
        <input type="text" id="firstName" bind:value={firstName} required placeholder="John" />
      </div>

      <div class="form-group">
        <label for="lastName">Last Name</label>
        <input type="text" id="lastName" bind:value={lastName} required placeholder="Doe" />
      </div>

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

      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          bind:value={confirmPassword}
          required
          placeholder="••••••••"
        />
      </div>

      {#if error}
        <p class="error">{error}</p>
      {/if}

      <button type="submit" disabled={loading}>
        {loading ? 'Creating account...' : 'Create account'}
      </button>
    </form>

    <p class="login-link">
      Already have an account? <a href="/login">Sign in</a>
    </p>
  </div>
</div>

<style>
  .container {
    max-width: 400px;
    margin: 2rem auto;
    padding: 0 1rem;
  }

  .signup-form {
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

  .login-link {
    text-align: center;
    margin-top: 1.5rem;
    color: #666;
  }

  .login-link a {
    color: #4caf50;
    text-decoration: none;
    font-weight: 500;
  }

  .login-link a:hover {
    text-decoration: underline;
  }
</style>
