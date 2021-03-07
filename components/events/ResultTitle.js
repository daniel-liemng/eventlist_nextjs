import classes from "../../styles/ResultTtile.module.css";

import Button from "../ui/Button";

const ResultTitle = ({ date }) => {
  console.log("d", date);

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <section className={classes.title}>
      <h1>Events in {formattedDate}</h1>
      <Button link='/events'>Show all events</Button>
    </section>
  );
};

export default ResultTitle;
