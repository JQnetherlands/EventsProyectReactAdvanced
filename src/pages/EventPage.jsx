import { useParams, useLoaderData } from 'react-router-dom';
import { Heading, Box, Text, AspectRatio, Image, VStack } from '@chakra-ui/react';

export const loader = async ({ params }) => {
  const [eventRes, categoriesRes] = await Promise.all([
    fetch(`http://localhost:3000/events/${params.eventId}`),
    fetch(`http://localhost:3000/categories`),
  ]);

  const [event, categories] = await Promise.all([
    eventRes.json(),
    categoriesRes.json()
  ])

  const eventCategories = event.categoryIds.map(id => {
    const category = categories.find(categoryObject => id === categoryObject.id).name;
    return category
  });

  return { ...event, eventCategories };
};

  

export const EventPage = () => {
  const event = useLoaderData();
  console.log(event)
  return (
    <VStack w={"full"} maxW={"720px"} mx={"auto"} p={4} gap={4}>
      <Heading>{event.title}</Heading>
      <AspectRatio ratio={16 / 9} w={"full"}>
        <Image src={event.image} alt={event.title} />
      </AspectRatio>
      <Text>{event.description}</Text>
      <Text fontSize={"sm"} color={"gray.500"} >
        Start:{" "}
        {new Date(event.startTime).toLocaleString(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        })}
      </Text>
      <Text fontSize={"sm"} color={"gray.500"}>
        End: {" "}
        {new Date(event.endTime).toLocaleString(undefined, {
          dateStyle: "medium",
          timeStyle: "short"
        })}
      </Text>
      <Text fontSize={"sm"} color={"gray.600"}>
        Categories: {event.eventCategories.join(", ")}
      </Text>
    </VStack>
  );
};
