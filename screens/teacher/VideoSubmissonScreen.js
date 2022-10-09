import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';

const VideoSubmissonScreen = ({navigation}) => {
  return (
      <View style={styles.container}>
          <Text>Video Submission Screen PLACEHOLDER</Text>
          <Button
              title="Click Here"
              onPress={() => alert('Button Clicked!')}
          ></Button>
      </View>
  )
};

export default VideoSubmissonScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff'
  },
});
 

 