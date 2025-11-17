// import sql from 'mssql';

// export const seedDatabaseWithPool = async (pool: sql.ConnectionPool): Promise<void> => {

//   try {
//     console.log('🌱 Starting EatRite database seeding...');

//     // Clear existing data safely
//     try {
//       await pool.request().query('DELETE FROM order_meals');
//       await pool.request().query('DELETE FROM orders');
//       await pool.request().query('DELETE FROM meals');
//       await pool.request().query('DELETE FROM meal_plans');
//       await pool.request().query('DELETE FROM meal_categories');
//       await pool.request().query('DELETE FROM dietary_preferences');
//       console.log('🧹 Cleared existing data');
//     } catch (error) {
//       console.log('📝 Tables appear to be empty, proceeding with seeding...');
//     }

//     // Seed Dietary Preferences (Factor75 style)
//     const dietaryPreferences = [
//       { name: 'High Protein', description: 'Deliciously satisfying meals with 30+ grams of protein', icon: '💪', sort_order: 1 },
//       { name: 'Keto', description: 'Keto-friendly meals with around 15 grams of net carbs or less', icon: '🥑', sort_order: 2 },
//       { name: 'Carb Conscious', description: 'Balanced meals with around 35 grams of total carbs or less', icon: '🌱', sort_order: 3 },
//       { name: 'Calorie Smart', description: 'Nutritious and perfectly portioned meals with 550 calories or less', icon: '⚖️', sort_order: 4 },
//       { name: 'Fiber-Filled', description: 'Satisfying meals with 6+ grams of fiber to support your gut', icon: '🌾', sort_order: 5 },
//       { name: 'Paleo', description: 'Meals following paleo dietary principles', icon: '🥩', sort_order: 6 }
//     ];

//     for (const pref of dietaryPreferences) {
//       await pool.request()
//         .input('name', sql.NVarChar, pref.name)
//         .input('description', sql.NVarChar, pref.description)
//         .input('icon', sql.NVarChar, pref.icon)
//         .input('sort_order', sql.Int, pref.sort_order)
//         .query(`
//           INSERT INTO dietary_preferences (name, description, icon, sort_order)
//           VALUES (@name, @description, @icon, @sort_order)
//         `);
//     }

//     const mealCategories = [
//       { name: 'Chef\'s Choice', description: 'Our chef\'s favorite premium meals', image_url: '/images/categories/chefs-choice.jpg', sort_order: 1 },
//       { name: 'Protein Bowls', description: 'Hearty bowls packed with protein', image_url: '/images/categories/protein-bowls.jpg', sort_order: 2 },
//       { name: 'Comfort Classics', description: 'Elevated comfort food favorites', image_url: '/images/categories/comfort.jpg', sort_order: 3 },
//       { name: 'Global Cuisine', description: 'International flavors from around the world', image_url: '/images/categories/global.jpg', sort_order: 4 },
//       { name: 'Breakfast & Brunch', description: 'Morning meals and brunch favorites', image_url: '/images/categories/breakfast.jpg', sort_order: 5 },
//       { name: 'Salads & Lighter Fare', description: 'Fresh salads and lighter meal options', image_url: '/images/categories/salads.jpg', sort_order: 6 }
//     ];

//     for (const category of mealCategories) {
//       await pool.request()
//         .input('name', sql.NVarChar, category.name)
//         .input('description', sql.NVarChar, category.description)
//         .input('image_url', sql.NVarChar, category.image_url)
//         .input('sort_order', sql.Int, category.sort_order)
//         .query(`
//           INSERT INTO meal_categories (name, description, image_url, sort_order)
//           VALUES (@name, @description, @image_url, @sort_order)
//         `);
//     }

//     // Get category IDs for meals
//     const categoryResult = await pool.request().query('SELECT id, name FROM meal_categories');
//     const categoryMap: { [key: string]: string } = {};
//     categoryResult.recordset.forEach((cat: any) => {
//       categoryMap[cat.name] = cat.id;
//     });

