import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { studentSchema, StudentSchema } from '~/lib/validations/studentSchema';
import { TextField } from '~/components/forms/text-field';
import { ToastAndroid, View } from 'react-native';
import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';
import { useGoogleOAuthToken } from '~/store/useGoogleOAuthToken';
import { useStudents } from '~/store/useStudents';
import { insertStudent } from '~/actions/students';
import { router } from 'expo-router';

export default function CreateStudentForm() {
  const { googleOAuthToken } = useGoogleOAuthToken();
  const { students, setStudents } = useStudents();
  const form = useForm<StudentSchema>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      id: '',
      name: '',
    },
  });

  const { mutateAsync, status } = useMutation({
    mutationFn: async (studentSchema: StudentSchema) => {
      const range = `Página1!A${students.length + 2}:B${students.length + 2}`;
      await insertStudent(googleOAuthToken || '', range, studentSchema);
    },
    onSuccess: () => {
      setStudents([
        ...students,
        {
          id: form.getValues('id'),
          name: form.getValues('name'),
          position: students.length + 2,
        },
      ]);
      router.replace('/(auth)/(drawer)');
      ToastAndroid.show('Estudante inserido com sucesso', ToastAndroid.SHORT);
    },
    onError: (error: Error) => {
      console.error(error.message);
    },
  });

  function onSubmit(values: StudentSchema) {
    mutateAsync(values);
  }

  return (
    <View className="flex h-full flex-col justify-between">
      <View className="flex flex-col gap-6">
        <TextField
          label="Matrícula"
          value={form.watch('id')}
          onChangeText={(value) => form.setValue('id', value)}
          error={form.formState.errors.id?.message}
          disabled={status === 'pending'}
        />
        <TextField
          label="Nome"
          value={form.watch('name')}
          onChangeText={(value) => form.setValue('name', value)}
          error={form.formState.errors.name?.message}
          disabled={status === 'pending'}
        />
      </View>
      <Button
        className="pt-auto"
        onPress={form.handleSubmit(onSubmit)}
        disabled={status === 'pending'}>
        <Text>Salvar</Text>
      </Button>
    </View>
  );
}
