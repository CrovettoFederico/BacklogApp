import { useThemeColor } from "@/hooks/useThemeColor";
import { IBacklogItem } from "@/Models/BacklogItemModel";
import { StyleSheet, View, type ViewProps } from "react-native";
import { ThemedText } from "./ThemedText";

type BacklogItemContentProps = ViewProps & {
  item : IBacklogItem;
  isOpen?: boolean;

};

const Content_Padding: number = 20;

export default function BacklogItemContent(props: BacklogItemContentProps) {
    return (
        <View style={[
            styles.backlogItemContent, 
            {backgroundColor: useThemeColor({}, "backlogContentBackground")},                            
            {width: "100%"},
            {display: props.isOpen ? "flex" : "none" }
        ]}
            >
            <ThemedText>{props.item.description}</ThemedText>
            <View style={styles.containerFechas}>
              <ThemedText style={styles.Creada}>Creada: {formatDate(props.item.createdDate)}</ThemedText>
              {props.item.createdDate != undefined && (
                  <ThemedText style={styles.Vence}>Vence: {formatDate(props.item.createdDate!)}</ThemedText>
              )}
            </View>
        </View>
    );
}

const formatDate = (date: Date): string => {
    const formatted = date!.toLocaleString("ar-es");
    if (formatted.includes("T")) {
        return formatted.split("T")[0];
    }

    if (formatted.includes(",")) {
        var normalDate = formatted.split(",")[0];
        var splitted = normalDate.split("/");
        return `${splitted[2]}-${splitted[1].length === 1 ? '0' + splitted[1] : splitted[1]}-${splitted[0].length === 1 ? '0' + splitted[0] : splitted[0]}`;
    }
    return formatted;
}

const styles = StyleSheet.create({
  backlogItemContent: {
    alignItems: "flex-start",
    flex: 1,
    padding: Content_Padding
  },
  Creada:{
    display:"flex",
    alignSelf: "flex-start"
  },
  Vence:{    
    display:"flex",
    alignSelf: "flex-end"
  },
  containerFechas:{
    flex:1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: Content_Padding,
    width: "100%"
    
  }
});