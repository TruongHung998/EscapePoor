import React, {memo, useCallback, useEffect, useState} from "react";
import {FlatList, LayoutAnimation, RefreshControl, SafeAreaView, ScrollView, StyleSheet, View} from "react-native";
import TextInputCustomComponent from "@view/text/textInputComponent";
import _const from "@constants/common";
import {COLOR_GREEN, COLOR_PAPER, COLOR_PINK, COLOR_RED} from "@constants/color";
import TextCustomComponent from "@view/text/textComponent";
import TouchOpacityButton from "@view/widget/TouchOpacityButton";
import {LAYOUT} from "@constants/globalStyles";
import {hexAToRGBA, numberWithCommas, removeNumberWithCommas, toTimestamp} from "@utilities/helper";
import {accessTotal, insertDate, onDeleteDate, requestDateNowInfo, sumDate} from "@shared/redux/actions/dateAction";
import {useSetLoading} from "@context/appContext";
import {Item} from "@shared/redux/constants/modalTypes";

const HomePage3 = memo(() => {
    const [form, setForm] = useState({
        amount: 0,
        description: ''
    })

    const [refresh, setRefresh] = useState(false)
    const [data, setData] = useState([])
    const setLoading = useSetLoading()
    const dateNow = new Date

    useEffect(() => {
        setLoading(true)
        requestDateNowInfo((data) => {
            LayoutAnimation.easeInEaseOut()
            setLoading(false)
            setData(data)
        }, () => {
            setLoading(false)
        })
    }, [])

    const _onSubmit = useCallback((data) => {
        setLoading(true)
        insertDate({
            time: toTimestamp(dateNow),
            money: form.amount,
            description: form.description,
            type: data
        }, () => {
            setForm({
                amount: 0,
                description: ''
            })
            requestDateNowInfo((data) => {
                LayoutAnimation.easeInEaseOut()
                setData(data)
                setLoading(false)
            }, () => {
                setLoading(false)
            })
        }, () => {
            setLoading(false)
        })
    }, [form])

    const _onChangeForm = useCallback((value, slug) => {
        switch (slug) {
            case 'amount':
                LayoutAnimation.easeInEaseOut()
                setForm({
                    ...form,
                    amount: value ? parseInt(removeNumberWithCommas(value)) : 0
                })
                break;
            case 'description':
                LayoutAnimation.easeInEaseOut()
                setForm({
                    ...form,
                    description: value
                })
                break;
        }
    }, [form])

    const _onDelete = useCallback(() => {
        setLoading(true)
        onDeleteDate(() => {
            requestDateNowInfo((data) => {
                LayoutAnimation.easeInEaseOut()
                setData(data)
                setLoading(false)
            }, () => {
                setLoading(false)
            })
        }, () => {
            setLoading(false)
        })
    }, [])

    const _onRefresh = useCallback(() => {
        setRefresh(true)
        requestDateNowInfo((data) => {
            LayoutAnimation.easeInEaseOut()
            setData(data)
            setRefresh(false)
        }, () => {
            setRefresh(false)
        })
    }, [])

    const renderTable = useCallback((item) => {
        const data = item.item as Item
        const index = item.index
        const money = data?._data?.money || ""
        const description = data?._data?.description || "Kh??ng c?? m?? t???"
        const type = data?._data?.type || false
        return <View style={{flexDirection: 'row'}}>
            <View style={type ? styles.box1 : styles.box2}>
                <TextCustomComponent
                    textType={"bold"}>{`${type ? '+ ' : '- '}${numberWithCommas(money) || 0}`}</TextCustomComponent>
            </View>
            <View style={type ? styles.box1 : styles.box2}>
                <TextCustomComponent numberOfLines={2}>{description}</TextCustomComponent>
            </View>
        </View>
    }, [])

    return <View style={styles.container}>
        <View>
            <View style={styles.container2}/>
            <View style={{
                width: _const.WIDTH_SCREEN * 0.95,
                alignSelf: 'center',
                marginTop: _const.HEIGHT_SCREEN * 0.08,
                paddingTop: _const.HEIGHT_SCREEN * 0.05,
                backgroundColor: 'white',
                ...LAYOUT.box_shadow,
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15
            }}>
                <View style={{height: _const.HEIGHT_SCREEN * 0.3}}>
                    <ScrollView>
                        <View style={{paddingLeft: 15}}>
                            <TextCustomComponent textType={"bold"}>{'Nh???p s??? Ti???n'}</TextCustomComponent>
                            <TextInputCustomComponent keyboardType="numeric"
                                                      style={styles.text_input} onChangeText={(value: any) => {
                                _onChangeForm(value, 'amount')
                            }} value={numberWithCommas(form.amount)}/>
                        </View>
                        <View style={{paddingLeft: 15}}>
                            <TextCustomComponent textType={"bold"}>{'M?? t??? chi ti??u'}</TextCustomComponent>
                            <TextInputCustomComponent
                                style={styles.text_input} onChangeText={(value: any) => {
                                _onChangeForm(value, 'description')
                            }} value={form.description}/>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10}}>
                            <TouchOpacityButton style={styles.button2} onPress={_onDelete}>
                                <TextCustomComponent color={'white'}
                                                     textType={"bold"}>{'Xo?? d??? li???u g???n nh???t'}</TextCustomComponent>
                            </TouchOpacityButton>
                            <TouchOpacityButton style={styles.button3} onPress={_onSubmit} data={false}>
                                <TextCustomComponent color={'white'} textType={"bold"}>{'Chi'}</TextCustomComponent>
                            </TouchOpacityButton>
                            <TouchOpacityButton style={styles.button} onPress={_onSubmit} data={true}>
                                <TextCustomComponent color={'white'} textType={"bold"}>{'Thu'}</TextCustomComponent>
                            </TouchOpacityButton>
                        </View>
                    </ScrollView>
                </View>
                <TextCustomComponent style={{paddingLeft: 15}}>
                    <TextCustomComponent>{`S??? ti???n ???? ti??u trong ng??y `}</TextCustomComponent>
                    <TextCustomComponent textType={'bold'}
                                         fontSize={20}>{sumDate(data) + ''}</TextCustomComponent>
                    <TextCustomComponent>{` vnd`}</TextCustomComponent>
                </TextCustomComponent>
                <View style={{flexDirection: 'row', marginTop: 15}}>
                    <View style={styles.container1}>
                        <TextCustomComponent textType={"bold"}>{`S??? ti???n`}</TextCustomComponent>
                    </View>
                    <View style={styles.container1}>
                        <TextCustomComponent textType={"bold"}>{`M?? t???`}</TextCustomComponent>
                    </View>
                </View>
                <View style={{height: _const.HEIGHT_SCREEN * 0.33}}>
                    <FlatList refreshControl={
                        <RefreshControl
                            refreshing={refresh}
                            onRefresh={_onRefresh}
                        />
                    } data={data} renderItem={renderTable}
                    />
                </View>
            </View>
        </View>
    </View>
})

