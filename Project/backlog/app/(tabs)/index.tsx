import BacklogItem from '@/components/BacklogItem';
import Header from '@/components/Header';
import Message from '@/components/Message';
import { useBacklogState } from '@/hooks/useBacklogState';
import { useThemeColor } from '@/hooks/useThemeColor';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { LinearTransition } from 'react-native-reanimated';

export default function HomeScreen() { 

  const {
    items,
    handleRemoveItem,
    result,
    handleCloseMessage,
    handleUpdateItem
  } = useBacklogState();
    

  return (
    <SafeAreaView style={{display: "flex", flex: 1, backgroundColor: useThemeColor({},"indexHeaderBackground")}}>
      <ScrollView style={{display: "flex", flex: 1, backgroundColor: useThemeColor({},"mainBackground")}}>
        <Header Text='Pending Tasks'></Header>
        <GestureHandlerRootView>
          <View style={{backgroundColor: useThemeColor({},"mainBackground")}}>
            {items?.filter(i=> !i.isChecked).map((item, index) => (
              <Animated.View key={item.id} layout={LinearTransition} >
                <BacklogItem
                  onSwipeLeft={() => handleRemoveItem(item)}
                  key={item.id}
                  item = {item}
                  onValueChange={(value : boolean) => {
                    handleUpdateItem(item, value);
                  }
                  }
                  isDisabled={false}
                  isChecked={item.isChecked}
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