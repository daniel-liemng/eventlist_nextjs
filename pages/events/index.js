import { useRouter } from "next/router";

// import { getAllEvents } from "../../data";
import { getAllEvents } from "../../helpers/api-util";
import EventList from "../../components/events/EventList";
import EventsSearch from "../../components/events/EventsSearch";

export const getStaticProps = async () => {
  const events = await getAllEvents();

  return {
    props: {
      events,
      // Re-generate page every 60 seconds -> not time to time
      revalidate: 60,
    },
  };
};

const EventsPage = ({ events }) => {
  // const events = getAllEvents();

  const router = useRouter();

  const findEventHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  };

  return (
    <>
      <EventsSearch onSearch={findEventHandler} />
      <EventList events={events} />
    </>
  );
};

export default EventsPage;
