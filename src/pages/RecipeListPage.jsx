// import { Center, Heading } from '@chakra-ui/react';
import { CardRecipe } from "@/components/CardRecipe";
import { data } from "../utils/data";
import { Center, Flex, Heading, Wrap, WrapItem, SimpleGrid } from "@chakra-ui/react";

export const RecipeListPage = () => {
  const food = data.hits;
  const arrayCards = [];
  food.forEach((e) => {
    arrayCards.push(
      <WrapItem>
        <CardRecipe food={[e]} />
      </WrapItem>
    );
  })
  console.log(arrayCards);
  return (
    <>
      <Center>
        <Heading mb={8}>Your Recipe App</Heading>
      </Center>
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
        gap={6}
        justifyContent={"center"}>
        {arrayCards}
      </SimpleGrid>
    </>
  );
};


