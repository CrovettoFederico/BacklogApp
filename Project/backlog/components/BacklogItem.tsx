
import { ThemedText } from "@/components/ThemedText";
import { useBacklogItemState } from "@/hooks/useBacklogItemState";
import { useThemeColor } from '@/hooks/useThemeColor';
import { IBacklogItem } from "@/Models/BacklogItemModel";
import Checkbox from 'expo-checkbox';
import { StyleSheet, TouchableOpacity, View, type ViewProps } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import BacklogItemContent from "./BacklogItemContent";


type BacklogItemProps = ViewProps & {
  item : IBacklogItem;
  onValueChange: (check : boolean) => void;
  onSwipeLeft: () => void;
  isDisabled? : boolean;
  isChecked? : boolean;
  
};

const Tittle_Padding : number = 10;
const Checkbox_Padding : number = 20;
const END_POSITION = 150;


export default function BacklogItem(props: BacklogItemProps){

  const { isOpen, isChecked, handleChecked, refDissappear, handleOpen } = useBacklogItemState(props.isChecked ?? false);
    
  const position = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      position.value =  e.translationX;
    })
    .onEnd((e) => {
      if (position.value >= END_POSITION || position.value <= -END_POSITION) {
        runOnJS(props.onSwipeLeft)();

      }else{
        position.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    // Fade out por swipe
    const distance = Math.max(Math.abs(position.value), 0);
    const swipeOpacity = 1 - (distance / END_POSITION) * 0.8;
    // Fade out por check
    const checkOpacity = typeof refDissappear === 'number' ? refDissappear : refDissappear.value;
    return {
      transform: [{ translateX: position.value }],
      opacity: Math.max(swipeOpacity, 0.2) * checkOpacity, // <-- combinación
    };
  });


    return (
      
        <GestureDetector gesture={panGesture}>

          <Animated.View style={animatedStyle }>
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
        </GestureDetector>
      
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