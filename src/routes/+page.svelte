<script lang="ts">
    import type { RecipeListing } from '$lib/types/recipe';
    import recipeRepository from '$lib/repository/recipe.repository';

    const recipes: RecipeListing[] = recipeRepository.getRecipeListing();
</script>

<div class="container">
    <h1>Our Recipes</h1>
    
    <div class="recipe-grid">
        {#each recipes as recipe}
            <a href="/recipe/{recipe.id}" class="recipe-card">
                <img src={recipe.image} alt={recipe.title} class="recipe-image" />
                <div class="recipe-content">
                    <h2>{recipe.title}</h2>
                    <p class="description">{recipe.description}</p>
                    <div class="meta-info">
                        <span class="category">{recipe.category}</span>
                        <span class="difficulty">{recipe.difficulty}</span>
                        <span class="time">{recipe.preparationTime + recipe.cookingTime} min</span>
                        <span class="servings">{recipe.servings} servings</span>
                    </div>
                </div>
            </a>
        {/each}
    </div>
</div>

<style>
    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
    }

    h1 {
        color: #2c3e50;
        margin-bottom: 2rem;
        text-align: center;
    }

    .recipe-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 2rem;
    }

    .recipe-card {
        background: white;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        text-decoration: none;
        color: inherit;
        transition: transform 0.2s, box-shadow 0.2s;
    }

    .recipe-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }

    .recipe-image {
        width: 100%;
        height: 200px;
        object-fit: cover;
    }

    .recipe-content {
        padding: 1.5rem;
    }

    h2 {
        margin: 0 0 0.5rem 0;
        color: #2c3e50;
        font-size: 1.25rem;
    }

    .description {
        color: #666;
        margin-bottom: 1rem;
        line-height: 1.5;
    }

    .meta-info {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    .meta-info span {
        background-color: #f8f9fa;
        padding: 0.25rem 0.75rem;
        border-radius: 15px;
        font-size: 0.875rem;
        color: #495057;
    }

    @media (max-width: 768px) {
        .container {
            padding: 1rem;
        }

        .recipe-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