//     // Seed Meals (Factor75 inspired)
//     const meals = [
//       // Chef's Choice
//       {
//         name: 'Truffle Butter Chicken & Mushroom Risotto',
//         description: 'Succulent chicken breast with truffle butter, creamy mushroom risotto, and garlic-roasted green beans',
//         short_description: 'Truffle chicken with mushroom risotto',
//         image_url: 'https://images.unsplash.com/photo-1598511757337-6d6d2feaa82d?w=500&h=400&fit=crop&crop=center',
//         category_id: categoryMap["Chef's Choice"],
//         ingredients: 'Chicken breast, truffle butter, arborio rice, mushrooms, green beans, garlic, parmesan',
//         allergens: 'Dairy',
//         price: 16.99,
//         calories: 520,
//         protein: 35,
//         carbs: 28,
//         fat: 24,
//         fiber: 4,
//         sodium: 680,
//         prep_time: 2,
//         is_popular: true,
//         is_top_rated: true,
//         dietary_tags: '["High Protein"]'
//       },
//       {
//         name: 'Chimichurri Steak & Sweet Potato',
//         description: 'Grass-fed beef sirloin with fresh chimichurri, roasted sweet potato, and seasonal vegetables',
//         short_description: 'Grass-fed steak with chimichurri',
//         image_url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&h=400&fit=crop&crop=center',
//         category_id: categoryMap["Chef's Choice"],
//         ingredients: 'Grass-fed beef sirloin, sweet potato, chimichurri sauce, zucchini, bell peppers',
//         allergens: 'None',
//         price: 18.99,
//         calories: 580,
//         protein: 42,
//         carbs: 32,
//         fat: 26,
//         fiber: 6,
//         sodium: 420,
//         prep_time: 2,
//         is_popular: true,
//         dietary_tags: '["High Protein", "Paleo"]'
//       },
//       // Protein Bowls
//       {
//         name: 'Korean BBQ Protein Bowl',
//         description: 'Marinated beef bulgogi with cauliflower rice, kimchi, and sesame vegetables',
//         short_description: 'Korean beef with cauliflower rice',
//         image_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&h=400&fit=crop&crop=center',
//         category_id: categoryMap['Protein Bowls'],
//         ingredients: 'Beef bulgogi, cauliflower rice, kimchi, sesame oil, scallions, carrots',
//         allergens: 'Soy, Sesame',
//         price: 15.99,
//         calories: 480,
//         protein: 38,
//         carbs: 15,
//         fat: 28,
//         fiber: 6,
//         sodium: 720,
//         prep_time: 2,
//         is_popular: true,
//         dietary_tags: '["High Protein", "Keto"]'
//       },
//       {
//         name: 'Mediterranean Chicken Bowl',
//         description: 'Herb-crusted chicken with quinoa, olives, feta, and cucumber-tomato salad',
//         short_description: 'Mediterranean chicken with quinoa',
//         image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=400&fit=crop&crop=center',
//         category_id: categoryMap['Protein Bowls'],
//         ingredients: 'Chicken breast, quinoa, feta cheese, olives, cucumbers, tomatoes, herbs',
//         allergens: 'Dairy',
//         price: 14.99,
//         calories: 520,
//         protein: 35,
//         carbs: 38,
//         fat: 20,
//         fiber: 7,
//         sodium: 580,
//         prep_time: 2,
//         dietary_tags: '["High Protein", "Fiber-Filled"]'
//       },
//       // Comfort Classics
//       {
//         name: 'Truffle Mac & Cheese with Chicken',
//         description: 'Creamy truffle mac and cheese topped with herb-roasted chicken breast',
//         short_description: 'Truffle mac with herb chicken',
//         image_url: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=500&h=400&fit=crop&crop=center',
//         category_id: categoryMap['Comfort Classics'],
//         ingredients: 'Chicken breast, pasta, truffle oil, three-cheese blend, herbs, breadcrumbs',
//         allergens: 'Dairy, Gluten',
//         price: 16.99,
//         calories: 620,
//         protein: 32,
//         carbs: 45,
//         fat: 32,
//         fiber: 3,
//         sodium: 890,
//         prep_time: 2,
//         is_top_rated: true,
//         dietary_tags: '["High Protein"]'
//       },
//       {
//         name: 'BBQ Pulled Pork & Sweet Potato',
//         description: 'Slow-cooked BBQ pulled pork with roasted sweet potato and coleslaw',
//         short_description: 'BBQ pork with sweet potato',
//         image_url: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=500&h=400&fit=crop&crop=center',
//         category_id: categoryMap['Comfort Classics'],
//         ingredients: 'Pulled pork, sweet potato, BBQ sauce, cabbage slaw, onions',
//         allergens: 'None',
//         price: 15.99,
//         calories: 540,
//         protein: 30,
//         carbs: 42,
//         fat: 24,
//         fiber: 8,
//         sodium: 680,
//         prep_time: 2,
//         dietary_tags: '["High Protein", "Fiber-Filled"]'
//       },
//       // Global Cuisine
//       {
//         name: 'Thai Green Curry Chicken',
//         description: 'Authentic Thai green curry with chicken, vegetables, and jasmine rice',
//         short_description: 'Thai green curry with chicken',
//         image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500&h=400&fit=crop&crop=center',
//         category_id: categoryMap['Global Cuisine'],
//         ingredients: 'Chicken thigh, coconut milk, green curry paste, jasmine rice, vegetables',
//         allergens: 'None',
//         price: 14.99,
//         calories: 480,
//         protein: 28,
//         carbs: 35,
//         fat: 24,
//         fiber: 4,
//         sodium: 820,
//         prep_time: 2,
//         is_new: true,
//         dietary_tags: '["High Protein"]'
//       },
//       {
//         name: 'Moroccan Spiced Salmon',
//         description: 'Pan-seared salmon with Moroccan spices, couscous, and roasted vegetables',
//         short_description: 'Moroccan salmon with couscous',
//         image_url: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&h=400&fit=crop&crop=center',
//         category_id: categoryMap['Global Cuisine'],
//         ingredients: 'Atlantic salmon, couscous, Moroccan spices, zucchini, bell peppers',
//         allergens: 'Fish, Gluten',
//         price: 17.99,
//         calories: 520,
//         protein: 36,
//         carbs: 32,
//         fat: 24,
//         fiber: 5,
//         sodium: 480,
//         prep_time: 2,
//         dietary_tags: '["High Protein"]'
//       },
//       // Breakfast & Brunch
//       {
//         name: 'Protein Power Breakfast Bowl',
//         description: 'Scrambled eggs with turkey sausage, roasted potatoes, and avocado',
//         short_description: 'Protein breakfast bowl',
//         image_url: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=500&h=400&fit=crop&crop=center',
//         category_id: categoryMap['Breakfast & Brunch'],
//         ingredients: 'Free-range eggs, turkey sausage, roasted potatoes, avocado, bell peppers',
//         allergens: 'Eggs',
//         price: 12.99,
//         calories: 450,
//         protein: 28,
//         carbs: 24,
//         fat: 26,
//         fiber: 8,
//         sodium: 620,
//         prep_time: 2,
//         is_popular: true,
//         dietary_tags: '["High Protein", "Keto"]'
//       },
//       // Salads & Lighter Fare
//       {
//         name: 'Grilled Chicken Caesar Salad',
//         description: 'Crisp romaine lettuce with grilled chicken, parmesan, and house Caesar dressing',
//         short_description: 'Grilled chicken Caesar',
//         image_url: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500&h=400&fit=crop&crop=center',
//         category_id: categoryMap['Salads & Lighter Fare'],
//         ingredients: 'Grilled chicken, romaine lettuce, parmesan cheese, Caesar dressing, croutons',
//         allergens: 'Dairy, Gluten',
//         price: 13.99,
//         calories: 420,
//         protein: 32,
//         carbs: 18,
//         fat: 24,
//         fiber: 6,
//         sodium: 680,
//         prep_time: 2,
//         dietary_tags: '["High Protein", "Calorie Smart"]'
//       }
//     ];

