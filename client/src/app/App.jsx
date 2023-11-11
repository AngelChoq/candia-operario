import { CssBaseline } from "@mui/material";
import { useRoutes } from "react-router-dom";
import { MatxTheme } from "./components";
// import { AuthProvider } from './contexts/JWTAuthContext';
import { RecetaContextProvider } from "../context/RecetaProvider";
import { InsumoContextProvider } from "../context/InsumoProvider";
import { SettingsProvider } from "./contexts/SettingsContext";
import routes from "./routes";
import "../fake-db";
import { ProductoContextProvider } from "context/ProductoProvider";

const App = () => {
  const content = useRoutes(routes);

  return (
    <SettingsProvider>
      {/* <AuthProvider> */}
      <ProductoContextProvider>
      <RecetaContextProvider>
        <InsumoContextProvider>
          <MatxTheme>
            <CssBaseline />
            {content}
          </MatxTheme>
        </InsumoContextProvider>
      </RecetaContextProvider>
      </ProductoContextProvider>
      {/* </AuthProvider> */}
    </SettingsProvider>
  );
};

export default App;
