import { signInWithGoogle } from "@/backendConnectors/GoogleAuth";
import { Context } from "@/services/context";
import React, { useEffect } from "react";
import { useColorScheme } from "react-native";

export function use_TabLayoutState() {
  const colorScheme = useColorScheme();
    const [loadingItems, setLoadingItems] = React.useState(true);
    const [error, setError] = React.useState(false);


    const fetchData = async function() {
      try{    
      // ToDo get Phone ID
        const GoogleUser = await signInWithGoogle();

        //let phoneId = Application.getAndroidId();         
        let phoneId = GoogleUser?.user.id!;
        let user = await Context.getInstance().SaveUser(phoneId);                
        Context.getInstance().CurrentUser = user;

        await Context.getInstance().loadBacklogItemsToContext(Context.getInstance().CurrentUser.phoneId!);
        setLoadingItems(false);
      }catch{
        setError(true);
      }
    }

    useEffect(() => {        
        if(loadingItems){
          fetchData();
        }
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
