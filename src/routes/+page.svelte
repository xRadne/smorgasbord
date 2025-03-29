<script lang="ts">
    import type { Recipe } from '$lib/types/recipe';

    const exampleRecipe: Recipe = {
        id: 1,
        title: 'Klassisk Köttbullar',
        description: 'Härliga, saftiga köttbullar med gräddsås - en svensk klassiker!',
        ingredients: [
            '500g blandfärs',
            '1 gul lök',
            '1 ägg',
            '1 dl mjölk',
            '2 msk ströbröd',
            '1 tsk salt',
            '1/2 tsk svartpeppar',
            '2 msk smör till stekning',
            '2 dl grädde',
            '1 msk vetemjöl',
            '1 köttbuljongtärning'
        ],
        instructions: [
            'Blanda färs, finhackad lök, ägg, mjölk, ströbröd och kryddor i en bunke.',
            'Forma till små bullar med våta händer.',
            'Stek bullarna i smör tills de är gyllenbruna.',
            'Ta upp bullarna och lägg åt sidan.',
            'Gör sås genom att fräsa mjöl i smöret, tillsätt grädde och buljong.',
            'Låt såsen koka upp och tjockna.',
            'Lägg tillbaka bullarna i såsen och låt allt bli varmt.'
        ],
        image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc',
        category: 'Huvudrätt',
        difficulty: 'Medel',
        preparationTime: 20,
        cookingTime: 25,
        servings: 4
    };
</script>

<div class="container">
    <div class="recipe-header">
        <img src={exampleRecipe.image} alt={exampleRecipe.title} class="recipe-image" />
        <div class="recipe-info">
            <h1>{exampleRecipe.title}</h1>
            <p class="description">{exampleRecipe.description}</p>
            <div class="meta-info">
                <span>Kategori: {exampleRecipe.category}</span>
                <span>Svårighetsgrad: {exampleRecipe.difficulty}</span>
                <span>Förberedning: {exampleRecipe.preparationTime} min</span>
                <span>Tillagning: {exampleRecipe.cookingTime} min</span>
                <span>Antal personer: {exampleRecipe.servings}</span>
            </div>
        </div>
    </div>

    <div class="recipe-content">
        <div class="ingredients">
            <h2>Ingredienser</h2>
            <ul>
                {#each exampleRecipe.ingredients as ingredient}
                    <li>{ingredient}</li>
                {/each}
            </ul>
        </div>

        <div class="instructions">
            <h2>Instruktioner</h2>
            <ol>
                {#each exampleRecipe.instructions as instruction, index}
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
