import AddForm from "@/components/AddForm/AddForm";
import Header from "@/components/Header";
import { useThemeColor } from "@/hooks/useThemeColor";
import { SafeAreaView, ScrollView, View } from "react-native";

export default function Index() {
  return (
     <SafeAreaView style={{display: "flex", flex: 1, backgroundColor: useThemeColor({},"indexHeaderBackground")}}>
           <ScrollView style={{display: "flex", flex: 1, backgroundColor: useThemeColor({},"mainBackground")}}>
             <Header Text='Add a new Task'></Header>
             <View>
              <AddForm  />
             </View>
           </ScrollView>
         </SafeAreaView>
  );
}

