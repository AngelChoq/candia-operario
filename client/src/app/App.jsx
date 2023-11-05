import { CssBaseline } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import { MatxTheme } from './components';
import { AuthProvider } from './contexts/JWTAuthContext';
// import { InsumoContextProvider } from "../context/InsumoProvider";
import { SettingsProvider } from './contexts/SettingsContext';
import routes from './routes';
import '../fake-db';

const App = () => {
  const content = useRoutes(routes);

  return (
    <SettingsProvider>
      <AuthProvider>
        {/* <InsumoContextProvider> */}
        <MatxTheme>
          <CssBaseline />
          {content}
        </MatxTheme>
        {/* </InsumoContextProvider> */}
      </AuthProvider>
    </SettingsProvider>
  );
};

export default App;
