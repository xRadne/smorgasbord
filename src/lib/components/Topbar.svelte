<script lang="ts">
  import { page } from '$app/stores'
</script>

<nav class="topbar">
  <div class="container">
    <a href="/" class="logo">
      <span class="logo-text">Smörgåsbord</span>
    </a>
  </div>
</nav>

<style>
  .topbar {
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 1rem 0;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .logo {
    text-decoration: none;
    display: flex;
    align-items: center;
  }

  .logo-text {
    font-size: 1.5rem;
    font-weight: 700;
    color: #2c3e50;
    letter-spacing: -0.5px;
  }

  @media (max-width: 768px) {
    .container {
      padding: 0 1rem;
    }
  }
</style>
