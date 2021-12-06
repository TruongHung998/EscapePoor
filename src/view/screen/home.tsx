import React, {memo, useCallback, useEffect, useState} from "react";
import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import {insertTarget, requestUserInfo} from "@shared/redux/actions/userAction";
import TouchOpacityButton from '@view/widget/TouchOpacityButton'
import _const from "@constants/common";
import TextCustomComponent from "@view/text/textComponent";
import TextInputCustomComponent from "@view/text/textInputComponent";
import {COLOR_PAPER} from "@constants/color";
import {numberWithCommas, removeNumberWithCommas} from "@utilities/helper";


const HomePage = memo(() => {
    const [data, setData] = useState({})
    const [moneyAmount, setMoneyAmount] = useState('')

    useEffect(() => {
        requestUserInfo((data) => {
            setData(data)
        }, () => {
        })
    }, [])

    const _onUpdateAmount = useCallback(() => {
        insertTarget({
            total: moneyAmount
        }, () => {
        }, () => {
        })
    }, [moneyAmount])

    return <SafeAreaView style={styles.container}>
        <View style={{padding: 30}}>
            <Text>{JSON.stringify(data)}</Text>
            <Text>{numberWithCommas(moneyAmount)}</Text>
            <TextInputCustomComponent keyboardType="numeric"
                                      style={stylesUser.text_input} onChangeText={(value: any) => {
                setMoneyAmount(removeNumberWithCommas(value))
            }} value={numberWithCommas(moneyAmount)}/>
            <TouchOpacityButton style={stylesUser.button} onPress={_onUpdateAmount}>
                <TextCustomComponent color={'white'}>ss</TextCustomComponent>
            </TouchOpacityButton>
        </View>
    </SafeAreaView>
})

const stylesUser = StyleSheet.create({
    text_input: {
        width: _const.WIDTH_SCREEN * 0.3,
        height: _const.HEIGHT_SCREEN * 0.05,
        borderWidth: 2,
        borderColor: COLOR_PAPER,
        marginVertical: 15,
        borderRadius: 5
    },
    button: {
        width: _const.WIDTH_SCREEN * 0.3,
        height: _const.HEIGHT_SCREEN * 0.05,
        backgroundColor: '#0957DE',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

const styles = StyleSheet.create({
    container: {backgroundColor: 'white'},
    linear: {
        backgroundColor: "transparent",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        borderRadius: 25
    },
})
export default HomePage
