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

[
  'label',       'image',
  'url',         'yield',
  'dietLabels',  'healthLabels',
  'cautions',    'ingredientLines',
  'ingredients', 'calories',
  'totalWeight', 'totalTime',
  'cuisineType', 'mealType',
  'dishType',    'totalNutrients'
]


const onercipe = twentyRecipesName.filter(
  (e) => e.recipe.label === "Vegan Herb Crackers recipes"
);

console.log(onercipe[0].recipe.healthLabels);

// console.dir(
//   twentyRecipesName.map((e, index) => `${e.recipe.totalTime} ${index + 1}`, {
//     depth: null,
//     colors: true,
//   })
// );

// console.dir(
//   twentyRecipesName.map((e, index) => `${e.recipe.label} ${index + 1}`, {
//     depth: null,
//     colors: true,
//   })
// );

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


// chatgtp version from mine
import {
  Tag,
  Card,
  Image,
  Button,
  Center,
  Wrap,
  WrapItem,
  Text,
  Heading,
} from "@chakra-ui/react";

export const RecipePage = ({ items, clickFn }) => {
  const recipe = items[0].recipe;

  // Flatten helpers
  const flatten = (arr) =>
    arr.reduce((acc, cur) => acc.concat(cur), []).filter(Boolean); or this avoid to have an empty array below?

  const dietLabels = flatten(items.map((el) => el.recipe.dietLabels)); this could be an empty array still?
  const cautions = flatten(items.map((el) => el.recipe.cautions)); this could be an empty array still?
  const mealTypes = flatten(items.map((el) => el.recipe.mealType));
  const dishTypes = flatten(items.map((el) => el.recipe.dishType));
  const healthLabels = flatten(items.map((el) => el.recipe.healthLabels));

  // Tag generator
  const renderTags = (data, color, labelPrefix) =>
    data.map((item) => (
      <WrapItem key={`${labelPrefix}-${item}`}>
        <Tag.Root size="lg" colorPalette={color}>
          <Tag.Label>{item}</Tag.Label>
        </Tag.Root>
      </WrapItem>
    ));

  return (
    <Center p={6}>
      <Wrap spacing={6} justify="center" width="100%">
        <Card.Root
          maxW="900px"
          width="100%"
          boxShadow="xl"
          borderRadius="xl"
          overflow="hidden"
          p={6}
        >
          <Card.Body display="flex" flexDirection="column" gap={4}>
            <Image
              src={recipe.image}
              alt={recipe.label}
              borderRadius="lg"
              width="100%"
              height="300px"
              objectFit="cover"
            />

            <Card.Title textAlign="center" fontSize="2xl">
              {recipe.label}
            </Card.Title>

            <Text>
              <strong>Total cooking time:</strong> {recipe.totalTime} minutes
            </Text>
            <Text>
              <strong>Servings:</strong> {recipe.yield}
            </Text>

            <Heading size="md" mt={4}>
              Ingredients
            </Heading>
            <Text whiteSpace="pre-wrap">
              {recipe.ingredientLines.join("\n")}
            </Text>

            {dishTypes.length > 0 && (
              <>
                <Heading size="sm">Dish Type</Heading>
                <Wrap>{renderTags(dishTypes, "orange", "dish")}</Wrap>
              </>
            )}

            {dietLabels.length > 0 && ( if the arrays is empty then this line prevetns to render something?
              <>
                <Heading size="sm">Diet</Heading>
                <Wrap>{renderTags(dietLabels, "cyan", "diet")}</Wrap>
              </>
            )}

            {cautions.length > 0 && ( if the arrays is empty then this line prevetns to render something?
              <>
                <Heading size="sm">Cautions</Heading>
                <Wrap>{renderTags(cautions, "red", "caution")}</Wrap>
              </>
            )}

            {mealTypes.length > 0 && (
              <>
                <Heading size="sm">Meal Type</Heading>
                <Wrap>{renderTags(mealTypes, "purple", "meal")}</Wrap>
              </>
            )}

            {healthLabels.length > 0 && (
              <>
                <Heading size="sm">Health Labels</Heading>
                <Wrap>{renderTags(healthLabels, "green", "health")}</Wrap>
              </>
            )}

            <Center pt={6}>
              <Button colorScheme="teal" onClick={clickFn}>
                Back
              </Button>
            </Center>
          </Card.Body>
        </Card.Root>
      </Wrap>
    </Center>
  );
};

