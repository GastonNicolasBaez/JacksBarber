import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles, theme } from './styles/GlobalStyles';
import styled from 'styled-components';

// Importar componentes
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

function App() {
  const [showHeroOnly, setShowHeroOnly] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <AppContainer>
          {!showHeroOnly && <Header />}
          
          <MainContent>
            <Routes>
              <Route path="/" element={<HomePage setShowHeroOnly={setShowHeroOnly} />} />
              {/* Rutas futuras pueden ir aquí */}
            </Routes>
          </MainContent>
          
          {!showHeroOnly && <Footer />}
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
}

export default App;