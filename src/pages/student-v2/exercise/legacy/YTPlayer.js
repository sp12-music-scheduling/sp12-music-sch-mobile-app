import React, {Component} from 'react';
import {Text,StyleSheet, View, Button} from'react-native';
import YouTubePlayer from'react-native-youtube-iframe';
import { videoID } from './UrlExtractor';

// Uses the YouTube Iframe Component to Render Videos
/*
YouTubePlayer requires height and VideoID; It seems I can't set a min/max height with it
*/
const VideoPlayer = () =>{
return(
<View style = {styles.videoplayer}>
<YouTubePlayer
play = {false}
height = {200}
videoId = {(videoID)}
/>
</View>
)
}

const styles = StyleSheet.create({
videoplayer:{
flex: 0.5,
margin: 20
}
})

export default VideoPlayer;




