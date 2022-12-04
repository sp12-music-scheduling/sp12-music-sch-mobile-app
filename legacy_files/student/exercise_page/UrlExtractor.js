import React from 'react';
/*
Function for extracting video ID from YouTube Videos.
Links for YouTube Videos vary on mobile and PCs.
This function considers both situations as well as when no link is provided.
*/

const link = 'https://youtu.be/MAlSjtxy5ak';
const extractVideoID = (link) => {
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
const videoID = extractVideoID(link);

export default extractVideoID;
export {videoID};
export {link};