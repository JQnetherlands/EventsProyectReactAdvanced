import { data } from "./src/utils/data.js";

// console.log(data.hits);

// for (const value of Object.values(data.hits)) {
//     for (const val of Object.values(value)) {
//         console.log(val)
//     }
// }

const twentyRecipesName = data.hits;
// twentyRecipesName.forEach((element) => {
//   if (
//     element.recipe.healthLabels.includes("Vegetarian") ||
//     element.recipe.healthLabels.includes("Vegan")
//   ) console.log(
//     element.recipe.healthLabels,
//     element.recipe.healthLabels.length
//   );
// });

// const test = () => {
//   const recipe = twentyRecipesName.map((element) => {
//     return element.recipe.dietLabels;
//   });
//   return recipe.filter((e) => e.length > 0);
// }

// console.log(test())

// const recipe = data.hits;



/* Preguntar chatGPT 
  export const CardRecipe = ({ food }) => {
    console.log(food); ({
    "label": "Paleo Chocolate Covered Caramels",
    ...
})
    const dietLabelsRaw = food.map((element) => {
      return element.recipe.dietLabels;
    });
    const cautionsRaw = food.map((element) => {
      return element.recipe.cautions;
    });
    const mealTypeRaw = food.map((element) => {
      return element.recipe.mealType;
    });
    const dishTypeRaw = food.map((element) => {
      return element.recipe.dishType;
    });
  
    const dietLabelsCleanNonFlat = dietLabelsRaw.filter((e) => e.length > 0);
    const cautionsCleanNonFlat = cautionsRaw.filter((e) => e.length > 0);
  
    const flatDietLabel = dietLabelsCleanNonFlat.reduce((acc, current) => {
      return acc.concat(current);
    }, []);
    const flatCautions = cautionsCleanNonFlat.reduce((acc, current) => {
      return acc.concat(current);
    }, []);
    const flatMealType = mealTypeRaw.reduce((acc, current) => {
      return acc.concat(current);
    }, []);
    const flatDishTypeRaw = dishTypeRaw.reduce((acc, current) => {
      return acc.concat(current);
    }, []);
  
    const dietLabelsTags = flatDietLabel.map((tag) => {
      console.log(food) ({
    "recipe": {
        "label": "Paleo Chocolate Covered Caramels",
        ...
})
      return (
        <Tag.Root {...console.log(food)} ({
    "recipe": {
        "label": "Paleo Chocolate Covered Caramels",
        ...
}) key={food.recipe.label}> pay attention to all the console.log, the three of them log the objet with the key recipe and valu of label, the object is bigger but I cut for the prompt, why then key={food.recipe.lable} can't not acces the message is the following CardRecipe.jsx:37 Uncaught TypeError: Cannot read properties of undefined (reading 'label')
    at CardRecipe.jsx:37:57
    at Array.map (<anonymous>)
    at CardRecipe (CardRecipe.jsx:34:40), explain me please teacher, thank you, we are rocking it.
          <Tag.Label>{tag}</Tag.Label>
        </Tag.Root>
      );
    });
    const cautionsLabelsTags = flatCautions.map((element) => {
      return (
        <Tag.Root key={food.recipe.label}>
          <Tag.Label>{element}</Tag.Label>
        </Tag.Root>
      );
    });
    const mealTypeLabelTags = flatMealType.map((element) => {
      return (
        <Tag.Root key={food.recipe.label}>
          <Tag.Label>{element}</Tag.Label>
        </Tag.Root>
      );
    });
  
    const dishTypeLabelTags = flatDishTypeRaw.map((element) => {
      return (
        <Tag.Root key={food.recipe.label}>
          <Tag.Label>{element}</Tag.Label>
        </Tag.Root>
      );
    });
    return (
      <Card.Root>
        <Card.Body>
          <Card.Title>{food.recipe.label}</Card.Title>
          <Image src={food.recipe.image} alt={food.recipe.label} />
          {dietLabelsTags}
          {cautionsLabelsTags}
          {mealTypeLabelTags}
          {dishTypeLabelTags}
        </Card.Body>
      </Card.Root>
    );
  };
*/

console.dir(twentyRecipesName.slice(0, 1).map(e => e.recipe.dishType), { depth: null, colors: true })

// console.log(Object.values(data.hits));
// for (const value of Object.values(data.hits)) {
//     for (const val of Object.values(value)) {
//         for (const valor of Object.values(val.totalNutrients)) {
//             for (const keys of Object.keys(valor)) {
//                 console.log(keys, ": ", valor[keys] )
//             }
//         }
//     }
// }

/*
Ah! You're asking a very **smart and subtle** question — and I now see **exactly where the misunderstanding is**.

Let’s go step-by-step:

---

### ❓ What you're trying to do:

You want to get **only diet labels that are non-empty strings**, **and skip the rest** — right?

You wrote:

```js
const valid = element.recipe.dietLabels.filter(e => e.length > 0);
console.log(valid)
```

So far, so good!

---

### ❓ Why are **empty arrays** still showing up in the output?

This line:

```js
return valid;
```

**always returns an array**, even if it's empty.

And `console.log(valid)` will print:

* an array with diet labels (e.g. `["Low-Carb"]`), OR
* an empty array `[]` when `element.recipe.dietLabels` was already empty or only had empty strings.

➡️ **You're filtering the *strings inside* the array, not the recipe object itself.**

You’re **not removing recipes with empty results** — you’re just transforming each recipe into “whatever diet labels are left” (which might still be none).

---

### ✅ If you want to **remove empty results entirely**, use `.filter()` on the recipes like this:

```js
const test = () => {
  const recipe = twentyRecipesName
    .map((element) => {
      const valid = element.recipe.dietLabels.filter(e => e.length > 0);
      return valid;
    })
    .filter((valid) => valid.length > 0); // 👈 This removes empty arrays

  return recipe;
};

console.log(test());
```

---

### 🔁 Summary:

| Line                                | What it does                                  |
| ----------------------------------- | --------------------------------------------- |
| `filter(e => e.length > 0)`         | Removes **empty strings** inside `dietLabels` |
| `filter(valid => valid.length > 0)` | Removes **recipes with no valid labels**      |

---

Let me know if you'd like to now render only those valid recipes in your React component. You're learning the core of clean data flow here — well done!

 */
