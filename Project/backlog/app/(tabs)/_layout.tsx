import { IconSymbol } from '@/components/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Context } from '@/services/context';
import * as Application from 'expo-application';
import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, Platform, View } from 'react-native';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [loadingItems, setLoadingItems] = React.useState(true);
    

  
  useEffect(() => {
      async function fetchData() {
        // ToDo get Phone ID
        let phoneId = Application.getAndroidId();         
        let user = await Context.getInstance().SaveUser(phoneId);                
        Context.getInstance().CurrentUser = user;

        await Context.getInstance().loadBacklogItemsToContext(Context.getInstance().CurrentUser.phoneId!);
        setLoadingItems(false);
      }
      if(loadingItems)
        fetchData();
    }, [loadingItems]);

  if (loadingItems) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }


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
