import { Stack, Redirect } from 'expo-router';
import * as React from 'react';
import { Container } from '~/components/layouts/container';
import StudentsList from '~/components/common/students/students-list';
import { useAuth } from '@clerk/clerk-expo';
import { Text } from '~/components/nativewindui/Text';
import { Header } from '~/components/layouts/header';

export default function Home() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <Text>Carregando...</Text>;
  }

  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Estudantes', headerRight: () => <Header /> }} />
      <Container>
        <StudentsList />
      </Container>
    </>
  );
}