/* import {
  Card,
  Image,
  Tag,
  Wrap,
  WrapItem,
  Heading,
} from "@chakra-ui/react";

export const CardRecipe = ({ food, clickFn }) => {
  console.log("food", food);

  const getLabels = function (array, key) {
    return array.map((element) => {
      return element.recipe[key];
    });
  };
  const dietLabelsRaw = getLabels(food, "dietLabels");

  const cautionsRaw = getLabels(food, "cautions"); 
  const mealTypeRaw = getLabels(food, "mealType");
  const dishTypeRaw = getLabels(food, "dishType");
  const healthLabelsRaw = getLabels(food, "healthLabels");

  const dietLabelsCleanNonFlat = dietLabelsRaw.filter((e) => e.length > 0);
  const cautionsCleanNonFlat = cautionsRaw.filter((e) => e.length > 0);

  const flatter = function (array) {
    return array.reduce((acc, current) => {
      return acc.concat(current);
    }, []);
  };

  const flatDietLabel = flatter(dietLabelsCleanNonFlat);
  const flatCautions = flatter(cautionsCleanNonFlat);
  const flatMealType = flatter(mealTypeRaw);
  const flatDishTypeRaw = flatter(dishTypeRaw);
  const flatHealthLabels = flatter(healthLabelsRaw);

  const healthLabelTag = flatHealthLabels.filter((e) => {
    if (e === "Vegan") return true;
    if (e === "Vegetarian") return true;
  });

  const renderTags = function (data, color, prefix) {
    return data.map((label) => {
      return (
        <WrapItem key={`${prefix}-${label}`}>
          <Tag.Root size={"lg"} colorPalette={color}>
            <Tag.Label>{label}</Tag.Label>
          </Tag.Root>
        </WrapItem>
      );
    });
  };

  const item = food[0].recipe;

  return (
    <Card.Root
      width={"100%"}
      height={"100%"}
      boxShadow={"xl"}
      borderRadius={"xl"}
      overflow={"hidden"}
      onClick={() => clickFn(food)}
    >
      <Card.Body
        gap={4}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        justifyItems={"center"}
        alignItems={"center"}
      >
        <Image
          src={item.image}
          alt={item.label}
          width={"100%"}
          height={"200px"}
          objectFit="cover"
          objectPosition="center"
        />
        {flatDishTypeRaw.length > 0 &&
          renderTags(flatDishTypeRaw, "white", "dishType")}
        <Card.Title textAlign={"center"}>{item.label}</Card.Title>
        {flatDietLabel.length > 0 && (
          <>
            <Heading>Diet: </Heading>
            <Wrap>{renderTags(flatDietLabel, "cyan", "diet")}</Wrap>
          </>
        )}
        {flatCautions.length > 0 && (
          <>
            <Heading>Cautions: </Heading>
            <Wrap>{renderTags(flatCautions, "red", "cautions")}</Wrap>
          </>
        )}
        {flatMealType.length > 0 && (
          <>
            <Heading>Meal Type: </Heading>
            <Wrap>{renderTags(flatMealType, "purple", "Meal-Type")}</Wrap>
          </>
        )}
        {healthLabelTag.length > 0 && (
          <>
            <Heading>Health:</Heading>
            <Wrap>{renderTags(healthLabelTag, "green", "Health")}</Wrap>
          </>
        )}
      </Card.Body>
    </Card.Root>
  );
};
 */
