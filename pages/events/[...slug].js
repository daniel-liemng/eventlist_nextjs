import { useRouter } from "next/router";

import { getFilteredEvents } from "../../data";
import EventList from "../../components/events/EventList";
import ResultTitle from "../../components/events/ResultTitle";
import Button from "../../components/ui/Button";
import ErrorAlert from "../../components/ui/ErrorAlert";

const Filter = () => {
  const router = useRouter();

  const filterData = router.query.slug;

  if (!filterData) {
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
    numMonth > 12
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

  const filteredEvents = getFilteredEvents({ year: numYear, month: numMonth });

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

  return (
    <>
      <ResultTitle date={date} />
      <EventList events={filteredEvents} />
    </>
  );
};

export default Filter;
