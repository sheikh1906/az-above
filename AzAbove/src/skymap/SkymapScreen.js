import React from 'react';
import {View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';


// const skymapWebView = require('./SkymapWebView.html');

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const SkymapScreen = () => 
    <View style={styles.root}>
        <WebView source={{uri: 'https://sheikh1906.github.io/hosthack/'}} />
    </View>;

export default SkymapScreen;
