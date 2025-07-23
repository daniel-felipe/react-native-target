import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: "white",
			}}
		>
			<Text>Hello Expo Router</Text>

			<Button title="Nova Meta" onPress={() => router.navigate("/target")} />

			<Button
				title="Transação"
				onPress={() => router.navigate("/transaction/123")}
			/>

			<Button
				title="Progresso"
				onPress={() => router.navigate("/in-progress/12")}
			/>
		</View>
	);
}
