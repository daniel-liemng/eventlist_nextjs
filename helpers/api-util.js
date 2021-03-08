// Get all events
export const getAllEvents = async () => {
  const res = await fetch(
    "https://marioplan-react-c1314.firebaseio.com/events.json"
  );

  const data = await res.json();

  const formattedData = [];

  for (const key in data) {
    formattedData.push({
      id: key,
      ...data[key],
      // title: data[key].title,
      // description: data[key].description,
      // date: data[key].date,
      // location: data[key].location,
      // image: data[key].image,
      // isFeatured: data[key].isFeatured,
    });
  }

  return formattedData;
};

// Get featured events
export const filterFeaturedEvents = async () => {
  const allEvents = await getAllEvents();

  return allEvents.filter((event) => event.isFeatured);
};

// Get event by ID
export const getEventById = async (id) => {
  const allEvents = await getAllEvents();

  return allEvents.find((event) => event.id === id);
};
