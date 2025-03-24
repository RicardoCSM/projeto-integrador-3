import React, { useCallback, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { useSSO } from '@clerk/clerk-expo';
import { View } from 'react-native';
import { Redirect } from 'expo-router';
import { Container } from '~/components/layouts/container';
import { ThemeToggle } from '~/components/theme-toggle';
import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';
import { router } from 'expo-router';

export const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function Page() {
  useWarmUpBrowser();

  const { startSSOFlow } = useSSO();

  const onPress = useCallback(async () => {
    try {
      const redirectUri = AuthSession.makeRedirectUri();

      const response = await startSSOFlow({
        strategy: 'oauth_google',
        redirectUrl: redirectUri,
      });

      if (response.createdSessionId) {
        await response.setActive!({ session: response.createdSessionId });
        router.replace('/(auth)/(drawer)');
      } else {
        console.log('Sign in failed:', response);
      }
    } catch (err) {
      console.error('Error during SSO:', err);
    }
  }, []);

  return (
    <Container>
      <View className="absolute right-4 top-12">
        <ThemeToggle />
      </View>
      <View className="flex w-full flex-1 flex-col items-center justify-center">
        <Button onPress={onPress}>
          <Text>Fazer login com Google</Text>
        </Button>
      </View>
    </Container>
  );
}
