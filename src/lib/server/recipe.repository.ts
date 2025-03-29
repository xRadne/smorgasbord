import type { Recipe, RecipeListing } from '../types/recipe';

const recipes: Recipe[] = [
    {
        id: 1,
        title: 'Classic Meatballs',
        description: 'Delicious, juicy meatballs with cream sauce - a Swedish classic!',
        ingredients: [
            '500g ground meat',
            '1 yellow onion',
            '1 egg',
            '1 dl milk',
            '2 tbsp breadcrumbs',
            '1 tsp salt',
            '1/2 tsp black pepper',
            '2 tbsp butter for frying',
            '2 dl cream',
            '1 tbsp wheat flour',
            '1 beef stock cube'
        ],
        instructions: [
            'Mix ground meat, finely chopped onion, egg, milk, breadcrumbs and spices in a bowl.',
            'Form into small balls with wet hands.',
            'Fry the balls in butter until golden brown.',
            'Remove the balls and set aside.',
            'Make sauce by frying flour in butter, add cream and stock.',
            'Let the sauce boil and thicken.',
            'Put the balls back in the sauce and let everything get hot.'
        ],
        image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc',
        category: 'Main Course',
        difficulty: 'Medium',
        preparationTime: 20,
        cookingTime: 25,
        servings: 4
    },
    {
        id: 2,
        title: 'Pasta Carbonara',
        description: 'A classic Italian pasta with eggs, guanciale and pecorino cheese',
        ingredients: [
            '400g spaghetti',
            '200g guanciale or pancetta',
            '4 egg yolks',
            '100g Pecorino Romano',
            '100g Parmigiano Reggiano',
            'Black pepper',
            'Salt'
        ],
        instructions: [
            'Cook pasta in salted water according to package instructions.',
            'Cut guanciale into small pieces and fry until crispy.',
            'Mix egg yolks and grated cheese in a bowl.',
            'Save some pasta water and drain the rest.',
            'Mix pasta with guanciale and egg mixture.',
            'Add pasta water if needed to get the right consistency.',
            'Season with black pepper and serve immediately.'
        ],
        image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3',
        category: 'Pasta',
        difficulty: 'Medium',
        preparationTime: 15,
        cookingTime: 20,
        servings: 4
    },
    {
        id: 3,
        title: 'Vegetarian Buddha Bowl',
        description: 'A healthy and colorful bowl with quinoa, roasted vegetables and tahini sauce',
        ingredients: [
            '1 dl quinoa',
            '1 sweet potato',
            '1 broccoli',
            '1 red onion',
            '1 can chickpeas',
            '2 tbsp olive oil',
            'Salt and pepper',
            'For tahini sauce:',
            '2 tbsp tahini',
            '1 garlic clove',
            '1 tbsp lemon juice',
            '2 tbsp water'
        ],
        instructions: [
            'Cook quinoa according to package instructions.',
            'Cut sweet potato into pieces and roast in the oven with olive oil.',
            'Cook broccoli until soft but still has bite.',
            'Fry red onion until soft.',
            'Make tahini sauce by mixing all ingredients.',
            'Arrange everything in a bowl and top with tahini sauce.'
        ],
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
        category: 'Vegetarian',
        difficulty: 'Easy',
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
        } else {
            throw new Error('Recipe not found');
        }
    }

    deleteById(id: number): void {
        const index = this.recipes.findIndex(r => r.id === id);
        if (index !== -1) {
            this.recipes.splice(index, 1);
        } else {
            throw new Error('Recipe not found');
        }
    }
}

const recipeRepository = new RecipeRepository();
export default recipeRepository; 