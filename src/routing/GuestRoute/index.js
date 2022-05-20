import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";

const GuestRoute = (props) => {
  const { layout: Layout, component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  );
};

GuestRoute.propTypes = {
  layout: PropTypes.any,
  path: PropTypes.string.isRequired,
  component: PropTypes.any,
};

export default GuestRoute;
