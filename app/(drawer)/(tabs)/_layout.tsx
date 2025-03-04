import { withLayoutContext } from "expo-router";
import { createNativeBottomTabNavigator } from "@bottom-tabs/react-navigation";
import { useColorScheme } from "~/hooks/useColorScheme";
import { COLORS } from "~/theme/colors";

export const Tabs = withLayoutContext(
  createNativeBottomTabNavigator().Navigator
);

export default function TabLayout() {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <Tabs
      activeIndicatorColor={isDarkColorScheme ? COLORS.dark.primary : COLORS.light.primary}
      tabBarStyle={{
        backgroundColor: isDarkColorScheme ? COLORS.dark.grey6 : COLORS.white,
      }}
      screenOptions={{
        tabBarActiveTintColor: isDarkColorScheme ? COLORS.white : COLORS.black,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tab One',
          tabBarIcon: () => ({
            uri: 'https://www.svgrepo.com/show/22031/home-icon-silhouette.svg',
          }),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tab Two',
          tabBarIcon: () => ({
            uri: 'https://www.svgrepo.com/show/445112/explore-solid.svg',
          }),
        }}
      />
    </Tabs>
  );
}
