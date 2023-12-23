import { useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { login } from '../util/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Alert } from 'react-native';
import { RootStackParamList } from '../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuth } from '../store/auth-context';

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>

function LoginScreen(props: LoginScreenProps) {

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const { authenticate } = useAuth();

  const loginHandler = async ({ email, password }: { email: string, password: string }) => {
    
    try {

      setIsAuthenticating(true);
    const { token } = await login(email, password);

    // Store the Token and change to the Welcome String

    authenticate(token);
              
    } catch (error: any) {
      
      Alert.alert('Authentication Failed!', error.message)
    }
    
    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message='Loggin in...' />
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
