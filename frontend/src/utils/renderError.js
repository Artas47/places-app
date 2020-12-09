import React from "react";
import _ from "lodash";

export const renderError = (errors) => {
  if (!_.isEmpty(errors)) {
    return Object.keys(errors).map((key, i) => {
      return <p>{errors[key].message}</p>;
    });
  }
};
