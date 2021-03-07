import classes from "../../styles/ErrorAlert.module.css";

const ErrorAlert = ({ children }) => {
  return <div className={classes.alert}>{children}</div>;
};

export default ErrorAlert;
