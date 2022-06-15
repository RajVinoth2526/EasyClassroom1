import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import {Text , View} from 'react-native';

export default function SettingScreen(){
    return (
        <View>
            <TouchableOpacity>
            <Text>Reset password</Text>
            </TouchableOpacity>
        </View>
    )
}