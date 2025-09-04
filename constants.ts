import type { Category, MenuItem } from './types';

export const CATEGORIES: Category[] = [
  { id: 'burgers', name: 'Burgers' },
  { id: 'pasta', name: 'Pasta' },
  { id: 'salads', name: 'Salads' },
  { id: 'desserts', name: 'Desserts' },
  { id: 'beverages', name: 'Beverages' },
];

export const MENU_ITEMS: MenuItem[] = [
  // Burgers
  { id: 1, name: 'Classic Beef Burger', description: 'A juicy all-beef patty with cheddar, lettuce, tomato, and our signature sauce.', price: 450, imageUrl: 'https://picsum.photos/400/300?random=1', categoryId: 'burgers' },
  { id: 2, name: 'Double Bacon Smash', description: 'Two smashed patties, crispy bacon, American cheese, and pickles.', price: 650, imageUrl: 'https://picsum.photos/400/300?random=2', categoryId: 'burgers' },
  { id: 3, name: 'Spicy Chicken Deluxe', description: 'Crispy fried chicken breast, pepper jack cheese, jalapeños, and spicy aioli.', price: 550, imageUrl: 'https://picsum.photos/400/300?random=3', categoryId: 'burgers' },
  { id: 4, name: 'Mushroom Swiss Melt', description: 'Sautéed mushrooms and melted Swiss cheese over a seasoned beef patty.', price: 520, imageUrl: 'https://picsum.photos/400/300?random=4', categoryId: 'burgers' },
  { id: 5, name: 'The Veggie Burger', description: 'A house-made black bean patty with avocado, sprouts, and chipotle mayo.', price: 480, imageUrl: 'https://picsum.photos/400/300?random=5', categoryId: 'burgers' },

  // Pasta
  { id: 6, name: 'Spaghetti Carbonara', description: 'Classic carbonara with pancetta, pecorino cheese, and a rich egg yolk sauce.', price: 720, imageUrl: 'https://picsum.photos/400/300?random=6', categoryId: 'pasta' },
  { id: 7, name: 'Fettuccine Alfredo', description: 'Creamy Parmesan sauce tossed with fresh fettuccine pasta.', price: 680, imageUrl: 'https://picsum.photos/400/300?random=7', categoryId: 'pasta' },
  { id: 8, name: 'Pesto Penne', description: 'Penne pasta with a vibrant basil pesto, cherry tomatoes, and pine nuts.', price: 650, imageUrl: 'https://picsum.photos/400/300?random=8', categoryId: 'pasta' },
  { id: 9, name: 'Lasagna al Forno', description: 'Layers of fresh pasta, bolognese sauce, béchamel, and melted mozzarella.', price: 780, imageUrl: 'https://picsum.photos/400/300?random=9', categoryId: 'pasta' },
  { id: 10, name: 'Shrimp Scampi', description: 'Linguine with sautéed shrimp in a garlic, white wine, and butter sauce.', price: 850, imageUrl: 'https://picsum.photos/400/300?random=10', categoryId: 'pasta' },

  // Salads
  { id: 11, name: 'Classic Caesar Salad', description: 'Crisp romaine, Parmesan, croutons, and a creamy Caesar dressing.', price: 420, imageUrl: 'https://picsum.photos/400/300?random=11', categoryId: 'salads' },
  { id: 12, name: 'Greek Salad', description: 'Cucumbers, tomatoes, olives, feta cheese, and a light vinaigrette.', price: 450, imageUrl: 'https://picsum.photos/400/300?random=12', categoryId: 'salads' },
  { id: 13, name: 'Caprese Salad', description: 'Fresh mozzarella, ripe tomatoes, basil, and a balsamic glaze.', price: 480, imageUrl: 'https://picsum.photos/400/300?random=13', categoryId: 'salads' },
  { id: 14, name: 'Quinoa & Avocado', description: 'Nutrient-rich quinoa with avocado, corn, black beans, and lime dressing.', price: 520, imageUrl: 'https://picsum.photos/400/300?random=14', categoryId: 'salads' },
  { id: 15, name: 'Cobb Salad', description: 'Grilled chicken, bacon, avocado, egg, and blue cheese on a bed of greens.', price: 580, imageUrl: 'https://picsum.photos/400/300?random=15', categoryId: 'salads' },

  // Desserts
  { id: 16, name: 'Molten Chocolate Lava Cake', description: 'Warm chocolate cake with a gooey center, served with vanilla ice cream.', price: 350, imageUrl: 'https://picsum.photos/400/300?random=16', categoryId: 'desserts' },
  { id: 17, name: 'Classic Tiramisu', description: 'Layers of coffee-soaked ladyfingers, mascarpone cream, and cocoa powder.', price: 380, imageUrl: 'https://picsum.photos/400/300?random=17', categoryId: 'desserts' },
  { id: 18, name: 'New York Cheesecake', description: 'Rich and creamy cheesecake with a graham cracker crust and berry coulis.', price: 360, imageUrl: 'https://picsum.photos/400/300?random=18', categoryId: 'desserts' },
  { id: 19, name: 'Apple Crumble', description: 'Warm baked apples topped with a cinnamon-spiced crumble and caramel sauce.', price: 340, imageUrl: 'https://picsum.photos/400/300?random=19', categoryId: 'desserts' },
  { id: 20, name: 'Trio of Sorbet', description: 'A refreshing selection of three seasonal fruit sorbets.', price: 320, imageUrl: 'https://picsum.photos/400/300?random=20', categoryId: 'desserts' },

  // Beverages
  { id: 21, name: 'Classic Mojito', description: 'A refreshing mix of white rum, mint, lime, sugar, and soda water.', price: 450, imageUrl: 'https://picsum.photos/400/300?random=21', categoryId: 'beverages' },
  { id: 22, name: 'Old Fashioned', description: 'A timeless cocktail with bourbon, bitters, sugar, and an orange twist.', price: 550, imageUrl: 'https://picsum.photos/400/300?random=22', categoryId: 'beverages' },
  { id: 23, name: 'Craft Beer Selection', description: 'Ask your server for our rotating selection of local craft beers.', price: 380, imageUrl: 'https://picsum.photos/400/300?random=23', categoryId: 'beverages' },
  { id: 24, name: 'House Red Wine', description: 'A glass of our carefully selected house red wine, full-bodied and smooth.', price: 420, imageUrl: 'https://picsum.photos/400/300?random=24', categoryId: 'beverages' },
  { id: 25, name: 'Freshly Squeezed Lemonade', description: 'A sweet and tangy lemonade made in-house.', price: 250, imageUrl: 'https://picsum.photos/400/300?random=25', categoryId: 'beverages' },
];