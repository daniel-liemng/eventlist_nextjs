// import { getFeaturedEvents } from "../data";
import { filterFeaturedEvents } from "../helpers/api-util";
import EventList from "../components/events/EventList";

export const getStaticProps = async () => {
  const featuredEvents = await filterFeaturedEvents();

  return {
    props: {
      featuredEvents,
      // Re-generate page every 30 mins -> not time to time
      revalidate: 1800,
    },
  };
};

const HomePage = ({ featuredEvents }) => {
  // const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <EventList events={featuredEvents} />
    </div>
  );
};

export default HomePage;
