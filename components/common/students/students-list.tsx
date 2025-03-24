import { useQuery } from '@tanstack/react-query';
import { Text } from '../../nativewindui/Text';
import { useWindowDimensions, View } from 'react-native';
import { fetchStudents } from '~/actions/students';
import { FlashList } from '@shopify/flash-list';
import { Student } from '~/types/student';
import { Icon } from '@roninoss/icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useHeaderHeight } from '@react-navigation/elements';
import { useColorScheme } from '~/hooks/useColorScheme';
import StudentCard from './student-card';
import { Button } from '~/components/nativewindui/Button';
import { router } from 'expo-router';
import { useGoogleOAuthToken } from '~/store/useGoogleOAuthToken';
import { useStudents } from '~/store/useStudents';

const RANGE = 'Página1!A2:D100';

export default function StudentsList() {
  const { googleOAuthToken } = useGoogleOAuthToken();
  const { students, setStudents } = useStudents();
  const { isPending, error } = useQuery({
    queryKey: ['googleSheetData'],
    queryFn: async () => {
      const students = await fetchStudents(googleOAuthToken || '', RANGE);
      setStudents(students);

      return students;
    },
  });

  if (isPending) return <Text>Loading...</Text>;

  if (error) return <Text>An error has occurred: {error.message}</Text>;

  return (
    <>
      <FlashList
        key={students.length}
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
        data={students}
        estimatedItemSize={200}
        contentContainerClassName="py-4 android:pb-12"
        removeClippedSubviews={false}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={renderItemSeparator}
        renderItem={renderStudent}
        ListEmptyComponent={students.length === 0 ? ListEmptyComponent : undefined}
      />

      <Button onPress={() => router.replace('/(auth)/(drawer)/create-student')}>
        <Text>Inserir novo estudante</Text>
      </Button>
    </>
  );
}

function ListEmptyComponent() {
  const insets = useSafeAreaInsets();
  const dimensions = useWindowDimensions();
  const headerHeight = useHeaderHeight();
  const { colors } = useColorScheme();
  const height = dimensions.height - headerHeight - insets.bottom - insets.top;

  return (
    <View style={{ height }} className="flex-1 items-center justify-center gap-1 px-12">
      <Icon name="file-plus-outline" size={42} color={colors.grey} />
      <Text variant="title3" className="pb-1 text-center font-semibold">
        Nenhum estudante encontrado
      </Text>
    </View>
  );
}

function keyExtractor(student: Student) {
  return student.id;
}

function renderItemSeparator() {
  return <View className="p-2" />;
}

function renderStudent({ item }: { item: Student }) {
  return <StudentCard student={item} />;
}
