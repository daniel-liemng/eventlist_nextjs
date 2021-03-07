import classes from "../../styles/EventSummary.module.css";

const EventSummary = ({ title }) => {
  return (
    <section className={classes.summary}>
      <h1>{title}</h1>
    </section>
  );
};

export default EventSummary;
