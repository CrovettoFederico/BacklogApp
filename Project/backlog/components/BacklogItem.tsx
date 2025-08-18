
import { ThemedText } from "@/components/ThemedText";
import { useBacklogItemState } from "@/hooks/useBacklogItemState";
import { useThemeColor } from '@/hooks/useThemeColor';
import { IBacklogItem } from "@/Models/BacklogItemModel";
import Checkbox from 'expo-checkbox';
import { Animated, StyleSheet, TouchableOpacity, View, type ViewProps } from 'react-native';
import BacklogItemContent from "./BacklogItemContent";

type BacklogItemProps = ViewProps & {
  item : IBacklogItem;
  onValueChange: (check : boolean) => void;
  isDisabled? : boolean;
  isChecked? : boolean;
};

const Tittle_Padding : number = 10;
const Checkbox_Padding : number = 20;

export default function BacklogItem(props: BacklogItemProps){

    const { isOpen, isChecked, handleChecked, refDissappear, handleOpen, setIsChecked } = useBacklogItemState(props.isChecked ?? false);
    
    return (
        <Animated.View style={{ opacity: refDissappear }}>
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => handleOpen()}
            >
                <View style={[
                    styles.backlogItem,
                    props.style,
                    {backgroundColor: useThemeColor({},"backlogBackground")},
                    {borderColor: useThemeColor({},"backlogBorder")}    
                    ]}
                >   
                    <View>
                        <ThemedText style={styles.backlogTitle} >- {props.item.title}</ThemedText>    
                    </View>
                    <View style={styles.backlogItemCheckBox}>
                        <Checkbox disabled= {props.isDisabled ?? false} value={isChecked} onValueChange={(checked)=>{
                          handleChecked(checked, props.onValueChange);
                          
                        }} />
                    </View>
                </View>    
                <View style={styles.backlogItemContentContainer}>
                    <BacklogItemContent isOpen={isOpen} item={props.item}/>                    
                </View>            
            </TouchableOpacity>                  
        </Animated.View>
    );


}
  
const styles = StyleSheet.create({
  backlogItem: {
    flex: 1, 
    display: "flex",
    height: 70,
    borderColor: "gray",
    borderWidth: 0.1,
    borderRadius: 0,
    flexDirection: "row",    
    alignItems: "center",
    justifyContent: "space-between"
  },
  backlogTitle:{
    alignSelf: "flex-start", 
    display: "flex",
    paddingLeft: Tittle_Padding,
  },
  backlogItemContentContainer: {
    display: "flex",    
    
  },
  backlogItemCheckBox: {
    display: "flex",
    justifyContent: "flex-end",
    paddingRight: Checkbox_Padding,
  },
});