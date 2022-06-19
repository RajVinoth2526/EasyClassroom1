import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
// import "payhere-embed-sdk/dist/react.css"
import Payhere from "payhere-embed-sdk/dist/react"

export default function PayScreen() {
    const [success, setSuccess] = useState(false)
    const [showPayhere, setShowPayhere] = useState(false)

    return (
        <View>
            <Text>PayScreenn</Text>
        </View>
    )
}

const styles = StyleSheet.create({})