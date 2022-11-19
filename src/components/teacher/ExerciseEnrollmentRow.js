import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ExerciseEnrollmentRow = ({name, email, is_selected = false, startDate = ''}) => {

    const withStartDate = () => {
       return ( 
       <View style={{alignItems: 'flex-end'}}>
            <Text style={styles.itemRight}>{email}</Text>
            <Text style={styles.itemRight}>{startDate} [Start]</Text>
        </View>
       )
    }

    const noStartDate = () => {
        return ( 
        <View style={{alignItems: 'flex-end'}}>
             <Text style={styles.itemRight}>{email}</Text>
         </View>
        )
     }   

    return (
        <View style={[styles.item, {backgroundColor: is_selected == false ? '#C3AAAA' : 'black'}]}>
            <View style={styles.itemleft}>
                <Text style={styles.itemText}>{name}</Text>
            </View>
            {startDate == '' ? noStartDate() : withStartDate() }
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    itemleft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    itemText: {
        maxWidth: '80%',
        marginLeft: 15,
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    },
    itemRight: {
        color: 'white',
        fontSize: 10,
    },
});

export default ExerciseEnrollmentRow;