import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, View, FlatList, Dimensions, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import YouTubePlayer from'react-native-youtube-iframe';
import { auth, firestore } from '../../../../firebase';
import { ExpandableListView } from 'react-native-expandable-listview';
import CustomButton from '../../../components/login/CustomButton';
import { Alert } from 'react-native';

// https://www.npmjs.com/package/react-native-expandable-listview


const DEVICE_HEIGHT = Dimensions.get('window').height

const PracticeHomePage = ({route, navigation}) => {

    const user = auth.currentUser;

    const exercise = route.params.exercise;
    console.log(exercise);

    const DROPDOWN_CONTENT = [
      {
        id: '1',
        categoryName: 'Description',
        subCategory: [
          {
            id: '2',
            name: "This is the description"
        }
        ]
      },
      {
        id: '3',
        categoryName: 'Start Tempo',
        subCategory: [
          {
            id: '4',
            name: "60"
        }
        ]
      },
      {
        id: '5',
        categoryName: 'Goal Tempo',
        subCategory: [
          {
            id: '6',
            name: "120"
        }
        ]
      }
    ]

    const onMarkAsDonePressed = () => {
      Alert.alert('Exercise Complete!')
    }

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

    function handleItemClick({index}) {
      console.log(index);
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
              <ExpandableListView
              data={DROPDOWN_CONTENT}
              onItemClick={handleItemClick}
              itemContainerStyle={{margin: 15, backgroundColor: '#C3AAAA'}}
              itemLabelStyle={{color: 'white'}}
              />
              <CustomButton
              text="Mark as Done"
              type="QUARTARY"
              onPress={onMarkAsDonePressed}
              />
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
