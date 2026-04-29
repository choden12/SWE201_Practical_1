import { AuthProvider } from "../src/context/AuthContext";
import Dashboard from "../src/context/Dashboard";
import CounterScreen from "../src/context/usestore";
import { View, StyleSheet } from "react-native";

export default function App() {
  return (
    <AuthProvider>
      <View style={styles.container}>
        <Dashboard />
        <CounterScreen />
      </View>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 32,
    justifyContent: "center",
    backgroundColor: "#f4f7fb",
  },
});