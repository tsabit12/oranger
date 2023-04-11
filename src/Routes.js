import { Redirect } from "react-router-dom";
import { Switch } from "react-router-dom";
import { LoginLayout, SidebarLayout } from "./layouts";
import {
  AddPks,
  BerkasPage,
  Estimasi,
  GeneratePage,
  HomePage,
  Interview,
  Kandidat,
  LoginPage,
  OfficePage,
  Pks,
  SignupPage,
} from "./pages";
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
      <UserRoute
        path="/kandidat"
        exact
        layout={SidebarLayout}
        component={Kandidat}
      />
      <UserRoute
        path="/kandidat/interview"
        exact
        layout={SidebarLayout}
        component={Interview}
      />
      <UserRoute
        path="/kandidat/pks/:id"
        exact
        layout={SidebarLayout}
        component={AddPks}
      />
      <UserRoute path="/pks" exact layout={SidebarLayout} component={Pks} />
      <UserRoute
        path="/estimasi"
        exact
        layout={SidebarLayout}
        component={Estimasi}
      />
      <UserRoute
        path="/referensi/berkas"
        exact
        layout={SidebarLayout}
        component={BerkasPage}
      />
      <UserRoute
        path="/referensi/office"
        exact
        layout={SidebarLayout}
        component={OfficePage}
      />
      <UserRoute
        path="/imbaljasa/generate"
        exact
        layout={SidebarLayout}
        component={GeneratePage}
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