//     for (const meal of meals) {
//       await pool.request()
//         .input('name', sql.NVarChar, meal.name)
//         .input('description', sql.NVarChar, meal.description)
//         .input('short_description', sql.NVarChar, meal.short_description)
//         .input('image_url', sql.NVarChar, meal.image_url)
//         .input('category_id', sql.UniqueIdentifier, meal.category_id)
//         .input('ingredients', sql.NVarChar, meal.ingredients)
//         .input('allergens', sql.NVarChar, meal.allergens)
//         .input('price', sql.Decimal(10, 2), meal.price)
//         .input('calories', sql.Int, meal.calories)
//         .input('protein', sql.Int, meal.protein)
//         .input('carbs', sql.Int, meal.carbs)
//         .input('fat', sql.Int, meal.fat)
//         .input('fiber', sql.Int, meal.fiber)
//         .input('sodium', sql.Int, meal.sodium)
//         .input('prep_time', sql.Int, meal.prep_time)
//         .input('is_popular', sql.Bit, meal.is_popular || false)
//         .input('is_new', sql.Bit, meal.is_new || false)
//         .input('is_top_rated', sql.Bit, meal.is_top_rated || false)
//         .input('dietary_tags', sql.NVarChar, meal.dietary_tags || '[]')
//         .query(`
//           INSERT INTO meals (
//             name, description, short_description, image_url, category_id,
//             ingredients, allergens, price, calories, protein, carbs, fat,
//             fiber, sodium, prep_time, is_popular, is_new, is_top_rated, dietary_tags
//           ) VALUES (
//             @name, @description, @short_description, @image_url, @category_id,
//             @ingredients, @allergens, @price, @calories, @protein, @carbs, @fat,
//             @fiber, @sodium, @prep_time, @is_popular, @is_new, @is_top_rated, @dietary_tags
//           )
//         `);
//     }

