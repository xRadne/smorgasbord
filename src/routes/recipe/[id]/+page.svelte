<script lang="ts">
    import type { Recipe } from '$lib/types/recipe';

    export let data: { recipe: Recipe };
    const recipe = data.recipe;
</script>

<div class="container">
    <div class="recipe-header">
        <img src={recipe.image} alt={recipe.title} class="recipe-image" />
        <div class="recipe-info">
            <h1>{recipe.title}</h1>
            <p class="description">{recipe.description}</p>
            <div class="meta-info">
                <span>Category: {recipe.category}</span>
                <span>Difficulty: {recipe.difficulty}</span>
                <span>Preparation: {recipe.preparationTime} min</span>
                <span>Cooking: {recipe.cookingTime} min</span>
                <span>Servings: {recipe.servings}</span>
            </div>
        </div>
    </div>

    <div class="recipe-content">
        <div class="ingredients">
            <h2>Ingredients</h2>
            <ul>
                {#each recipe.ingredients as ingredient}
                    <li>{ingredient}</li>
                {/each}
            </ul>
        </div>

        <div class="instructions">
            <h2>Instructions</h2>
            <ol>
                {#each recipe.instructions as instruction, index}
                    <li>
                        <span class="step-number">{index + 1}</span>
                        <span class="step-text">{instruction}</span>
                    </li>
                {/each}
            </ol>
        </div>
    </div>
</div>

<style>
    .container {
        max-width: 1000px;
        margin: 0 auto;
        padding: 2rem;
    }

    .recipe-header {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        margin-bottom: 3rem;
    }

    .recipe-image {
        width: 100%;
        height: 400px;
        object-fit: cover;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .recipe-info {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    h1 {
        margin: 0;
        color: #2c3e50;
    }

    .description {
        font-size: 1.1rem;
        color: #666;
        line-height: 1.6;
    }

    .meta-info {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        margin-top: 1rem;
    }

    .meta-info span {
        background-color: #f8f9fa;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.9rem;
        color: #495057;
    }

    .recipe-content {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 3rem;
    }

    .ingredients, .instructions {
        background-color: #fff;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    h2 {
        color: #2c3e50;
        margin-bottom: 1.5rem;
    }

    ul {
        list-style: none;
        padding: 0;
    }

    li {
        padding: 0.5rem 0;
        border-bottom: 1px solid #eee;
    }

    ol {
        padding: 0;
    }

    .instructions li {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
        border-bottom: none;
    }

    .step-number {
        background-color: #4CAF50;
        color: white;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        flex-shrink: 0;
    }

    .step-text {
        line-height: 1.6;
    }

    @media (max-width: 768px) {
        .recipe-header {
            grid-template-columns: 1fr;
        }

        .recipe-content {
            grid-template-columns: 1fr;
        }
    }
</style> 