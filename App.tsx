
import 'react-native-gesture-handler';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { Routes } from './routes';
import { AuthProvider } from './src/auth/authProvider'

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <PaperProvider>
          <Routes />
        </PaperProvider>
      </AuthProvider>
    </NavigationContainer>
  );
};


export default App;
