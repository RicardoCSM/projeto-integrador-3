import { useClerk } from '@clerk/clerk-expo';
import { Icon } from '@roninoss/icons';
import { Pressable, View } from 'react-native';
import { useColorScheme } from '~/hooks/useColorScheme';
import { COLORS } from '~/theme/colors';

export const SignOutButton = () => {
  const { colorScheme } = useColorScheme();
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <Pressable onPress={handleSignOut}>
      <View className="px-2">
        <Icon
          namingScheme="sfSymbol"
          name="rectangle.portrait.and.arrow.right"
          color={colorScheme === 'dark' ? COLORS.white : COLORS.black}
        />
      </View>
    </Pressable>
  );
};
