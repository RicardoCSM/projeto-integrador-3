import { Stack } from 'expo-router';

import { Container } from '~/components/container';
import { Text } from '~/components/nativewindui/Text';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tab Two' }} />
      <Container>
        <Text>Tab two</Text>
      </Container>
    </>
  );
}