const styles = StyleSheet.create({
    container2: {
        position: 'absolute',
        top: 0,
        left: 'auto',
        width: _const.WIDTH_SCREEN,
        height: _const.HEIGHT_SCREEN * 0.4, backgroundColor: COLOR_GREEN,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
    },
    container1: {
        width: _const.WIDTH_SCREEN * 0.475,
        height: _const.HEIGHT_SCREEN * 0.06,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: COLOR_PAPER
    },
    box1: {
        width: _const.WIDTH_SCREEN * 0.475,
        height: _const.HEIGHT_SCREEN * 0.07,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: COLOR_PAPER,
        borderWidth: 1,
        backgroundColor: hexAToRGBA(COLOR_GREEN, true)
    },
    box2: {
        width: _const.WIDTH_SCREEN * 0.475,
        height: _const.HEIGHT_SCREEN * 0.07,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: COLOR_PAPER,
        borderWidth: 1,
        backgroundColor: hexAToRGBA(COLOR_RED, true)
    },
    button3: {
        width: _const.WIDTH_SCREEN * 0.15,
        height: _const.HEIGHT_SCREEN * 0.05,
        paddingHorizontal: 10,
        backgroundColor: COLOR_RED,
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 5,
        ...LAYOUT.box_shadow_light,
        alignSelf: 'flex-end',
        marginRight: 25
    },
    button2: {
        height: _const.HEIGHT_SCREEN * 0.05,
        paddingHorizontal: 10,
        backgroundColor: COLOR_GREEN,
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 5,
        ...LAYOUT.box_shadow_light,
        alignSelf: 'flex-end',
        marginRight: 25
    },
    button: {
        width: _const.WIDTH_SCREEN * 0.2,
        height: _const.HEIGHT_SCREEN * 0.05,
        backgroundColor: COLOR_GREEN,
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 5,
        ...LAYOUT.box_shadow_light,
        alignSelf: 'flex-end',
        marginRight: 25
    },
    container: {backgroundColor: 'white', flex: 1},
    text_input: {
        width: _const.WIDTH_SCREEN * 0.85,
        height: _const.HEIGHT_SCREEN * 0.05,
        borderWidth: 2,
        borderColor: COLOR_PAPER,
        marginVertical: 15,
        borderRadius: 5,
        paddingLeft: 15
    },

})
export default HomePage3
