import { BrowserRouter } from "react-router-dom";
import Routers from "./routes";
import SearchProvider from "./context/SearchProvider";
const App = () => {
  return (
    <SearchProvider>
      <BrowserRouter>
        <Routers />
      </BrowserRouter>
    </SearchProvider>
  );
};

export default App;
