import classes from "../../styles/EventLogistic.module.css";
import AddressIcon from "../icons/AddressIcon";
import DateIcon from "../icons/DateIcon";
import LogisticItem from "./LogisticItem";

const EventLogistic = ({ date, address, image, imageAlt }) => {
  const formattedImage = `/${image}`;

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedAddress = address.replace(", ", "\n");

  return (
    <section className={classes.logistics}>
      <div className={classes.image}>
        <img src={formattedImage} alt={imageAlt} />
      </div>
      <ul className={classes.list}>
        <LogisticItem icon={DateIcon}>
          <time>{formattedDate}</time>
        </LogisticItem>
        <LogisticItem icon={AddressIcon}>
          <address>{formattedAddress}</address>
        </LogisticItem>
      </ul>
    </section>
  );
};

export default EventLogistic;
