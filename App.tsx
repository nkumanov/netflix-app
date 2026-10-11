import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { store } from "./src/store/store";
import ThemeProvider from "./src/shared/components/ThemeProvider";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigation/RootNavigator";

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <ThemeProvider>
            <RootNavigator />
          </ThemeProvider>
        </NavigationContainer>
        <StatusBar style="auto" />
      </Provider>
    </SafeAreaProvider>
  );
}
