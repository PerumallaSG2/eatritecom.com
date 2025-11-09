import sql from 'mssql';

export const seedDatabaseWithPool = async (pool: sql.ConnectionPool): Promise<void> => {
  
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data safely
    try {
      await pool.request().query('DELETE FROM contact_submissions');
      await pool.request().query('DELETE FROM plans');
      await pool.request().query('DELETE FROM meals');
      await pool.request().query('DELETE FROM categories');
      await pool.request().query('DELETE FROM user_profiles');
      await pool.request().query('DELETE FROM users');
      console.log('🧹 Cleared existing data');
    } catch (error) {
      console.log('📝 Tables appear to be empty, proceeding with seeding...');
    }

    // Seed Categories
    const categories = [
      {
        name: 'Breakfast',
        description: 'Start your day with nutritious breakfast options',
        image_url: '/images/categories/breakfast.jpg',
        sort_order: 1
      },
      {
        name: 'Lunch',
        description: 'Satisfying midday meals to fuel your afternoon',
        image_url: '/images/categories/lunch.jpg',
        sort_order: 2
      },
      {
        name: 'Dinner',
        description: 'Delicious dinner options for the perfect end to your day',
        image_url: '/images/categories/dinner.jpg',
        sort_order: 3
      },
      {
        name: 'Healthy Bowls',
        description: 'Nutrient-packed bowls with fresh ingredients',
        image_url: '/images/categories/bowls.jpg',
        sort_order: 4
      },
      {
        name: 'Protein-Rich',
        description: 'High-protein meals for muscle building and recovery',
        image_url: '/images/categories/protein.jpg',
        sort_order: 5
      },
      {
        name: 'Low-Carb',
        description: 'Delicious low-carb options for your dietary goals',
        image_url: '/images/categories/low-carb.jpg',
        sort_order: 6
      }
    ];

    for (const category of categories) {
      await pool.request()
        .input('name', sql.NVarChar, category.name)
        .input('description', sql.NVarChar, category.description)
        .input('image_url', sql.NVarChar, category.image_url)
        .input('sort_order', sql.Int, category.sort_order)
        .query(`
          INSERT INTO categories (name, description, image_url, sort_order)
          VALUES (@name, @description, @image_url, @sort_order)
        `);
    }

    // Get category IDs for meals
    const categoryResult = await pool.request().query('SELECT id, name FROM categories');
    const categoryMap: { [key: string]: string } = {};
    categoryResult.recordset.forEach((cat: any) => {
      categoryMap[cat.name] = cat.id;
    });

    // Seed Meals
    const meals = [
      {
        name: 'Herb-Crusted Salmon',
        description: 'Wild-caught salmon with a fresh herb crust, served with roasted vegetables and quinoa',
        short_description: 'Wild-caught salmon with roasted vegetables',
        image_url: '/images/meals/salmon.jpg',
        category_id: categoryMap['Dinner'],
        ingredients: 'Wild salmon, fresh herbs (dill, parsley, thyme), quinoa, broccoli, carrots, olive oil',
        allergens: 'Fish',
        price: 18.95,
        calories: 520,
        protein: 34,
        carbs: 28,
        fat: 22,
        fiber: 6,
        sugar: 5,
        sodium: 420,
        prep_time: 25,
        is_popular: true
      },
      {
        name: 'Korean BBQ Bowl',
        description: 'Marinated beef bulgogi with jasmine rice, kimchi, and fresh vegetables',
        short_description: 'Marinated beef with jasmine rice and kimchi',
        image_url: '/images/meals/korean-bbq.jpg',
        category_id: categoryMap['Healthy Bowls'],
        ingredients: 'Beef sirloin, jasmine rice, kimchi, carrots, cucumber, sesame seeds, soy sauce',
        allergens: 'Soy, Sesame',
        price: 16.95,
        calories: 480,
        protein: 28,
        carbs: 45,
        fat: 18,
        fiber: 4,
        sugar: 8,
        sodium: 680,
        prep_time: 20,
        is_popular: true
      },
      {
        name: 'Mediterranean Chicken',
        description: 'Grilled chicken breast with Mediterranean herbs, quinoa, and fresh vegetables',
        short_description: 'Grilled chicken with quinoa and fresh herbs',
        image_url: '/images/meals/med-chicken.jpg',
        category_id: categoryMap['Protein-Rich'],
        ingredients: 'Chicken breast, quinoa, cherry tomatoes, olives, feta cheese, cucumber, olive oil',
        allergens: 'Dairy',
        price: 15.95,
        calories: 440,
        protein: 32,
        carbs: 35,
        fat: 16,
        fiber: 5,
        sugar: 6,
        sodium: 380,
        prep_time: 18,
        is_popular: true
      },
      {
        name: 'Avocado Toast Bowl',
        description: 'Multigrain toast with smashed avocado, poached egg, and microgreens',
        short_description: 'Multigrain toast with avocado and egg',
        image_url: '/images/meals/avocado-toast.jpg',
        category_id: categoryMap['Breakfast'],
        ingredients: 'Multigrain bread, avocado, free-range egg, microgreens, cherry tomatoes, olive oil',
        allergens: 'Gluten, Eggs',
        price: 12.95,
        calories: 380,
        protein: 16,
        carbs: 28,
        fat: 24,
        fiber: 12,
        sugar: 4,
        sodium: 320,
        prep_time: 10
      },
      {
        name: 'Thai Curry Bowl',
        description: 'Coconut curry with vegetables, jasmine rice, and fresh herbs',
        short_description: 'Coconut curry with vegetables and rice',
        image_url: '/images/meals/thai-curry.jpg',
        category_id: categoryMap['Healthy Bowls'],
        ingredients: 'Coconut milk, mixed vegetables, jasmine rice, Thai basil, lime, red curry paste',
        allergens: 'None',
        price: 14.95,
        calories: 420,
        protein: 12,
        carbs: 52,
        fat: 18,
        fiber: 8,
        sugar: 10,
        sodium: 540,
        prep_time: 22
      },
      {
        name: 'Steak & Sweet Potato',
        description: 'Grass-fed beef steak with roasted sweet potato and green beans',
        short_description: 'Grass-fed steak with sweet potato',
        image_url: '/images/meals/steak.jpg',
        category_id: categoryMap['Protein-Rich'],
        ingredients: 'Grass-fed beef sirloin, sweet potato, green beans, garlic, rosemary, olive oil',
        allergens: 'None',
        price: 22.95,
        calories: 580,
        protein: 36,
        carbs: 32,
        fat: 26,
        fiber: 6,
        sugar: 12,
        sodium: 390,
        prep_time: 30
      },
      {
        name: 'Quinoa Power Salad',
        description: 'Superfood salad with quinoa, kale, berries, and nuts',
        short_description: 'Superfood salad with quinoa and berries',
        image_url: '/images/meals/power-salad.jpg',
        category_id: categoryMap['Lunch'],
        ingredients: 'Quinoa, kale, blueberries, walnuts, feta cheese, olive oil, balsamic vinegar',
        allergens: 'Nuts, Dairy',
        price: 13.95,
        calories: 360,
        protein: 14,
        carbs: 42,
        fat: 16,
        fiber: 10,
        sugar: 14,
        sodium: 280,
        prep_time: 12
      },
      {
        name: 'Keto Zucchini Lasagna',
        description: 'Low-carb lasagna made with zucchini, ground turkey, and cheese',
        short_description: 'Low-carb zucchini lasagna with turkey',
        image_url: '/images/meals/zucchini-lasagna.jpg',
        category_id: categoryMap['Low-Carb'],
        ingredients: 'Zucchini, ground turkey, mozzarella, ricotta, tomato sauce, Italian herbs',
        allergens: 'Dairy',
        price: 17.95,
        calories: 420,
        protein: 30,
        carbs: 12,
        fat: 28,
        fiber: 4,
        sugar: 8,
        sodium: 650,
        prep_time: 35
      }
    ];

    for (const meal of meals) {
      await pool.request()
        .input('name', sql.NVarChar, meal.name)
        .input('description', sql.NVarChar, meal.description)
        .input('short_description', sql.NVarChar, meal.short_description)
        .input('image_url', sql.NVarChar, meal.image_url)
        .input('category_id', sql.NVarChar, meal.category_id)
        .input('ingredients', sql.NVarChar, meal.ingredients)
        .input('allergens', sql.NVarChar, meal.allergens)
        .input('price', sql.Decimal(10, 2), meal.price)
        .input('calories', sql.Int, meal.calories)
        .input('protein', sql.Int, meal.protein)
        .input('carbs', sql.Int, meal.carbs)
        .input('fat', sql.Int, meal.fat)
        .input('fiber', sql.Int, meal.fiber)
        .input('sugar', sql.Int, meal.sugar)
        .input('sodium', sql.Int, meal.sodium)
        .input('prep_time', sql.Int, meal.prep_time)
        .input('is_popular', sql.Bit, meal.is_popular || false)
        .query(`
          INSERT INTO meals (
            name, description, short_description, image_url, category_id, 
            ingredients, allergens, price, calories, protein, carbs, fat, 
            fiber, sugar, sodium, prep_time, is_popular
          ) VALUES (
            @name, @description, @short_description, @image_url, @category_id,
            @ingredients, @allergens, @price, @calories, @protein, @carbs, @fat,
            @fiber, @sugar, @sodium, @prep_time, @is_popular
          )
        `);
    }

    // Seed Plans
    const plans = [
      {
        name: 'Starter',
        description: 'Perfect for trying us out',
        meals_per_week: 6,
        price_per_meal: 13.95,
        total_price: 83.70,
        discount: 0,
        features: JSON.stringify([
          '6 meals per week',
          'Free shipping',
          'Flexible scheduling',
          'Skip or cancel anytime'
        ])
      },
      {
        name: 'Essential',
        description: 'Most popular choice',
        meals_per_week: 8,
        price_per_meal: 12.95,
        total_price: 103.60,
        discount: 7,
        is_popular: true,
        features: JSON.stringify([
          '8 meals per week',
          'Free shipping',
          'Flexible scheduling',
          'Skip or cancel anytime',
          'Priority customer support'
        ])
      },
      {
        name: 'Family',
        description: 'Best value for families',
        meals_per_week: 12,
        price_per_meal: 11.95,
        total_price: 143.40,
        discount: 14,
        features: JSON.stringify([
          '12 meals per week',
          'Free shipping',
          'Flexible scheduling',
          'Skip or cancel anytime',
          'Priority customer support',
          'Bulk meal discounts'
        ])
      }
    ];

    for (const plan of plans) {
      await pool.request()
        .input('name', sql.NVarChar, plan.name)
        .input('description', sql.NVarChar, plan.description)
        .input('meals_per_week', sql.Int, plan.meals_per_week)
        .input('price_per_meal', sql.Decimal(10, 2), plan.price_per_meal)
        .input('total_price', sql.Decimal(10, 2), plan.total_price)
        .input('discount', sql.Decimal(5, 2), plan.discount)
        .input('is_popular', sql.Bit, plan.is_popular || false)
        .input('features', sql.NVarChar, plan.features)
        .query(`
          INSERT INTO plans (
            name, description, meals_per_week, price_per_meal, 
            total_price, discount, is_popular, features
          ) VALUES (
            @name, @description, @meals_per_week, @price_per_meal,
            @total_price, @discount, @is_popular, @features
          )
        `);
    }

    console.log('✅ Database seeding completed successfully');
    console.log(`📊 Seeded: ${categories.length} categories, ${meals.length} meals, ${plans.length} plans`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
};