import { router, useLocalSearchParams } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Transaction() {
	const params = useLocalSearchParams<{ id: string }>();

	return (
		<View style={{ flex: 1, justifyContent: "center" }}>
			<Button title="Voltar" onPress={() => router.back()} />

			<Text>ID: {params.id}</Text>
		</View>
	);
}
