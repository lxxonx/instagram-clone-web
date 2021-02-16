import PropTypes from "prop-types";
import { Redirect, Route, Switch } from "react-router-dom";
import Post from "../Routes/Post";
import Auth from "../Routes/Auth";
import Direct from "../Routes/Direct";
import EditProfile from "../Routes/EditProfile";
import Explore from "../Routes/Explore";
import Feed from "../Routes/Feed";
import Profile from "../Routes/Profile";
import FeedActions from "./FeedActions";
import Header from "./Header";

const LoggedInRoutes = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Feed} />
        <Route path="/t/test" component={FeedActions} />
        <Route path="/explore" component={Explore} />
        <Route path="/direct" component={Direct} />
        <Route path="/p/:postId/" component={Post} />
        <Route path="/account" component={EditProfile} />
        <Route path="/:username" component={Profile} />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  );
};
const LoggedOutRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Auth} />
      <Redirect from="*" to="/" />
    </Switch>
  );
};
const AppRouter = ({ isLoggedIn }) => {
  return <>{isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}</>;
};

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default AppRouter;
