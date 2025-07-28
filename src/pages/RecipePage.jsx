import {
  Tag,
  Card,
  Image,
  Button,
  Center,
  Wrap,
  Text,
  Heading,
  WrapItem,
  Grid,
  GridItem,
} from "@chakra-ui/react";

export const RecipePage = ({ items, clickFn }) => {
  const getLabels = (array, key) => array.map((el) => el.recipe[key]);

  const totalNutrients = [
    "ENERC_KCAL",
    "CHOCDF",
    "CHOLE",
    "FAT",
    "NA",
    "PROCNT",
  ];

  const getTotalNutrientsLabels = (array) => {
    const totalNutrientsObject = array.map((el) => el.recipe.totalNutrients);
    return totalNutrients.map((key) => totalNutrientsObject[0][key]);
  };

  const dietLabelsRaw = getLabels(items, "dietLabels");
  const cautionsRaw = getLabels(items, "cautions");
  const mealTypeRaw = getLabels(items, "mealType");
  const dishTypeRaw = getLabels(items, "dishType");
  const healthLabelsRaw = getLabels(items, "healthLabels");
  const totalNutrientsRaw = getTotalNutrientsLabels(items);

  const dietLabelsClean = dietLabelsRaw.filter((e) => e.length > 0);
  const cautionsClean = cautionsRaw.filter((e) => e.length > 0);

  const flatter = (array) => array.reduce((acc, curr) => acc.concat(curr), []);

  const flatDishType = flatter(dishTypeRaw);
  const flatDiet = flatter(dietLabelsClean);
  const flatCautions = flatter(cautionsClean);
  const flatMealType = flatter(mealTypeRaw);
  const flatHealth = flatter(healthLabelsRaw);

  const renderTags = (data, color, prefix) =>
    data.map((label) => (
      <WrapItem key={`${prefix}-${label}`}>
        <Tag.Root size="lg" colorPalette={color}>
          <Tag.Label>{label}</Tag.Label>
        </Tag.Root>
      </WrapItem>
    ));

  const renderTotalNutrients = (data) => (
    <Grid templateColumns={{ base: "1fr", sm: "100px 1fr" }} gap={2}>
      {data.map((e, i) => (
        <>
          <GridItem key={`qty-${i}`}>{e.quantity.toFixed(0)} {e.unit}</GridItem>
          <GridItem key={`label-${i}`}>{e.label}</GridItem>
        </>
      ))}
    </Grid>
  );

  const item = items[0].recipe;

  return (
    <Center p={{ base: 4, md: 6 }}>
      <Wrap justify="center" w="100%" maxW="container.md" spacing={4}>
        <Button
          onClick={() => clickFn()}
          position="absolute"
          top="12px"
          left="12px"
          zIndex="10"
          size="sm"
          variant="ghost"
          bg="whiteAlpha.700"
          _hover={{ bg: "whiteAlpha.900" }}
          background={"black"}
        >
          ← Back
        </Button>
        <Card.Root
          w="100%"
          boxShadow="xl"
          borderRadius="xl"
          overflow="hidden"
          p={{ base: 4, md: 6 }}
          position="relative"
        >
          <Card.Body display="flex" flexDirection="column" gap={4}>
            <Image
              src={item.image}
              alt={item.label}
              width="100%"
              height={{ base: "200px", md: "300px" }}
              objectFit="cover"
              borderRadius="md"
            />
            <Card.Title textAlign="center" fontSize="2xl" mb={4}>
              {item.label}
            </Card.Title>

            {flatDishType.length > 0 && (
              <>
                <Heading size="md">Dish Type</Heading>
                <Wrap spacing={{ base: 2, md: 4 }}>
                  {renderTags(flatDishType, "yellow", "dishType")}
                </Wrap>
              </>
            )}

            <Text>Total cooking Time: {item.totalTime} minutes</Text>
            <Text>Servings: {item.yield}</Text>

            <Heading size="md" mt={4}>
              Ingredients
            </Heading>
            <Text whiteSpace="pre-wrap">{item.ingredientLines.join("\n")}</Text>

            {flatDiet.length > 0 && (
              <>
                <Heading size="md">Diet</Heading>
                <Wrap spacing={{ base: 2, md: 4 }}>
                  {renderTags(flatDiet, "cyan", "diet")}
                </Wrap>
              </>
            )}

            {flatCautions.length > 0 && (
              <>
                <Heading size="md">Cautions</Heading>
                <Wrap spacing={{ base: 2, md: 4 }}>
                  {renderTags(flatCautions, "red", "cautions")}
                </Wrap>
              </>
            )}

            {flatMealType.length > 0 && (
              <>
                <Heading size="md">Meal Type</Heading>
                <Wrap spacing={{ base: 2, md: 4 }}>
                  {renderTags(flatMealType, "purple", "mealType")}
                </Wrap>
              </>
            )}

            {flatHealth.length > 0 && (
              <>
                <Heading size="md">Health</Heading>
                <Wrap spacing={{ base: 2, md: 4 }}>
                  {renderTags(flatHealth, "green", "health")}
                </Wrap>
              </>
            )}

            {totalNutrientsRaw.length > 0 && (
              <>
                <Heading size="md">Total Nutrients</Heading>
                {renderTotalNutrients(totalNutrientsRaw)}
              </>
            )}
          </Card.Body>
        </Card.Root>
      </Wrap>
    </Center>
  );
};
