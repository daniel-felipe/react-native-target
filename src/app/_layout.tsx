import { Loading } from "@/components/Loading";
import { colors } from "@/theme/colors";
import {
	Inter_400Regular,
	Inter_500Medium,
	Inter_700Bold,
	useFonts,
} from "@expo-google-fonts/inter";
import { Stack } from "expo-router";

export default function Layout() {
	const [isFontLoaded] = useFonts({
		Inter_400Regular,
		Inter_500Medium,
		Inter_700Bold,
	});

	if (!isFontLoaded) {
		return <Loading size="large" />;
	}

	return (
		<Stack
			screenOptions={{
				headerShown: false,
				contentStyle: { backgroundColor: colors.white },
			}}
		/>
	);
}
