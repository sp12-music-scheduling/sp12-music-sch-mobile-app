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
      <View style={styles.StudentViewMenu}>
        <Text style={styles.fontColor}>All</Text>
        <Text style={styles.fontColor}>Etudes</Text>
        <Text style={styles.fontColor}>Solos</Text>
        <Text style={styles.fontColor}>Fundamentals</Text>
      </View>
      <View style={styles.PracticePlanTitle}>
        <Text
          style={{
            color: "#754747",
            textAlign: "center",
            fontSize: 32,
            padding: 20
          }}
        >
          Practice Plan
        </Text>
        <View style= {styles.buttonViewStyle}>
        <Roundbutton title ='Plan A' style = {{backgroundColor: 'white'}}/>
        <Roundbutton title ='Plan B' style = {{backgroundColor: 'white'}}/>
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
  fontSize: 17,
  },
  buttonViewStyle: {
  flexDirection:'column',
  justifyContent: 'center',
  alignItems: 'center',
  }
});
