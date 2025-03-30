import type { Recipe, RecipeListing } from '../types/recipe'

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
    preparationTimeMinutes: 20,
    cookingTimeMinutes: 25,
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
    preparationTimeMinutes: 15,
    cookingTimeMinutes: 20,
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
    preparationTimeMinutes: 20,
    cookingTimeMinutes: 30,
    servings: 2
  },
  {
    id: 4,
    title: "Shepherd's Pie",
    description: "A classic Shepherd's Pie recipe that is hearty and comforting.",
    ingredients: [
      '500 g ground beef',
      '1 onion',
      '1 carrot',
      '2 cloves of garlic',
      '1 tbsp tomato paste',
      '300 ml beef broth',
      '1 tbsp Worcestershire sauce',
      'Salt and pepper to taste',
      '900 g potatoes',
      '50 g butter',
      '100 ml milk',
      '100 g grated cheese'
    ],
    instructions: [
      'Preheat the oven to 200°C.',
      'Peel and chop the onion, carrot, and garlic.',
      'Fry the ground beef in a pan until browned, then add the onion, carrot, and garlic.',
      'Stir in the tomato paste, beef broth, and Worcestershire sauce. Let simmer for 10 minutes.',
      'Season with salt and pepper.',
      'Meanwhile, boil the potatoes until tender, then mash with butter and milk.',
      'Transfer the meat mixture to a baking dish, top with the mashed potatoes, and sprinkle grated cheese on top.',
      'Bake in the oven for 20-25 minutes until the top is golden brown.'
    ],
    image:
      'https://www.ica.se/imagevault/publishedmedia/s33m4cc6hti51bbvsieu/3375-2-shepherds-pie_headersize.jpg',
    category: 'Main Dish',
    difficulty: 'Medium',
    preparationTimeMinutes: 30,
    cookingTimeMinutes: 35,
    servings: 4
  },
  {
    id: 5,
    title: 'Atole de Elote',
    description:
      'A warm and comforting traditional Mexican drink made with corn, milk, sugar, and cinnamon.',
    ingredients: [
      '6-8 ears yellow corn',
      '4-6 cups water',
      '1/3 cup sugar',
      '1-2 cups milk',
      '1/2 teaspoon salt',
      'Ground cinnamon for garnish'
    ],
    instructions: [
      'Clean corn by removing the leaves and place the ears in a pot of water, then boil for 20-30 minutes.',
      'Remove corn from water. With a sharp knife, cut the kernels off the ears. Save the boiling water.',
      'Add cold water to the boiling water to make a total of 6-8 cups. Add the corn. If the mixture is too thick, add more water.',
      'Bring the corn and water back to a boil.',
      'Add sugar and cinnamon.',
      'Separately, boil the milk.',
      'Once the milk begins to boil, slowly add it to the corn mixture and stir.',
      'Let cool before serving warm.'
    ],
    image: 'https://example.com/atole-de-elote.jpg',
    category: 'Beverage',
    difficulty: 'Easy',
    preparationTimeMinutes: 15,
    cookingTimeMinutes: 30,
    servings: 4
  }
]

class RecipeRepository {
  private recipes: Recipe[] = []

  constructor() {
    this.recipes = recipes
  }

  getRecipeById(id: number): Recipe | undefined {
    return this.recipes.find((recipe) => recipe.id === id)
  }

  getRecipeListing(): RecipeListing[] {
    return this.recipes.map((recipe) => ({
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      image: recipe.image,
      category: recipe.category,
      difficulty: recipe.difficulty,
      preparationTimeMinutes: recipe.preparationTimeMinutes,
      cookingTimeMinutes: recipe.cookingTimeMinutes,
      servings: recipe.servings
    }))
  }

  add(recipe: Recipe): void {
    this.recipes.push(recipe)
  }

  updateById(id: number, recipe: Recipe): void {
    const index = this.recipes.findIndex((r) => r.id === id)
    if (index !== -1) {
      this.recipes[index] = recipe
    } else {
      throw new Error('Recipe not found')
    }
  }

  deleteById(id: number): void {
    const index = this.recipes.findIndex((r) => r.id === id)
    if (index !== -1) {
      this.recipes.splice(index, 1)
    } else {
      throw new Error('Recipe not found')
    }
  }
}

const recipeRepository = new RecipeRepository()
export default recipeRepository
