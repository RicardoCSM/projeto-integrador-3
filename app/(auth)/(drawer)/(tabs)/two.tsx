import { Stack } from 'expo-router';

import { Container } from '~/components/layouts/container';
import { Text } from '~/components/nativewindui/Text';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Página 2' }} />
      <Container>
        <Text>Página 2</Text>
      </Container>
    </>
  );
}