//     // Seed Meal Plans (Factor75 inspired)
//     const mealPlans = [
//       {
//         name: '6 Meals',
//         description: 'Perfect for trying us out',
//         meals_per_week: 6,
//         price_per_meal: 15.00,
//         total_weekly_price: 90.00,
//         discount_percentage: 0,
//         features: JSON.stringify([
//           '6 fresh meals per week',
//           'Free shipping on orders $79+',
//           'Flexible delivery options',
//           'Skip or pause anytime',
//           '100+ weekly menu options'
//         ])
//       },
//       {
//         name: '8 Meals',
//         description: 'Most popular choice',
//         meals_per_week: 8,
//         price_per_meal: 13.50,
//         total_weekly_price: 108.00,
//         discount_percentage: 10,
//         is_popular: true,
//         features: JSON.stringify([
//           '8 fresh meals per week',
//           'Free shipping',
//           'Flexible delivery options',
//           'Skip or pause anytime',
//           '100+ weekly menu options',
//           'Priority customer support'
//         ])
//       },
//       {
//         name: '10 Meals',
//         description: 'Great for meal planning',
//         meals_per_week: 10,
//         price_per_meal: 12.50,
//         total_weekly_price: 125.00,
//         discount_percentage: 17,
//         features: JSON.stringify([
//           '10 fresh meals per week',
//           'Free shipping',
//           'Flexible delivery options',
//           'Skip or pause anytime',
//           '100+ weekly menu options',
//           'Priority customer support',
//           'Nutrition coaching access'
//         ])
//       },
//       {
//         name: '12 Meals',
//         description: 'Best value for families',
//         meals_per_week: 12,
//         price_per_meal: 11.50,
//         total_weekly_price: 138.00,
//         discount_percentage: 23,
//         features: JSON.stringify([
//           '12 fresh meals per week',
//           'Free shipping',
//           'Flexible delivery options',
//           'Skip or pause anytime',
//           '100+ weekly menu options',
//           'Priority customer support',
//           'Nutrition coaching access',
//           'Family meal discounts'
//         ])
//       }
//     ];

//     for (const plan of mealPlans) {
//       await pool.request()
//         .input('name', sql.NVarChar, plan.name)
//         .input('description', sql.NVarChar, plan.description)
//         .input('meals_per_week', sql.Int, plan.meals_per_week)
//         .input('price_per_meal', sql.Decimal(10, 2), plan.price_per_meal)
//         .input('total_weekly_price', sql.Decimal(10, 2), plan.total_weekly_price)
//         .input('discount_percentage', sql.Decimal(5, 2), plan.discount_percentage)
//         .input('is_popular', sql.Bit, plan.is_popular || false)
//         .input('features', sql.NVarChar, plan.features)
//         .query(`
//           INSERT INTO meal_plans (
//             name, description, meals_per_week, price_per_meal,
//             total_weekly_price, discount_percentage, is_popular, features
//           ) VALUES (
//             @name, @description, @meals_per_week, @price_per_meal,
//             @total_weekly_price, @discount_percentage, @is_popular, @features
//           )
//         `);
//     }

//     console.log('✅ EatRite database seeding completed successfully');
//     console.log(`📊 Seeded: ${dietaryPreferences.length} dietary preferences, ${mealCategories.length} categories, ${meals.length} meals, ${mealPlans.length} plans`);

//   } catch (error) {
//     console.error('❌ Error seeding database:', error);
//     throw error;
//   }
// };
