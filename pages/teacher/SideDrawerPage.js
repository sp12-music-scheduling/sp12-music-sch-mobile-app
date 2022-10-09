import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';

const SideDrawerPage = ({navigation}) => {
  return (
      <View style={styles.container}>
          <Text>Side Drawer Screen PLACEHOLDER</Text>
          <Button
              title="Click Here"
              onPress={() => alert('Button Clicked!')}
          ></Button>
      </View>
  )
};

export default SideDrawerPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff'
  },
});
 
