import { Card, Image, Tag } from "@chakra-ui/react";

export const CardRecipe = ({ food }) => {
  console.log(food);
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
    const key = "dietLabelsTags: " + food[0].recipe.label;
    console.log(key)
    return (
      <Tag.Root key={key}>
        <Tag.Label>{tag}</Tag.Label>
      </Tag.Root>
    );
  });
  const cautionsLabelsTags = flatCautions.map((element) => {
    const key = "cautionsLabelsTags: " + element;
    console.log(key)
    return (
      <Tag.Root key={key}>
        <Tag.Label>{element}</Tag.Label>
      </Tag.Root>
    );
  });
  const mealTypeLabelTags = flatMealType.map((element) => {
    const key = "mealTypeLabelTags: " + food[0].recipe.label;
    console.log(key)
    return (
      <Tag.Root key={key}>
        <Tag.Label>{element}</Tag.Label>
      </Tag.Root>
    );
  });

  const dishTypeLabelTags = flatDishTypeRaw.map((element) => {
    const key = "dishTypeLabelTags: " + food[0].recipe.label;
    console.log(key)
    return (
      <Tag.Root key={key}>
        <Tag.Label>{element}</Tag.Label>
      </Tag.Root>
    );
  });

  return (
    <Card.Root width={{ b: "100%", md: "25%", lg: "20%"}}>
      <Card.Body gap={4}>
        <Image
          src={food[0].recipe.image}
          alt={food[0].recipe.label}
          width={"100%"}
          height={"auto"}
        />
        <Card.Title>{food[0].recipe.label}</Card.Title>
        {dietLabelsTags}
        {cautionsLabelsTags}
        {mealTypeLabelTags}
        {dishTypeLabelTags}
      </Card.Body>
    </Card.Root>
  );
};

