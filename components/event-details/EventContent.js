import classes from "../../styles/EventContent.module.css";

const EventContent = ({ children }) => {
  return <section className={classes.content}>{children}</section>;
};

export default EventContent;
