import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const StudentManagementEnrollmentRow = ({exercise_name, practice_plan_name, practice_plan_type}) => {
    return (
        <View style={styles.item}>
            <View style={styles.itemleft}>
                <Text style={styles.itemText}>{exercise_name}</Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
                <Text style={styles.itemRight}>{practice_plan_name}</Text>
                <Text style={styles.itemRight}>{practice_plan_type}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#C3AAAA',
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
        // maxWidth: '50%',
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

export default StudentManagementEnrollmentRow;