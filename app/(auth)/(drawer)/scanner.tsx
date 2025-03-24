import { Stack } from 'expo-router';
import { Container } from '~/components/layouts/container';
import { ThemeToggle } from '~/components/theme-toggle';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import { ToastAndroid, View } from 'react-native';
import { Text } from '~/components/nativewindui/Text';
import { useEffect } from 'react';

export default function Scanner() {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: (codes) => {
      ToastAndroid.show(codes[0].value || '', ToastAndroid.SHORT);
    },
  });

  if (device == null) {
    return (
      <View>
        <Text>Nenhum dispositivo com câmera encontrado!</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Scanner', headerRight: () => <ThemeToggle /> }} />
      <Container>
        {hasPermission ? (
          <Camera isActive device={device} style={{ flex: 1 }} codeScanner={codeScanner} />
        ) : (
          <View>
            <Text>A permissão da câmera é necessária para usar o scanner.</Text>
          </View>
        )}
      </Container>
    </>
  );
}
