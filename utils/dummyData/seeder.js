const fs = require('fs');
require('colors');
const dotenv = require('dotenv');
const Brand = require('../../models/brand.model');
const Category = require('../../models/category.model');
const Subcategory = require('../../models/subcategory.model');
const Product = require('../../models/product.model');
const { connectDatabase } = require('../../config/db');

dotenv.config({ path: '../../.env' });

connectDatabase();

const brands = JSON.parse(fs.readFileSync('./brands.json'));
const categories = JSON.parse(fs.readFileSync('./categories.json'));
const subcategories = JSON.parse(fs.readFileSync('./subcategories.json'));
const products = JSON.parse(fs.readFileSync('./products.json'));

const insertData = async () => {
  try {
    console.log('Inserting Categories...'.blue);
    await Category.create(categories);
    console.log(`${categories.length} Categories inserted`.green);

    console.log('Inserting Subcategories...'.blue);
    await Subcategory.create(subcategories);
    console.log(`${subcategories.length} Subcategories inserted`.green);

    console.log('Inserting Brands...'.blue);
    await Brand.create(brands);
    console.log(`${brands.length} Brands inserted`.green);

    console.log('Inserting Products...'.blue);
    await Product.create(products);
    console.log(`${products.length} Products inserted`.green);

    console.log('\nAll Data Inserted Successfully!'.green.inverse);
    process.exit();
  } catch (error) {
    console.log('Error during data insertion:'.red, error.message);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    console.log('Deleting all data...'.yellow);
    await Brand.deleteMany();
    await Category.deleteMany();
    await Subcategory.deleteMany();
    await Product.deleteMany();
    console.log('All Data Destroyed'.red.inverse);
    process.exit();
  } catch (error) {
    console.log('Error during data deletion:'.red, error.message);
    process.exit(1);
  }
};

// Usage: node seeder.js -i (insert) or node seeder.js -d (destroy)
if (process.argv[2] === '-i') {
  insertData();
} else if (process.argv[2] === '-d') {
  destroyData();
} else {
  console.log('Usage: node seeder.js -i (insert data) or node seeder.js -d (delete data)'.yellow);
  process.exit();
}
