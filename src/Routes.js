import { Redirect } from "react-router-dom";
import { Switch } from "react-router-dom";
import { LoginLayout, SidebarLayout } from "./layouts";
import { HomePage, LoginPage } from "./pages";
import { GuestRoute } from "./routing";

const Routes = () => {
  return (
    <Switch>
      <Redirect from="/" to={"/home"} exact />
      <GuestRoute
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
    </Switch>
  );
};

export default Routes;
