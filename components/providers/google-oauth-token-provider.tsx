import { useUser } from '@clerk/clerk-expo';
import { useQuery } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { getGoogleOAuthToken } from '~/actions/auth';
import { Text } from '~/components/nativewindui/Text';
import { useGoogleOAuthToken } from '~/store/useGoogleOAuthToken';

interface GoogleOAuthTokenProviderProps {
  children: ReactNode;
}

export function GoogleOAuthTokenProvider({ children }: GoogleOAuthTokenProviderProps) {
  const { user } = useUser();
  const { setGoogleOAuthToken, removeGoogleOAuthToken } = useGoogleOAuthToken();
  const { isPending, error } = useQuery({
    queryKey: ['token'],
    queryFn: async () => {
      const token = await getGoogleOAuthToken(user?.id || '');
      if (token) {
        setGoogleOAuthToken(token);
      } else {
        removeGoogleOAuthToken();
      }

      return token;
    },
  });

  if (isPending) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>{error.message || 'An error occurred'}</Text>;
  }

  return <>{children}</>;
}
