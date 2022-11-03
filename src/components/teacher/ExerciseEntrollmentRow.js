import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ExerciseEntrollmentRow = ({name, email, is_selected = false}) => {
    return (
        <View style={[styles.item, {backgroundColor: is_selected == false ? '#C3AAAA' : 'black'}]}>
            <View style={styles.itemleft}>
                <Text style={styles.itemText}>{name}</Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
                <Text style={styles.itemRight}>{email}</Text>
            </View>
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

export default ExerciseEntrollmentRow;