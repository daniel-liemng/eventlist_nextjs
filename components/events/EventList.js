import classes from "../../styles/EventList.module.css";

import EventItem from "./EventItem";

const EventList = ({ events }) => {
  return (
    <ul className={classes.list}>
      {events.map((item) => (
        <EventItem key={item.id} event={item} />
      ))}
    </ul>
  );
};

export default EventList;
