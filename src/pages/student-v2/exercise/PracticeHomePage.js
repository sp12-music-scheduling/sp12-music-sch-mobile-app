import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, View, FlatList, Dimensions, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import YouTubePlayer from'react-native-youtube-iframe';
import { auth } from '../../../../firebase';

// https://www.npmjs.com/package/react-native-expandable-listview


const DEVICE_HEIGHT = Dimensions.get('window').height

const PracticeHomePage = ({route, navigation}) => {

    const user = auth.currentUser;

    const exercise = route.params.exercise;
    console.log(exercise);

    const getYoutubeVideoID = (link) => {
        /**
            Function for extracting video ID from YouTube Videos.
            Links for YouTube Videos vary on mobile and PCs.
            This function considers both situations as well as when no link is provided.
         */
        let arrayLink;
        let videoLink;
        if (link === ''){
        videoLink = ''
        }
        if (link.includes('v=')){
            arrayLink = link.split('v=')
            videoLink = arrayLink[1]
        }
        else if (link.includes('youtu.be')){
            arrayLink = link.split('/')
            videoLink = arrayLink[arrayLink.length - 1]
        }
        return videoLink.toString()
    }

    return (
        <View style={styles.container}>
            <Text style = {styles.DayTitle}>Day 1</Text>
            <Text style = {styles.ExerciseName}>{exercise.name}</Text>
            {/* <Text style={[styles.ExerciseItems, styles.YTlink]} onPress= {() => Linking.openURL(exercise.video_link)}>{exercise.video_link} </Text> */}
            <View style = {styles.videoplayer}>
                <YouTubePlayer
                play = {false}
                height = {200}
                videoId = {(getYoutubeVideoID(exercise.video_link))}
                />
                </View> 
            <View style={styles.sectionItems}>

            </View>
        </View>
    )
};

export default PracticeHomePage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 20,
    paddingHorizontal: 20,
    height: DEVICE_HEIGHT - 210
  },
  sectionItems: {
    marginTop: -30,    
  },
  DayTitle:{
    textAlign: 'center',
    fontSize: 38,
    color: '#754747',
    // margin: 10,
  },
  ExerciseName:{
    // textAlign: 'center',
    fontSize: 30,
    color: '#754747',
    margin: 20,
  },
//   ExerciseItems:{
//     fontSize: 20,
//     margin: 10,
//     marginTop: 0
//     },
//   YTlink:{
//     textDecoration: 'underline',
//     color:'blue'
//   },
  videoplayer:{
    flex: 0.5,
    // margin: 10
    },
});
