import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';

const ProjectPlanHomePage = ({navigation}) => {
  return (
      <View style={styles.container}>
          <Text>Home Screen PLACEHOLDER</Text>
          <Button
              title="Click Here"
              onPress={() => alert('Button Clicked!')}
          ></Button>
      </View>
  )
};

export default ProjectPlanHomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff'
  },
});

