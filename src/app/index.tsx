import { HomeHeader } from "@/components/HomeHeader";
import { fontFamily } from "@/theme/fontFamily";
import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {
	return (
		<View style={{ flex: 1 }}>
			<HomeHeader />
		</View>
	);
}
