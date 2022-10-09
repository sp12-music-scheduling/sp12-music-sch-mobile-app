import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const PracticePlan = ({name, type, duraction_weeks}) => {
    return (
        <View style={styles.item}>
            <View style={styles.itemleft}>
                <Text style={styles.itemText}>{name}</Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
                <Text style={styles.itemRight}>{type}</Text>
                <Text style={styles.itemRight}>{duraction_weeks} Weeks</Text>
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

export default PracticePlan;