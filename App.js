import React from 'react';
import AppNavigation from './navigation/appNavigation';
import {DarkModeProvider} from './theme/context';
import {AuthProvider} from './theme/AuthContext';

function App() {
  return (
    <DarkModeProvider>
      <AuthProvider>
        <AppNavigation />
      </AuthProvider>
    </DarkModeProvider>
  );
}
export default App;
