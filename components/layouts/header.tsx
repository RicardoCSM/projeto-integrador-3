import { View } from 'react-native';
import { ThemeToggle } from '../theme-toggle';
import { SignOutButton } from './sign-out-button';

export const Header = () => {
  return (
    <View className="flex flex-row gap-2">
      <SignOutButton />
      <ThemeToggle />
    </View>
  );
};
