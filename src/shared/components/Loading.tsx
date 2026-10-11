import { useTheme } from "../hooks/useTheme";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { theme, type ThemeColors } from "../styles";

export default function Loading() {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.brand.primary} />
      <Text style={styles.text}>Loading movies…</Text>
    </View>
  );
}

const getStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      width: 280,
      minHeight: 180,
      alignItems: "center",
      justifyContent: "center",
      gap: theme.spacing.md,
      marginHorizontal: "auto",
      marginVertical: "auto",
    },
    text: {
      color: colors.text.secondary,
      fontSize: theme.fontSize.sm,
    },
  });
