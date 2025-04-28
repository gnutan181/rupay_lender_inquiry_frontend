import { BrowserRouter } from "react-router-dom";
import Routers from "./routes";
// import SearchProvider from "./context/SearchProvider";
const App = () => {
  return (
 

      <BrowserRouter>
        <Routers />
      </BrowserRouter>
  
  );
};

export default App;
