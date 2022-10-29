import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

const Exercise = ({name, user_count}) => {
    return (
        <View style={styles.item}>
            <View style={styles.itemleft}>
                <Text style={styles.itemText}>{name}</Text>
            </View>
            <View style={{alignItems: 'flex-end', flexDirection: 'row'}}>
                <Image
                source={require('../../assets/icons/user-solid.png')}
                resizeMode='contain'
                style={{
                    width: 15,
                    height: 15,
                    tintColor: '#754747',
                    paddingRight: 20,
                }}
                />
                <Text style={styles.itemRight}>{user_count}</Text>
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

export default Exercise;