import { Provider } from "jotai";
import * as React from "react";
import Generator from "../components/Generator";
import Sidebar from "../components/Sidebar";

import "tw-elements";

const IndexPage = () => {
  return (
    <Provider>
      <Sidebar />
      <Generator />
    </Provider>
  );
};

export default IndexPage;
