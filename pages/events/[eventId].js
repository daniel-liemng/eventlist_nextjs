// import { useRouter } from "next/router";
import Head from "next/head";

// import { getEventById } from "../../data";
import {
  getAllEvents,
  filterFeaturedEvents,
  getEventById,
} from "../../helpers/api-util";
import EventSummary from "../../components/event-details/EventSummary";
import EventLogistic from "../../components/event-details/EventLogistic";
import EventContent from "../../components/event-details/EventContent";
import ErrorAlert from "../../components/ui/ErrorAlert";
import Comments from "../../components/input/Comments";

export const getStaticPaths = async () => {
  // const events = await getAllEvents();
  const events = await filterFeaturedEvents();

  const paths = events.map((event) => {
    return { params: { eventId: event.id } };
  });

  return {
    paths,
    // fallback: false,
    // fallback: true,
    fallback: "blocking",
  };
};

export const getStaticProps = async (context) => {
  const eventId = context.params.eventId;

  const event = await getEventById(eventId);

  return {
    props: {
      event,
      // Re-generate page every 30 seconds -> not time to time
      revalidate: 30,
    },
  };
};

const EventsDetail = ({ event }) => {
  // const router = useRouter();

  // const eventId = router.query.eventId;

  if (!event) {
    return (
      <ErrorAlert>
        <h3>No event found!</h3>
      </ErrorAlert>
    );
  }

  const { id, title, description, image, date, location } = event;

  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta name='description' content={event.description} />
      </Head>
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
      <Comments eventId={id} />
    </>
  );
};

export default EventsDetail;
