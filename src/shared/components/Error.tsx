import { Pressable, StyleSheet, Text, View } from "react-native";
import { theme, ThemeColors } from "../styles";
import { useTheme } from "../hooks/useTheme";
type ErrorWithAction =
  | { onActionClick: () => void; btnTitle: string }
  | { onActionClick?: never; btnTitle?: never };
type ErrorProps = {
  title: string;
  subTitle?: string;
} & ErrorWithAction;

const Error = ({ onActionClick, subTitle, title, btnTitle }: ErrorProps) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  return (
    <View style={styles.state}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {subTitle && <Text style={styles.secondary}>{subTitle}</Text>}
      {onActionClick && (
        <Pressable
          accessibilityRole="button"
          onPress={() => onActionClick()}
          style={styles.btnContainer}
        >
          <Text style={styles.btnText}>{btnTitle}</Text>
        </Pressable>
      )}
    </View>
  );
};

const getStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    state: {
      flex: 1,
      backgroundColor: colors.container.screen,
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing.xl,
      gap: theme.spacing.lg,
    },
    sectionTitle: {
      color: colors.text.primary,
      fontSize: theme.fontSize.lg,
      fontWeight: theme.fontWeight.semiBold,
    },
    secondary: {
      color: colors.text.secondary,
      fontSize: theme.fontSize.sm,
      textAlign: "center",
    },
    btnContainer: {
      paddingHorizontal: theme.spacing.xl,
      paddingVertical: theme.spacing.md,
      borderRadius: theme.radius.md,
      borderWidth: 1,
      borderColor: colors.brand.primary,
    },
    btnText: {
      color: colors.brand.primary,
      fontSize: theme.fontSize.sm,
      fontWeight: theme.fontWeight.bold,
    },
  });

export default Error;
