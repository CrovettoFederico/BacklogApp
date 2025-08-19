import { useAddFormState } from "@/hooks/useAddFormState";
import React from "react";
import { Button, StyleSheet, TextInput, View, type ViewProps } from "react-native";
import DateTimePicker from 'react-native-ui-datepicker';
import Message from "../Message";
import { ThemedText } from "../ThemedText";

const InputPadding = 20;
const InputMargin = 5;

export default function AddForm(props: ViewProps) {
    const {    
        HandleSumbitItem,
        titulo,
        descripcion,
        deadline,
        defaultStyles,
        onChangeTitulo,
        onChangeDescripcion,
        setDeadline,
        result,
        handleCloseMessage
    } = useAddFormState();

   return( 
    <View style={styles.container}>
        <View style={styles.content}>
            <ThemedText>Title </ThemedText>
            <View style={styles.textbox}>
            <TextInput      
                style={styles.textFromTextbox}            
                onChangeText={onChangeTitulo}
                value={titulo}
                keyboardType="default"/>
            </View>
        </View>
        <View style={styles.content}>
            <ThemedText>Description: </ThemedText>
            <View style={styles.textbox}>
                <TextInput  
                    style={styles.textFromTextbox}
                    onChangeText={onChangeDescripcion}
                    value={descripcion}
                    keyboardType="default"/>
            </View>
            </View>
        <View style={styles.content}>
            <ThemedText>Deadline: </ThemedText>
            <View style={styles.datePicker}>
                <DateTimePicker
                    styles={{
                        ...defaultStyles,
                    }}
                    locale="arg-ES"
                    containerHeight={230}
                    mode="single"
                    date={deadline}
                    minDate={new Date()}
                    onChange={({ date }) =>  setDeadline(date)}            
                />
            </View>
        </View> 
        
        <View style={styles.content}>
            <View style={styles.saveButton}>
                <Button onPress={() => HandleSumbitItem(titulo, descripcion, deadline)} title="Save"/>
            </View>
        </View>
        {result?.isShown && (
          <Message
            type={result.result}
            text={result.message}
            onClose={() => handleCloseMessage()}
            duration={5000}
        />
                      )}
        
        
    </View>
   );
}


const styles = StyleSheet.create({
  container: {
    flex: 1, 
    display: "flex",
    flexDirection: 'column',
  },
  content: {
    flex: 1,    
    padding: InputPadding,
    overflow: 'hidden',
  },  
  textbox:{
    marginTop: InputMargin,
    paddingLeft: InputMargin,
    backgroundColor: "#2a2936ff",
    borderRadius: 5,
  },
  textFromTextbox:{
    color: "#ffffffff",
  },
  datePicker:{
    marginTop: InputMargin,
    paddingLeft: InputMargin,
    backgroundColor: "#2a2936ff",
    borderRadius: 5,

  },
  saveButton:{
    marginTop: InputMargin
  }
});