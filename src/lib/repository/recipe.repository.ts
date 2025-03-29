import type { Recipe, RecipeListing } from '../types/recipe';

const recipes: Recipe[] = [
    {
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
    },
    {
        id: 2,
        title: 'Pasta Carbonara',
        description: 'En klassisk italiensk pasta med ägg, guanciale och pecorinoost',
        ingredients: [
            '400g spaghetti',
            '200g guanciale eller pancetta',
            '4 äggulor',
            '100g Pecorino Romano',
            '100g Parmigiano Reggiano',
            'Svartpeppar',
            'Salt'
        ],
        instructions: [
            'Koka pastan i saltat vatten enligt förpackningens instruktioner.',
            'Skär guanciale i små bitar och stek tills den är krispig.',
            'Blanda äggulor och riven ost i en skål.',
            'Spara lite pastavatten och häll av resten.',
            'Blanda pastan med guanciale och äggblandningen.',
            'Tillsätt pastavatten om det behövs för att få rätt konsistens.',
            'Krydda med svartpeppar och servera direkt.'
        ],
        image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3',
        category: 'Pasta',
        difficulty: 'Medel',
        preparationTime: 15,
        cookingTime: 20,
        servings: 4
    },
    {
        id: 3,
        title: 'Vegetarisk Buddha Bowl',
        description: 'En nyttig och färgglad bowl med quinoa, rostad grönsak och tahinisås',
        ingredients: [
            '1 dl quinoa',
            '1 sötpotatis',
            '1 broccoli',
            '1 rödlök',
            '1 burk kikärtor',
            '2 msk olivolja',
            'Salt och peppar',
            'För tahinisås:',
            '2 msk tahini',
            '1 vitlöksklyfta',
            '1 msk citronsaft',
            '2 msk vatten'
        ],
        instructions: [
            'Koka quinoa enligt förpackningens instruktioner.',
            'Skär sötpotatis i bitar och rosta i ugnen med olivolja.',
            'Koka broccoli tills den är mjuk men fortfarande har bite.',
            'Stek rödlök tills den är mjuk.',
            'Gör tahinisås genom att blanda alla ingredienser.',
            'Lägg upp allt i en skål och toppa med tahinisås.'
        ],
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
        category: 'Vegetariskt',
        difficulty: 'Lätt',
        preparationTime: 20,
        cookingTime: 30,
        servings: 2
    }
];

class RecipeRepository {
    private recipes: Recipe[] = [];

    constructor() {
        this.recipes = recipes;
    }

    getRecipeById(id: number): Recipe | undefined {
        return this.recipes.find(recipe => recipe.id === id);
    }

    getRecipeListing(): RecipeListing[] {
        return this.recipes.map(recipe => ({
            id: recipe.id,
            title: recipe.title,
            description: recipe.description,
            image: recipe.image,
            category: recipe.category,
            difficulty: recipe.difficulty,
            preparationTime: recipe.preparationTime,
            cookingTime: recipe.cookingTime,
            servings: recipe.servings
        }));
    }

    add(recipe: Recipe): void {
        this.recipes.push(recipe);
    }

    updateById(id: number, recipe: Recipe): void {
        const index = this.recipes.findIndex(r => r.id === id);
        if (index !== -1) {
            this.recipes[index] = recipe;
        }

        throw new Error('Recipe not found');
    }

    deleteById(id: number): void {
        const index = this.recipes.findIndex(r => r.id === id);
        if (index !== -1) {
            this.recipes.splice(index, 1);
        }

        throw new Error('Recipe not found');
    }
}

const recipeRepository = new RecipeRepository();
export default recipeRepository;
