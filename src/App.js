import Rute from "./Rute";

import { Helmet, HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
      <Rute />
    </HelmetProvider>
  );
}

export default App;

