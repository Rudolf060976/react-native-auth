import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { Colors } from './constants/styles';
import { AuthContextProvider, useAuth } from './store/auth-context';
import IconButton from './components/ui/IconButton';

export type RootStackParamList = {
	Signup: undefined
	Login: undefined
  Welcome: undefined
}


const Stack = createNativeStackNavigator<RootStackParamList>();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {

  const { authenticate } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => <IconButton icon='exit' color={tintColor} size={24} onPress={() => authenticate(null)}  />
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {

  const { isAuthenticated } = useAuth();

  return (
    
       <NavigationContainer>
        { isAuthenticated ? <AuthenticatedStack /> : <AuthStack />  }
      </NavigationContainer>
    
  );
}

export default function App() {
  return (
    <AuthContextProvider>
        <StatusBar style="light" />

        <Navigation />
      </AuthContextProvider>   
  );
}