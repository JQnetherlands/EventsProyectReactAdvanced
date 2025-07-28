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
} from "@chakra-ui/react";

export const RecipePage = ({ items, clickFn }) => {
  console.log("item", items);

  const getLabels = function (array, key) {
    return array.map((element) => {
      return element.recipe[key]
    })
  };
  const dietLabelsRaw = getLabels(items, "dietLabels");
  const cautionsRaw = getLabels(items, "cautions");
  const mealTypeRaw = getLabels(items, "mealType");
  const dishTypeRaw = getLabels(items, "dishType");
  const healthLabelsRaw = getLabels(items, "healthLabels");

  const dietLabelsCleanNonFlat = dietLabelsRaw.filter((e) => e.length > 0); 
  const cautionsCleanNonFlat = cautionsRaw.filter((e) => e.length > 0); 

  const flatter = function (array) {
    return array.reduce((acc, current) => {
      return acc.concat(current);
    }, [])
  };

  const flatDishTypeRaw = flatter(dishTypeRaw);
  const flatDietLabel = flatter(dietLabelsCleanNonFlat);
  const flatCautions = flatter(cautionsCleanNonFlat);
  const flatMealType = flatter(mealTypeRaw);
  const flatHealthLabels = flatter(healthLabelsRaw)

  const renderTags = function (data, color, prefix) {
    return data.map((label) => {
      return (
        <WrapItem key={`${prefix}-${label}`}>
          <Tag.Root size={"lg"} colorPalette={color}>
            <Tag.Label>{label}</Tag.Label>
          </Tag.Root>
        </WrapItem>)
    });
  }; 

  const item = items[0].recipe;

  return (
    <Center p={6}>
      <Wrap justify={"center"} w={"100%"}>
        <Card.Root
          width={"100%"}
          height={"100%"}
          boxShadow={"xl"}
          borderRadius={"xl"}
          overflow={"hidden"}
          mb={4}
          p={6}
        >
          <Card.Body gap={4} display={"flex"} flexDirection={"column"}>
            <Image
              src={item.image}
              alt={item.label}
              width={"100%"}
              height={"300px"}
              objectFit={"cover"}
            />
            <Card.Title textAlign={"center"} fontSize={"2xl"} mb={4}>
              {item.label}
            </Card.Title>
            {flatDishTypeRaw.length > 0 && <Heading>Dish Type </Heading>}
            <Wrap>{renderTags(flatDishTypeRaw, "yellow", "dishType")}</Wrap>
            <Text>Total cooking Time: {item.totalTime} minutes</Text>
            <Text>Servings: {item.yield}</Text>
            <Heading mt={4}>Ingredients:</Heading>
            <Text whiteSpace={"pre-wrap"}>
              {item.ingredientLines.join("\n")}
            </Text>
            {flatDietLabel.length > 0 && (
              <>
                <Heading>Diet: </Heading>
                <Wrap>{renderTags(flatDietLabel, "cyan", "Diet")}</Wrap>
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
                <Heading>Meal type: </Heading>
                <Wrap>{renderTags(flatMealType, "purple", "meal Type")}</Wrap>
              </>
            )}
            {flatHealthLabels.length > 0 && (
              <>
                <Heading>Health: </Heading>
                <Wrap>{renderTags(flatHealthLabels, "green", "health")}</Wrap>
              </>
            )}
          </Card.Body>
        </Card.Root>
        <Button onClick={() => clickFn()}>Back Button</Button>
      </Wrap>
    </Center>
  );
};


