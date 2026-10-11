import type { ReactNode } from "react";
import { ScrollView, type ScrollViewProps, StyleSheet } from "react-native";
import {
  SafeAreaView,
  type SafeAreaViewProps,
} from "react-native-safe-area-context";
import { useTheme } from "../hooks/useTheme";
import { ThemeColors } from "../styles";

type WithScrollView =
  | {
      scrollViewProps?: Omit<ScrollViewProps, "children">;
      withScroll: true;
    }
  | { scrollViewProps?: never; withScroll?: false };

type PageWrapperProps = {
  children: ReactNode;
  safeAreaViewProps?: Omit<SafeAreaViewProps, "children">;
} & WithScrollView;

const PageWrapper = ({
  children,
  safeAreaViewProps,
  scrollViewProps,
  withScroll,
}: PageWrapperProps) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  return (
    <SafeAreaView
      {...safeAreaViewProps}
      style={[styles.safeArea, safeAreaViewProps?.style]}
    >
      {withScroll && (
        <ScrollView
          {...scrollViewProps}
          style={[styles.scroll, scrollViewProps?.style]}
        >
          {children}
        </ScrollView>
      )}
      {!withScroll && children}
    </SafeAreaView>
  );
};

const getStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.container.screen,
    },
    scroll: {
      flex: 1,
      backgroundColor: colors.container.screen,
    },
  });

export default PageWrapper;
