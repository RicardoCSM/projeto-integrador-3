import { Stack, useLocalSearchParams } from 'expo-router';
import { ThemeToggle } from '~/components/theme-toggle';
import { Container } from '~/components/layouts/container';
import { useStudents } from '~/store/useStudents';
import EditStudentForm from '~/components/common/students/edit-student-form';
import { Text } from '~/components/nativewindui/Text';

export default function EditStudent() {
  const { students } = useStudents();
  const { student_id } = useLocalSearchParams<{ student_id: string }>();
  const student = students.find((student) => student.id === student_id);

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Editar Estudante',
          headerRight: () => <ThemeToggle />,
        }}
      />
      <Container>
        {student ? <EditStudentForm student={student} /> : <Text>Estudante não encontrado</Text>}
      </Container>
    </>
  );
}
