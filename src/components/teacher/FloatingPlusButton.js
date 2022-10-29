import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";
  
const FloatingPlusButton = (props) => {
    return (
        <Pressable style={styles.container}
            onPress={props.onPress}>
            <Text style={styles.title}>+</Text>
        </Pressable>
    );
};
  
export default FloatingPlusButton;
  
const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        position: "absolute",
        bottom: 90,
        right: 0,
        backgroundColor: "#754747",
        paddingHorizontal: 20,
        paddingVertical: 10,
        opacity: 0.7,
    },
    title: {
        fontSize: 25,
        color: "white",
        fontWeight: "bold"
    },
});