import React, {memo, useCallback, useEffect, useState} from "react";
import {Image, SafeAreaView, ScrollView, StyleSheet, View} from "react-native";
import {insertField, requestUserInfo} from "@shared/redux/actions/userAction";
import TouchOpacityButton from '@view/widget/TouchOpacityButton'
import _const from "@constants/common";
import TextCustomComponent from "@view/text/textComponent";
import TextInputCustomComponent from "@view/text/textInputComponent";
import {COLOR_PAPER, COLOR_PINK} from "@constants/color";
import {numberWithCommas, removeNumberWithCommas} from "@utilities/helper";
import {useSetLoading} from "@context/appContext";
import {User} from "@shared/redux/constants/modalTypes";
import {LAYOUT} from "@constants/globalStyles";


const HomePage = memo(() => {
    const [data, setData] = useState<User | any>({})
    const [moneyAmount, setMoneyAmount] = useState('')
    const setLoading = useSetLoading()
    const name = data?.name || ""
    const total = data?.total || ""
    const target = data?.target || ""

    useEffect(() => {
        requestUserInfo((data) => {
            setData(data)
        }, () => {
        })
    }, [])

    const _onUpdateAmount = useCallback(() => {
        setLoading(true)
        insertField({
            target: moneyAmount
        }, () => {
            requestUserInfo((data) => {
                setData(data)
                setLoading(false)
            }, () => {
                setLoading(false)
            })
        }, () => {
            setLoading(false)
        })
    }, [moneyAmount])

    return <View style={styles.container}>
        <View
            style={{height: _const.HEIGHT_SCREEN * 0.9}}>
            <ScrollView>
                <View style={styles.container2}>
                    <View style={styles.container3}>
                        <Image source={require("../../assets/lanhuyen.jpg")} style={styles.image}/>
                    </View>
                </View>
                <View style={{marginTop: _const.HEIGHT_SCREEN * 0.12}}>
                    <TextCustomComponent textType={'bold'} style={{textAlign: 'center'}}
                                         fontSize={20}>{`${numberWithCommas(name)}`}</TextCustomComponent>
                    <TextCustomComponent>
                        <TextCustomComponent>{`Mục tiêu `}</TextCustomComponent>
                        <TextCustomComponent textType={'bold'}
                                             fontSize={20}>{`${numberWithCommas(target)}`}</TextCustomComponent>
                    </TextCustomComponent>
                    <TextCustomComponent>
                        <TextCustomComponent>{`Số dư `}</TextCustomComponent>
                        <TextCustomComponent textType={'bold'}
                                             fontSize={20}>{`${numberWithCommas(total)}`}</TextCustomComponent>
                        <TextCustomComponent>{` vnđ`}</TextCustomComponent>
                    </TextCustomComponent>
                    {/*<TextInputCustomComponent keyboardType="numeric"*/}
                    {/*                          style={stylesUser.text_input} onChangeText={(value: any) => {*/}
                    {/*    setMoneyAmount(removeNumberWithCommas(value))*/}
                    {/*}} value={numberWithCommas(moneyAmount)}/>*/}
                    {/*<TouchOpacityButton style={stylesUser.button} onPress={_onUpdateAmount}>*/}
                    {/*    <TextCustomComponent color={'white'}>ss</TextCustomComponent>*/}
                    {/*</TouchOpacityButton>*/}
                </View>
            </ScrollView>
        </View>
    </View>
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
    image: {
        width: _const.WIDTH_SCREEN * 0.48,
        height: _const.WIDTH_SCREEN * 0.48,
        borderRadius: _const.WIDTH_SCREEN * 0.48 / 2
    },
    container3: {
        alignItems: 'center',
        justifyContent: 'center',
        width: _const.WIDTH_SCREEN * 0.5,
        height: _const.WIDTH_SCREEN * 0.5,
        borderRadius: _const.WIDTH_SCREEN * 0.5 / 2,
        backgroundColor: 'white',
        ...LAYOUT.box_shadow_light,
        position: 'absolute',
        bottom: "-35%",
        left: "25%"
    },
    container2: {
        width: _const.WIDTH_SCREEN,
        height: _const.HEIGHT_SCREEN * 0.3, backgroundColor: COLOR_PINK,
    },
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
