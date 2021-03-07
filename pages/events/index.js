import { useRouter } from "next/router";

import { getAllEvents } from "../../data";
import EventList from "../../components/events/EventList";
import EventsSearch from "../../components/events/EventsSearch";

const EventsPage = () => {
  const events = getAllEvents();

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
