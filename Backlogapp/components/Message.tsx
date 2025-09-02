import { useThemeColor } from "@/hooks/useThemeColor";
import { useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";

export type MessageProps = {
    type: "info" | "error" | "success";
    text : string;
    onClose?: () => void;
    duration?: number;

};

export default function Message (props: MessageProps) {
    
    function getBackgroundColor(type: string): import("react-native").ColorValue | undefined {
        switch (type) {
            case "info":
                return useThemeColor({},"messageBackgroundInfo");
            case "error":
                return useThemeColor({},"messageBackgroundError");
            case "success":
                return useThemeColor({},"messageBackgroundSuccess");
            default:
                return undefined;
        }
    }

    useEffect(() => {
        if (props.onClose && props.duration) {
            const timer = setTimeout(() => {
                props.onClose && props.onClose();
            }, props.duration);
            return () => clearTimeout(timer);
        }
    }, [props.onClose, props.duration]);

    return (
        <TouchableOpacity activeOpacity={0.8}
            onPress={props.onClose}
            style={[{ backgroundColor: getBackgroundColor(props.type) }, styles.message, styles.absoluteBottom]}
        >
        
            <ThemedText>
                {props.text}
            </ThemedText>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  message: {
    display: "flex",
    flex: 1,
    borderRadius:10
  },
    absoluteBottom: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 40,
    zIndex: 9999,
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    // Puedes agregar sombra si quieres
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  }
});
