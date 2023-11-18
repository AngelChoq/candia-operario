import { CssBaseline } from "@mui/material";
import { useRoutes } from "react-router-dom";
import { MatxTheme } from "./components";
// import { AuthProvider } from './contexts/JWTAuthContext';
import { RecetaContextProvider } from "../context/RecetaProvider";
import { InsumoContextProvider } from "../context/InsumoProvider";
import { IngredienteContextProvider } from "../context/IngredienteProvider";
import { SettingsProvider } from "./contexts/SettingsContext";
import routes from "./routes";
import "../fake-db";
import { ProductoContextProvider } from "context/ProductoProvider";
import { UserContextProvider } from "context/UserProvider";

const App = () => {
  const content = useRoutes(routes);

  return (
    <SettingsProvider>
      {/* <AuthProvider> */}
      <UserContextProvider>
        <ProductoContextProvider>
          <RecetaContextProvider>
            <InsumoContextProvider>
              <IngredienteContextProvider>
                <MatxTheme>
                  <CssBaseline />
                  {content}
                </MatxTheme>
              </IngredienteContextProvider>
            </InsumoContextProvider>
          </RecetaContextProvider>
        </ProductoContextProvider>
      </UserContextProvider>
      {/* </AuthProvider> */}
    </SettingsProvider>
  );
};

export default App;
