import { LoginScreen } from './LoginScreen';
import { SignUpScreen } from './SignUpScreen';
import { createStackNavigator } from '@react-navigation/stack';

export enum AuthStackScreens {
  Login = 'Login',
  SignUp = 'SignUp',
}

export type AuthStackParamList = {
  [AuthStackScreens.Login]: undefined;
  [AuthStackScreens.SignUp]: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

export function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={AuthStackScreens.Login} component={LoginScreen} />
      <Stack.Screen name={AuthStackScreens.SignUp} component={SignUpScreen} />
    </Stack.Navigator>
  );
}
