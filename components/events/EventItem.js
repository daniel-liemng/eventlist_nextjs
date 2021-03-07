import classes from "../../styles/EventItem.module.css";

import Button from "../ui/Button";
import DateIcon from "../icons/DateIcon";
import AddressIcon from "../icons/AddressIcon";
import RightArrowIcon from "../icons/RightArrowIcon";

const EventItem = ({ event }) => {
  const { id, title, date, location, image } = event;

  const formattedImage = `/${image}`;

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedAddress = location.replace(", ", "\n");

  const exploreLink = `/events/${id}`;

  return (
    <li className={classes.item}>
      <img src={formattedImage} alt={title} width='200' height='200' />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>

          <div className={classes.date}>
            <DateIcon className={classes.icon} />
            <time>{formattedDate}</time>
          </div>

          <div className={classes.address}>
            <AddressIcon className={classes.icon} />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <RightArrowIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
