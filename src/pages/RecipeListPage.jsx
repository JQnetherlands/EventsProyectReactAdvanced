// import { Center, Heading } from '@chakra-ui/react';
import { CardRecipe } from "@/components/CardRecipe";
import { data } from "../utils/data";
import { Center, Flex, Heading } from "@chakra-ui/react";

export const RecipeListPage = () => {
  // You can play around with the console log, but ultimately remove it once you are done
  // const twentyRecipesName = data.hits;
  // twentyRecipesName.forEach(element => {console.log(element.recipe);});
  // console.log("twentyRecipesName", twentyRecipesName.recipe);
  // for (const [
  //   character1,
  //   character2,
  //   character3,
  //   character4,
  //   character5,
  // ] of Object.keys(data.hits[0].recipe)) {
  //   console.log(
  //     "For of loop",
  //     character1,
  //     character2,
  //     character3,
  //     character4,
  //     character5
  //   );
  // }

  const food = data.hits;
  const arrayCards = [];
  food.forEach((e) => {
    arrayCards.push(<CardRecipe food={[e]} />)
  })
  console.log(arrayCards);
  return (
    <>
      <Center>
        <Heading mb={8}>Your Recipe App</Heading>
      </Center>
      <Flex width={"100%"} gap={4} wrap={"wrap"} justify={"center"} alignItems={"center"} flexDirection={{ b: "column", md: "row"}}>
        {arrayCards}
      </Flex>
    </>
  );
};

// <Center h="100vh" flexDir="column">
//   <Heading>Your Recipe App</Heading>
// </Center>;
