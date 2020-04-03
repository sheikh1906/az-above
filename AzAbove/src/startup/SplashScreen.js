import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const SplashScreen = props => {

    const { navigate } = props.navigation;

    useEffect(() => {
        setTimeout(() => {
            navigate('Skymap');
        }, 4000)
    },[])

    return (
        <View >
            <Text>Splash Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { backgroundColor: 'white', flex: 1 },
});

export default SplashScreen;