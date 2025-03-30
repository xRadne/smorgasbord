<script lang="ts">
  import '../app.css'
  import Topbar from '$lib/components/Topbar.svelte'

  let { children } = $props()
</script>

<Topbar />
<main>
  {@render children()}
</main>

<style>
  main {
    min-height: calc(100vh - 64px);
    background-color: #f8f9fa;
  }
</style>
