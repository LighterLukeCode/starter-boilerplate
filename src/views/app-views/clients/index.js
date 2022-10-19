import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from "components/shared-components/Loading";
import EditProfile from "./clients-list/EditProfile";

const Clients = ({ match }) => (
  <Suspense fallback={<Loading cover="content" />}>
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/clients-list`} />
      <Route path={`${match.url}/edit-profile`} component={EditProfile} />

      <Route path={`${match.url}/clients-list`} component={lazy(() => import(`./clients-list`))} />
    </Switch>
  </Suspense>
);

export default Clients;
