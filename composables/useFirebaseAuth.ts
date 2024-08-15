import { createUserWithEmailAndPassword } from 'firebase/auth';
import type { Auth, User } from 'firebase/auth';

export default function useFirebaseAuth() {
  const { $auth } = useNuxtApp();

  const user = useState<User | null>('user', () => null);

  const registerUser = async (
    email: string,
    password: string,
  ): Promise<boolean> => {
    try {
      const response = await createUserWithEmailAndPassword(
        $auth as Auth,
        email,
        password,
      );
      if (response) {
        user.value = response.user;
        return true;
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        // handle error
      }
      return false;
    }
    return false;
  };

  return {
    user,
    registerUser,
  };
}
