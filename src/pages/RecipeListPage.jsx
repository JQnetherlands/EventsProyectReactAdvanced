// import { Center, Heading } from '@chakra-ui/react';
import { CardRecipe } from "@/components/CardRecipe";
import { data } from "../utils/data";
import { Center, Flex, Heading, Wrap, WrapItem, SimpleGrid } from "@chakra-ui/react";
import { TextInput } from "@/components/TextInput";
import { useState } from "react";

export const RecipeListPage = ({clickFn}) => {
  const [searchField, setSearchfield] = useState("");
  const food = data.hits;
  const matchFood = food.filter((e) => {
    return (
      e.recipe.label.toLowerCase().includes(searchField.toLowerCase()) ||
      e.recipe.healthLabels.some(label => label.toLowerCase().includes(searchField.toLowerCase()))
    )
  });

  console.log("matchFood", matchFood);

  const arrayCards = [];
  matchFood.forEach((e) => {
    const key = e.recipe.label;
    console.log("key", key);
    arrayCards.push(
      <CardRecipe key={key} food={[e]} clickFn={clickFn} /> // [e] is necessary to render, 
    );
  });

  const handleChange = (event) => {
    setSearchfield(event.target.value);
  };
  console.log("arrayCards", arrayCards);
  return (
    <>
      <Center>
        <Heading mb={8}>Your Recipe App</Heading>
      </Center>
      <Center>
        <TextInput changeFn={handleChange} mb={8} />
      </Center>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }} gap={20}>
        {arrayCards}
      </SimpleGrid>
    </>
  );
};


