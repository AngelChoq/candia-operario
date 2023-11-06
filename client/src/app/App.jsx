import { CssBaseline } from "@mui/material";
import { useRoutes } from "react-router-dom";
import { MatxTheme } from "./components";
// import { AuthProvider } from './contexts/JWTAuthContext';
import { RecetaContextProvider } from "../context/RecetaProvider";
import { InsumoContextProvider } from "../context/InsumoProvider";
import { SettingsProvider } from "./contexts/SettingsContext";
import routes from "./routes";
import "../fake-db";

const App = () => {
  const content = useRoutes(routes);

  return (
    <SettingsProvider>
      {/* <AuthProvider> */}
      <RecetaContextProvider>
        <InsumoContextProvider>
          <MatxTheme>
            <CssBaseline />
            {content}
          </MatxTheme>
        </InsumoContextProvider>
      </RecetaContextProvider>
      {/* </AuthProvider> */}
    </SettingsProvider>
  );
};

export default App;
