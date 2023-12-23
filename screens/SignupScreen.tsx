import { useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { signup } from '../util/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Alert } from 'react-native';
import { useAuth } from '../store/auth-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App';

type SignupScreenProps = NativeStackScreenProps<RootStackParamList, 'Signup'>

function SignupScreen(props: SignupScreenProps) {

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const { authenticate } = useAuth();
  

  const signupHandler = async ({ email, password }: { email: string, password: string }) => {
    
    try {

      setIsAuthenticating(true);

      const { token } = await signup(email, password);

      authenticate(token);
      
    // Store the Token and change to the Welcome String
      
    } catch (error: any) {
      Alert.alert('Signup failed!', error.message) 
    }    

    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message='Creating user...' />
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
