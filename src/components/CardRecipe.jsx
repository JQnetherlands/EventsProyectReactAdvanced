import {
  Card,
  Image,
  Tag,
  Grid,
  GridItem,
  Heading,
  Box,
} from "@chakra-ui/react";

export const CardRecipe = ({ food, clickFn }) => {
  const getLabels = (array, key) => array.map((element) => element.recipe[key]);

  const flattenAndFilter = (arrays) =>
    arrays.filter((e) => e.length > 0).flat();

  const item = food[0].recipe;

  const flatDietLabel = flattenAndFilter(getLabels(food, "dietLabels"));
  const flatCautions = flattenAndFilter(getLabels(food, "cautions"));
  const flatMealType = flattenAndFilter(getLabels(food, "mealType"));
  const flatDishTypeRaw = flattenAndFilter(getLabels(food, "dishType"));
  const flatHealthLabels = flattenAndFilter(getLabels(food, "healthLabels"));

  const healthLabelTag = flatHealthLabels.filter(
    (e) => e === "Vegan" || e === "Vegetarian"
  );

  const renderGridTags = (data, color, prefix) =>
    data.map((label) => (
      <GridItem key={`${prefix}-${label}`}>
        <Tag.Root size="lg" colorPalette={color}>
          <Tag.Label>{label}</Tag.Label>
        </Tag.Root>
      </GridItem>
    ));

  const LabelGrid = ({ title, data, color, prefix }) => (
    <>
      <Heading size="sm">{title}</Heading>
      <Grid templateColumns="repeat(auto-fit, minmax(80px, auto))" gap={2}>
        {renderGridTags(data, color, prefix)}
      </Grid>
    </>
  );

  return (
    <Card.Root
      width="100%"
      minHeight="560px"
      boxShadow="xl"
      borderRadius="xl"
      overflow="hidden"
      onClick={() => clickFn(food)}
    >
      <Card.Body
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="center"
        gap={4}
        padding={4}
      >
        <Box width="100%" height="200px" overflow="hidden">
          <Image
            src={item.image}
            alt={item.label}
            width="100%"
            height="100%"
            objectFit="cover"
            objectPosition="center"
          />
        </Box>

        {flatDishTypeRaw.length > 0 && (
          <Grid templateColumns="repeat(2, auto)" gap={2}>
            {renderGridTags(flatDishTypeRaw, "white", "dishType")}
          </Grid>
        )}

        <Card.Title textAlign="center">{item.label}</Card.Title>

        {flatDietLabel.length > 0 && (
          <LabelGrid
            title="Diet:"
            data={flatDietLabel}
            color="cyan"
            prefix="diet"
          />
        )}
        {flatCautions.length > 0 && (
          <LabelGrid
            title="Cautions:"
            data={flatCautions}
            color="red"
            prefix="cautions"
          />
        )}
        {flatMealType.length > 0 && (
          <LabelGrid
            title="Meal Type:"
            data={flatMealType}
            color="purple"
            prefix="mealType"
          />
        )}
        {healthLabelTag.length > 0 && (
          <LabelGrid
            title="Health:"
            data={healthLabelTag}
            color="green"
            prefix="health"
          />
        )}
      </Card.Body>
    </Card.Root>
  );
};

 