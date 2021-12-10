import React, {memo, useCallback, useEffect, useState} from "react";
import {Image, LayoutAnimation, RefreshControl, ScrollView, StyleSheet, View} from "react-native";
import {insertField, requestUserInfo} from "@shared/redux/actions/userAction";
import _const from "@constants/common";
import TextCustomComponent from "@view/text/textComponent";
import {COLOR_PAPER, COLOR_PINK} from "@constants/color";
import {numberWithCommas} from "@utilities/helper";
import {useSetLoading} from "@context/appContext";
import {User} from "@shared/redux/constants/modalTypes";
import {LAYOUT} from "@constants/globalStyles";
import {Widget1} from "@view/screen/widgetHome/widget1";
import {Widget2} from "@view/screen/widgetHome/widget2";
import {requestDateNowInfo} from "@shared/redux/actions/dateAction";


const HomePage = memo(() => {
    const [data, setData] = useState<User | any>({})
    const [moneyAmount, setMoneyAmount] = useState('')
    const setLoading = useSetLoading()
    const name = data?.name || ""
    const [refresh, setRefresh] = useState(false)
    const [dataDay, setDataDay] = useState([])

    useEffect(() => {
        requestUserInfo((data) => {
            LayoutAnimation.easeInEaseOut()
            setData(data)
        }, () => {
        })
        setLoading(true)
        requestDateNowInfo((data) => {
            LayoutAnimation.easeInEaseOut()
            setLoading(false)
            setDataDay(data)
        }, () => {
            setLoading(false)
        })
    }, [])

    const _onRefresh = useCallback(() => {
        setRefresh(true)
        requestUserInfo((data) => {
            LayoutAnimation.easeInEaseOut()
            setRefresh(false)
            setData(data)
        }, () => {
            setRefresh(false)
        })
        setRefresh(true)
        requestDateNowInfo((data) => {
            LayoutAnimation.easeInEaseOut()
            setRefresh(false)
            setDataDay(data)
        }, () => {
            setRefresh(false)
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
            <ScrollView refreshControl={
                <RefreshControl
                    refreshing={refresh}
                    onRefresh={_onRefresh}
                />
            }>
                <View>
                    <View style={styles.container2}/>
                    <View style={styles.container3}>
                        <Image source={require("../../assets/lanhuyen.jpg")} style={styles.image}/>
                    </View>
                    <View style={styles.view1}>
                        <View style={{marginTop: _const.HEIGHT_SCREEN * 0.12}}>
                            <TextCustomComponent textType={'bold'} style={{textAlign: 'center'}}
                                                 fontSize={20}>{`${numberWithCommas(name)}`}</TextCustomComponent>
                        </View>
                        <Widget2 data={dataDay}/>
                        <Widget1 data={data}/>
                        <View style={{paddingBottom: _const.HEIGHT_SCREEN * 0.5}}/>
                    </View>
                </View>
            </ScrollView>
        </View>
    </View>
})

const styles = StyleSheet.create({
    view1: {
        width: _const.WIDTH_SCREEN * 0.95,
        backgroundColor: 'white',
        alignSelf: 'center',
        ...LAYOUT.box_shadow,
        marginTop: _const.HEIGHT_SCREEN * 0.25,
        borderRadius: 30,
        paddingBottom: _const.HEIGHT_SCREEN * 0.1
    },
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
        top: _const.HEIGHT_SCREEN * 0.12,
        left: "25%",
        zIndex: 100,
        elevation: 100
    },
    container2: {
        position: 'absolute',
        top: 0,
        left: 'auto',
        width: _const.WIDTH_SCREEN,
        height: _const.HEIGHT_SCREEN * 0.4, backgroundColor: COLOR_PINK,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
    },
    container: {backgroundColor: COLOR_PAPER},
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
