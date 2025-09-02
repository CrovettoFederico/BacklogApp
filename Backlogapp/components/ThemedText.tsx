import { useThemeColor } from '@/hooks/useThemeColor';
import { StyleSheet, Text, type TextProps } from 'react-native';


export function ThemedText(TextProps: TextProps){
  return (
    <Text
      {...TextProps}
      style={[{ color: useThemeColor({},"text" )}, TextProps.style]}
    />
  );
}