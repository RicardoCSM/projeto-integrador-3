import { useQuery } from "@tanstack/react-query";
import { Text } from "./nativewindui/Text";
import { View } from "react-native";

export const StudentsList = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ['repoData'],
        queryFn: () =>
            fetch('https://api.github.com/repos/TanStack/query').then((res) =>
                res.json(),
            ),
    })

    if (isPending) return (
        <Text>
            Loading...
        </Text>
    )

    if (error) return (
        <Text>
            'An error has occurred: ' + error.message
        </Text>
    )

    return (
        <View>
            <Text>{data.name}</Text>
            <Text>{data.description}</Text>
        </View>
    )
}

export default StudentsList;
