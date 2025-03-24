import '../global.css';
import 'expo-dev-client';

import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo';
import { tokenCache } from '~/cache';
import { useColorScheme, useInitialAndroidBarSync } from '~/hooks/useColorScheme';
import { NAV_THEME } from '~/theme';

export {
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  useInitialAndroidBarSync();
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

  if (!publishableKey) {
    throw new Error(
      'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
    )
  }

  return (
    <>
      <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
        <ClerkLoaded>
          <StatusBar
            key={`root-status-bar-${isDarkColorScheme ? 'light' : 'dark'}`}
            style={isDarkColorScheme ? 'light' : 'dark'}
          />
          <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
              <ActionSheetProvider>
                <NavThemeProvider value={NAV_THEME[colorScheme]}>
                  <Stack screenOptions={SCREEN_OPTIONS}>
                    <Stack.Screen name="(auth)/sign-in" options={SIGN_IN_OPTIONS} />
                    <Stack.Screen name="(auth)/(drawer)" options={DRAWER_OPTIONS} />
                  </Stack>
                </NavThemeProvider>
              </ActionSheetProvider>
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </ClerkLoaded>
      </ClerkProvider>
    </>
  );
}

const SCREEN_OPTIONS = {
  animation: 'ios_from_right',
} as const;

const SIGN_IN_OPTIONS = {
  headerShown: false,
} as const;

const DRAWER_OPTIONS = {
  headerShown: false,
} as const;
