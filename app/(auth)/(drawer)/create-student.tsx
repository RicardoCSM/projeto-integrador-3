import { Stack } from 'expo-router';
import { ThemeToggle } from '~/components/theme-toggle';
import { Container } from '~/components/layouts/container';
import CreateStudentForm from '~/components/common/students/create-student-form';

export default function CreateStudent() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Inserir novo estudante',
          headerRight: () => <ThemeToggle />,
        }}
      />
      <Container>
        <CreateStudentForm />
      </Container>
    </>
  );
}
