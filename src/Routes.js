import { Redirect } from "react-router-dom";
import { Switch } from "react-router-dom";
import { LoginLayout, SidebarLayout } from "./layouts";
import { HomePage, LoginPage, SignupPage } from "./pages";
import { GuestRoute, UserRoute } from "./routing";

const Routes = () => {
  return (
    <Switch>
      <Redirect from="/" to={"/home"} exact />
      <UserRoute
        path="/home"
        exact
        layout={SidebarLayout}
        component={HomePage}
      />
      <GuestRoute
        path="/login"
        exact
        layout={LoginLayout}
        component={LoginPage}
      />
      <GuestRoute
        path="/signup"
        exact
        layout={LoginLayout}
        component={SignupPage}
      />
    </Switch>
  );
};

export default Routes;
