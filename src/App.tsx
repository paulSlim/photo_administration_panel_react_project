import * as React from "react";

import FlexSearch from "./component/FlexSearch";
import Header from "./component/Header";
import Main from "./component/Main";
import StoreProvider from "./store/StoreProvider";
import "./App.scss";

const App = (): React.ReactNode => (
  <StoreProvider>
    <Header />
    <FlexSearch />
    <Main />
  </StoreProvider>
);

export default App;
