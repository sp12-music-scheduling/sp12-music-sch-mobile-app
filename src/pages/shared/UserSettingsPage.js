import React, { useState, useCallback, useEffect } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import FormTextInput from '../../components/form/FormTextInput';
import FormButton from '../../components/form/FormButton'
import { auth, firestore } from '../../../firebase';


const UserSettingsPage = ({navigation}) => {

    const user = auth.currentUser;
    const [displayName, setDisplayName] = useState();    
    const [userSettings, setUserSettings] = useState({});    

    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        /*
        This feature is used to ensure that each time the page is loaded,
        the useCallback is envoked to pull the latest copy of the data.
        */
        const unsubscribe = navigation.addListener('focus', () => {
          loadDataCallback();
        });
        return unsubscribe;
      }, []);
    
    const loadDataCallback = useCallback(() => {
        firestoreGetUserSettings();
    }, []);
    
    const firestoreGetUserSettings = () => {
        firestore.collection('user_settings')
        .where('uid', '==', user.uid)
        .get()
        .then( querySnapshot => {
            const data = [];
            querySnapshot.forEach(documentSnapshot => {
                data.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                });
            });
            setUserSettings(data[0]);
            setDisplayName(data[0].display_name);
            setIsLoading(false);
        });
    }

    const onUpdatePressed = () => {
        firestoreUpdate();
    }
    const firestoreUpdate = () => {
        firestore.collection('user_settings')
        .doc(userSettings.key)
        .update({
            display_name: displayName,
            email: userSettings.email,
        }).then(()=>{
            // userSettings.display_name = displayName;
            navigation.navigate('Home');
        });
    }

    const getRole = () => {
        /* EMAIL NOT EDITABLE */
        if (userSettings.email.endsWith('@kennesaw.edu')){
            return 'Professor';
        } else{
            return 'Student';
        }
    }

    const setEmail = () => {
        /* EMAIL NOT EDITABLE */
    }

    const setRole = () => {
        /* ROLE NOT EDITABLE */
    }

    if (isLoading){
        return (
        <View style={styles.container}>
            <ActivityIndicator></ActivityIndicator>
        </View>
        );
      } else {
    return (
        <View style={styles.container}>
            <FormTextInput 
            fieldName="Display Name"
            value={displayName} 
            setValue={setDisplayName} />
            <FormTextInput 
            fieldName="Email"
            value={userSettings.email} 
            setValue={setEmail} 
            editable={false} />
             <FormTextInput 
            fieldName="Role"
            value={getRole()} 
            setValue={setRole} 
            editable={false} />
            <FormButton 
            text="Update"
            onPress={onUpdatePressed} />
        </View>
    )
    }
};

export default UserSettingsPage;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 20,
    },
});