import { IconSymbol } from '@/components/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      
      
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
        
      />

      <Tabs.Screen
        name="Add"
        options={{
          title: 'Add',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="plus.app.fill" color={color} />,
        }}
        
      />
      <Tabs.Screen
        name="History"
        options={{
          title: 'History',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="list.bullet" color={color} />,
        }}
      />
    </Tabs>
  );
}
