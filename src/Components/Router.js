import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import Auth from "../Routes/Auth";
import Explore from "../Routes/Explore";
import Feed from "../Routes/Feed";
import Post from "../Routes/Post";
import Profile from "../Routes/Profile";
import Header from "./Header";
import Search from "./Search";

const LoggedInRoutes = () => {
  return (
    <>
      <Header />
      <Route exact path="/:username/" component={Profile} />
      <Route exact path="/" component={Feed} />
      <Route path="/explore/" component={Explore} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/p/:postId/" component={Post} />
    </>
  );
};
const LoggedOutRoutes = () => {
  return (
    <>
      <Route exact path="/" component={Auth} />
    </>
  );
};
const AppRouter = ({ isLoggedIn }) => {
  return (
    <Switch>{isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}</Switch>
  );
};

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default AppRouter;
