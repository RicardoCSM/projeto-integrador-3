import { Stack } from 'expo-router';

import { Container } from '~/components/container';
import { Text } from '~/components/nativewindui/Text';

export default function Home() {
  return (
    <>
      <Stack.Screen
        options={{ title: 'Tab One' }}
      />
      <Container>
        <Text>Tab one</Text>
      </Container>
    </>
  );
}
