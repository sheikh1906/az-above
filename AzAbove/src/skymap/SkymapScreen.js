import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
    ViroARScene,
    Viro3DObject,
    ViroAmbientLight
} from 'react-viro';

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

const SkymapScreen = () => (
    <View style={styles.root}>
        <ViroARScene displayPointCloud>
        <ViroAmbientLight color="#fff" />
    </ViroARScene>
    </View>
);

export default SkymapScreen;

