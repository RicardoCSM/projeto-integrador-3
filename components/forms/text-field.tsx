import { TextInput, View } from 'react-native';
import { Text } from '../nativewindui/Text';
import { cn } from '~/lib/cn';

export function TextField({
  label,
  error,
  disabled,
  ...inputProps
}: {
  label: string;
  error?: string;
  disabled?: boolean;
} & React.ComponentProps<typeof TextInput>) {
  return (
    <View className="flex flex-col gap-1">
      <Text>{label}</Text>
      <TextInput
        className={cn('rounded-lg border p-2', error ? 'border-red-500' : 'border-gray-300')}
        editable={!disabled}
        {...inputProps}
      />
      {error && <Text className="text-red-500">{error}</Text>}
    </View>
  );
}
