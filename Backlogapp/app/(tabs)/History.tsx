import BacklogItem from '@/components/BacklogItem';
import Header from '@/components/Header';
import Message from '@/components/Message';
import { useBacklogState } from '@/hooks/useBacklogState';
import { useMessage } from '@/hooks/useMessage';
import { useThemeColor } from '@/hooks/useThemeColor';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { LinearTransition } from 'react-native-reanimated';

export default function HomeScreen() { 

  const {
    items,
    handleRemoveItem,
    handleUpdateItem
  } = useBacklogState();
  const { handleShowMessage, result, handleCloseMessage } = useMessage();

  return (
    <SafeAreaView style={{display: "flex", flex: 1, backgroundColor: useThemeColor({},"indexHeaderBackground")}}>
      <ScrollView style={{display: "flex", flex: 1, backgroundColor: useThemeColor({},"mainBackground")}}>
        <Header Text='Tasks Completed'></Header>
        <GestureHandlerRootView>
          <View style={{backgroundColor: useThemeColor({},"mainBackground")}}>
            
            {items?.filter(i=> i.isFinished && !i.isDeleted).map((item, index) => (
              <Animated.View key={item.id} layout={LinearTransition} >
              <BacklogItem
                onSwipeLeft={() => {
                    handleShowMessage(handleRemoveItem(item));
                  }}
                key={item.id}
                item = {item}
                onValueChange={(value) => {
                  let newresult = handleUpdateItem(item, value);
                  handleShowMessage(newresult);
                }}
                isChecked = {item.isFinished ?? false}
                isDisabled={false}
              />
              </Animated.View>
            ))}
          
          </View>
          
        </GestureHandlerRootView>
      </ScrollView>
        {result?.isShown && (
        <Message
          type={result.result}
          text={result.message}
          onClose={() => handleCloseMessage()}
          duration={5000}
        />
      )}  
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    display: "flex",
    flexDirection: 'row',
  },
  content: {
    flex: 1,
    padding: 0,
    gap: 16,
    overflow: 'hidden',
  },
  headerContent: {    
    alignSelf: 'center',
    paddingTop: 45,
    paddingBottom: 20,
    width: '100%',
    justifyContent: "center",
    display: "flex",
  }
});