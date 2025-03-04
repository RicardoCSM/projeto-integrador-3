import { Stack } from 'expo-router';
import * as React from 'react';

import { Container } from '~/components/container';
import { ThemeToggle } from '~/components/theme-togle';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import StudentsList from '~/components/students-list';

const queryClient = new QueryClient();

export default function Home() {

  return (
    <>
      <Stack.Screen options={{ title: 'Home', headerRight: () => <ThemeToggle /> }} />
      <Container>
        <QueryClientProvider client={queryClient}>
          <StudentsList />
        </QueryClientProvider>
      </Container>
    </>
  );
}
