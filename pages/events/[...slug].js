import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Head from "next/head";

// import { getFilteredEvents } from "../../data";
import {
  filterFeaturedEvents,
  getFilteredEvents,
} from "../../helpers/api-util";
import EventList from "../../components/events/EventList";
import ResultTitle from "../../components/events/ResultTitle";
import Button from "../../components/ui/Button";
import ErrorAlert from "../../components/ui/ErrorAlert";

// export const getServerSideProps = async (context) => {
//   const { params } = context;

//   // console.log("123", params);

//   const filterData = params.slug;

//   const filteredYear = filterData[0];
//   const filteredMonth = filterData[1];

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear < 2021 ||
//     numYear > 2030 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: { hasError: true },

//       // notFound: true,

//       // redirect: {
//       //   destination: "/error",
//       // },
//     };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         year: numYear,
//         month: numMonth,
//       },
//     },
//   };
// };

// const Filter = ({ events, date, hasError }) => {
const Filter = () => {
  const [loadedEvents, setLoadedEvents] = useState();

  const router = useRouter();

  const filterData = router.query.slug;

  // SWR Hook -> send request to Firebase for filtered events
  const { data, error } = useSWR(
    "https://marioplan-react-c1314.firebaseio.com/events.json"
  );

  // console.log("DDD", data);

  useEffect(() => {
    if (data) {
      const events = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }

      setLoadedEvents(events);
    }
  }, [data]);

  // if (!filterData) {
  //   return <p className='center'>Loading...</p>;
  // }

  if (!loadedEvents) {
    return <p className='center'>Loading...</p>;
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear < 2021 ||
    numYear > 2030 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
    // hasError
  ) {
    return (
      <div className='center'>
        <ErrorAlert>
          <h2>Invalid filter, please adjust your value!</h2>
        </ErrorAlert>
        <Button link='/events'>Show all events</Button>
      </div>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  // const filteredEvents = await getFilteredEvents({ year: numYear, month: numMonth });

  // const filteredEvents = events;

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <div className='center'>
        <ErrorAlert>
          <h2>No events found for the chosen filter!</h2>
        </ErrorAlert>
        <Button link='/events'>Show all events</Button>
      </div>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  // const newDate = new Date(date.year, date.month - 1);

  return (
    <>
      <Head>
        <title>Filtered Events</title>
        <meta
          name='description'
          content={`All events for ${numMonth}/${numYear}`}
        />
      </Head>
      <ResultTitle date={date} />
      <EventList events={filteredEvents} />
    </>
  );
};

export default Filter;
