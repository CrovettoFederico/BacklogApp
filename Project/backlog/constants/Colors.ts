/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    indexHeaderBackground: '#fff',
    mainBackground: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    backlogBackground: '#F5F5F5',
    backlogBorder: '#E5E5E5',
    backlogContentBackground: "#E5E5E5",
    backgroundInputsColor: "#bcb9d7ff"
  },
  dark: {
    text: '#ECEDEE',
    indexHeaderBackground: '#031722ff',
    mainBackground: '#17394aff',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    backlogBackground: '#206283ff',
    backlogBorder: '#282a2bff',
    backlogContentBackground: "#26546aff",
    backgroundInputsColor: "#2a2936ff"
  },
};
