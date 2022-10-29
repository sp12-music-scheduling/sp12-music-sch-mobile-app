import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';

const StudentManagementPage = ({navigation}) => {
  return (
      <View style={styles.container}>
          <Text> Student Management Screen PLACEHOLDER</Text>
          <Button
              title="Click Here"
              onPress={() => alert('Button Clicked!')}
          ></Button>
      </View>
  )
};

export default StudentManagementPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff'
  },
});
 

 