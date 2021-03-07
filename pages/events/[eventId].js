import { useRouter } from "next/router";

import { getEventById } from "../../data";
import EventSummary from "../../components/event-details/EventSummary";
import EventLogistic from "../../components/event-details/EventLogistic";
import EventContent from "../../components/event-details/EventContent";
import ErrorAlert from "../../components/ui/ErrorAlert";

const EventsDetail = () => {
  const router = useRouter();

  const eventId = router.query.eventId;

  const event = getEventById(eventId);

  if (!event) {
    return (
      <ErrorAlert>
        <h3>No event found!</h3>
      </ErrorAlert>
    );
  }

  const { title, description, image, date, location } = event;

  return (
    <>
      <EventSummary title={title} />
      <EventLogistic
        date={date}
        address={location}
        image={image}
        imageAlt={title}
      />
      <EventContent>
        <p>{description}</p>
      </EventContent>
    </>
  );
};

export default EventsDetail;
