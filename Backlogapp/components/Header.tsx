import { useThemeColor } from '@/hooks/useThemeColor';
import { StyleSheet, View, type TextProps } from 'react-native';
import { ThemedText } from './ThemedText';

type HeaderProps = {
    Text:string
} & TextProps;

export default function Header(props : HeaderProps){
    return (<View style={[styles.headerContent, {backgroundColor: useThemeColor({},"indexHeaderBackground")}]}>
        <ThemedText style= {{}}>{props.Text}</ThemedText>     
    </View> )  
}

const styles = StyleSheet.create({  
  headerContent: {    
    alignSelf: 'center',
    paddingTop: 45,
    paddingBottom: 20,
    width: '100%',
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    alignContent: "center"
  }
});