import { Stack } from 'expo-router';

import { Container } from '~/components/layouts/container';
import { Text } from '~/components/nativewindui/Text';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Página 1' }} />
      <Container>
        <Text>Página 1</Text>
      </Container>
    </>
  );
}
