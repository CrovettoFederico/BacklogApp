import { Context } from "@/services/context";
import * as Application from 'expo-application';
import React, { useEffect } from "react";
import { useColorScheme } from "react-native";

export function use_TabLayoutState() {
  const colorScheme = useColorScheme();
    const [loadingItems, setLoadingItems] = React.useState(true);
    const [error, setError] = React.useState(false);


    const fetchData = async function() {
          // ToDo get Phone ID
          let phoneId = Application.getAndroidId();         
          let user = await Context.getInstance().SaveUser(phoneId);                
          Context.getInstance().CurrentUser = user;
  
          await Context.getInstance().loadBacklogItemsToContext(Context.getInstance().CurrentUser.phoneId!);
          setLoadingItems(false);
    }

    useEffect(() => {        
        if(loadingItems)
          fetchData();
      }, [loadingItems]);

  return {
    loadingItems,
    setLoadingItems,
    error,
    setError,
    colorScheme,
    fetchData
  };
}
