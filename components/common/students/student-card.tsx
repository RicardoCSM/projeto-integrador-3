import { Icon } from '@roninoss/icons';
import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import { ToastAndroid, View } from 'react-native';
import { deleteStudent } from '~/actions/students';
import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';
import { useColorScheme } from '~/hooks/useColorScheme';
import { useGoogleOAuthToken } from '~/store/useGoogleOAuthToken';
import { useStudents } from '~/store/useStudents';
import { COLORS } from '~/theme/colors';
import { Student } from '~/types/student';

export default function StudentCard({ student }: { student: Student }) {
  const { colorScheme } = useColorScheme();
  const { googleOAuthToken } = useGoogleOAuthToken();
  const { removeStudent } = useStudents();
  const { mutateAsync, status } = useMutation({
    mutationFn: async () => {
      const range = `Página1!A${student.position}:B${student.position}`;
      await deleteStudent(googleOAuthToken || '', range);
    },
    onSuccess: () => {
      removeStudent(student);
      ToastAndroid.show('Estudante removido com sucesso', ToastAndroid.SHORT);
    },
    onError: (error: Error) => {
      console.error(error.message);
    },
  });

  const handleDelete = () => {
    mutateAsync();
  };

  return (
    <View className="px-4">
      <View className="gap-4 rounded-xl border border-border bg-card p-4 pb-6 shadow-sm shadow-black/10 dark:shadow-none">
        <Text className="text-center text-sm font-medium tracking-wider opacity-60">
          {student.name}
        </Text>
        <Text className="text-center text-lg font-semibold">{student.id}</Text>
        <View className="flex flex-row items-center justify-center gap-2">
          <Button
            variant="secondary"
            disabled={status === 'pending'}
            onPress={() => router.push(`/edit-student?student_id=${student.id}`)}>
            <Icon
              name="pencil"
              size={20}
              color={colorScheme === 'dark' ? COLORS.white : COLORS.black}
            />
          </Button>
          <Button className="bg-red-500" disabled={status === 'pending'} onPress={handleDelete}>
            <Icon name="trash-can" size={20} />
          </Button>
        </View>
      </View>
    </View>
  );
}
