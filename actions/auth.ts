import axios from 'axios';

export async function getGoogleOAuthToken(user_id: string): Promise<string> {
  try {
    const response = await axios.get(
      `https://api.clerk.dev/v1/users/${user_id}/oauth_access_tokens/oauth_google?limit=10&offset=0`,
      {
        headers: {
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_CLERK_SECRET_KEY!}`,
        },
      }
    );
    const token: string = response.data[0].token;
    return token;
  } catch (error) {
    throw new Error('Could not get token');
  }
}
