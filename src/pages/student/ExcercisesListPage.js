import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Button
} from "react-native";
import Roundbutton from './button-round'

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text
          style={{
            color: "#754747",
            textAlign: "center",
            fontSize: 32,
            padding: 20
          }}
        >
          Exercises
        </Text>
        <View style= {styles.buttonViewStyle}>
        <Roundbutton title ='Exercise-1' style = {{backgroundColor: 'white'}}/>
        <Roundbutton title ='Exercise-2' style = {{backgroundColor: 'white'}}/>
        <Roundbutton title ='Exercise-3' style = {{backgroundColor: 'white'}}/>
        </View>

      </View>
      <View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    fontFamily: 'Inter',
  },
  StudentViewMenu: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 20,
  },
  fontColor: {
  color: "#754747",
  fontSize: 21,
  },
  buttonViewStyle: {
  flexDirection:'column',
  justifyContent: 'center',
  alignItems: 'center',
  }
});
