import { DripsyProvider } from 'dripsy';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { theme } from './theme';


export default function App() {
  return (
    <DripsyProvider theme={theme}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </DripsyProvider>
  );
}