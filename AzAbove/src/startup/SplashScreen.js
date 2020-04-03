import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const SplashScreen = props => {
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