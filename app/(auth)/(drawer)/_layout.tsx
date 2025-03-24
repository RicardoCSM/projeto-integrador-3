import { useAuth } from '@clerk/clerk-expo';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Redirect } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { Text } from '~/components/nativewindui/Text';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GoogleOAuthTokenProvider } from '~/components/providers/google-oauth-token-provider';

const queryClient = new QueryClient();

const DrawerLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <Text>Loading...</Text>;
  }

  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthTokenProvider>
        <Drawer>
          <Drawer.Screen
            name="index"
            options={{
              headerTitle: 'Estudantes',
              drawerLabel: 'Estudantes',
              drawerIcon: ({ size, color }) => (
                <Ionicons name="home-outline" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="scanner"
            options={{
              headerTitle: 'Scanner',
              drawerLabel: 'Scanner',
              drawerIcon: ({ size, color }) => (
                <Ionicons name="qr-code" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="create-student"
            options={{
              headerTitle: 'Inserir novo estudante',
              drawerLabel: 'Inserir novo estudante',
              drawerIcon: ({ size, color }) => (
                <MaterialIcons name="person-add" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="(tabs)"
            options={{
              headerTitle: 'Configurações',
              drawerLabel: 'Configurações',
              drawerIcon: ({ size, color }) => (
                <MaterialIcons name="border-bottom" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="edit-student"
            options={{
              drawerItemStyle: { display: 'none' },
            }}
          />
        </Drawer>
      </GoogleOAuthTokenProvider>
    </QueryClientProvider>
  );
};

export default DrawerLayout;
