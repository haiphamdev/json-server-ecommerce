const faker = require('faker');
const fs = require('fs');

// Set locale to use Vietnamese

// Random data
const randomCategoryList = (n) => {
  if (n <= 0) return [];

  const categoryList = [];

  // loop and push category
  Array.from(new Array(n)).forEach(() => {
    const category = {
      id: faker.random.uuid(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    categoryList.push(category);
  });

  return categoryList;
};

const randomProductList = (categoryList, numberOfProducts) => {
  if (numberOfProducts <= 0) return [];

  const productList = [];

  // random data
  for (const category of categoryList) {
    Array.from(new Array(numberOfProducts)).forEach(() => {
      const product = {
        categoryId: category.id,
        id: faker.random.uuid(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      productList.push(product);
    });
  }

  return productList;
};

(() => {
  // random data
  const categoryList = randomCategoryList(4);
  const productList = randomProductList(categoryList, 5);

  // prepare db object
  const db = {
    categories: categoryList,
    products: productList,
  };

  // write db object to db.json
  fs.writeFileSync('db.json', JSON.stringify(db), () => {
    console.log('Generate data successfully');
  });
})();
