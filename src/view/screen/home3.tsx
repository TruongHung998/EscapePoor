import React, {memo, useCallback, useEffect, useState} from "react";
import {
    Alert,
    FlatList,
    LayoutAnimation,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View
} from "react-native";
import TextInputCustomComponent from "@view/text/textInputComponent";
import _const from "@constants/common";
import {COLOR_GREEN, COLOR_ORANGE, COLOR_PAPER, COLOR_PINK, COLOR_RED} from "@constants/color";
import TextCustomComponent from "@view/text/textComponent";
import TouchOpacityButton from "@view/widget/TouchOpacityButton";
import {LAYOUT} from "@constants/globalStyles";
import {hexAToRGBA, numberWithCommas, removeNumberWithCommas, toTimestamp} from "@utilities/helper";
import {insertDate, onDeleteDate, requestDateNowInfo, sumDate} from "@shared/redux/actions/dateAction";
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
        const description = data?._data?.description || "Không có mô tả"
        const type = data?._data?.type || false
        console.log(data?._data)
        return <View style={{flexDirection: 'row'}}>
            <View style={type ? styles.box1 : styles.box2}>
                <TextCustomComponent
                    textType={"bold"}>{`${type ? '+ ' : '- '}${numberWithCommas(money) || 0}`}</TextCustomComponent>
            </View>
            <View style={type ? styles.box1 : styles.box2}>
                <TextCustomComponent>{description}</TextCustomComponent>
            </View>
        </View>
    }, [])

    return <SafeAreaView style={styles.container}>
        <View style={{height: _const.HEIGHT_SCREEN * 0.3}}>
            <ScrollView>
                <View style={{paddingLeft: 15}}>
                    <TextCustomComponent textType={"bold"}>{'Nhập số Tiền'}</TextCustomComponent>
                    <TextInputCustomComponent keyboardType="numeric"
                                              style={styles.text_input} onChangeText={(value: any) => {
                        _onChangeForm(value, 'amount')
                    }} value={numberWithCommas(form.amount)}/>
                </View>
                <View style={{paddingLeft: 15}}>
                    <TextCustomComponent textType={"bold"}>{'Mô tả chi tiêu'}</TextCustomComponent>
                    <TextInputCustomComponent keyboardType="numeric"
                                              style={styles.text_input} onChangeText={(value: any) => {
                        _onChangeForm(value, 'description')
                    }} value={form.description}/>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10}}>
                    <TouchOpacityButton style={styles.button2} onPress={_onDelete}>
                        <TextCustomComponent color={'white'}
                                             textType={"bold"}>{'Xoá dữ liệu gần nhất'}</TextCustomComponent>
                    </TouchOpacityButton>
                    <TouchOpacityButton style={styles.button3} onPress={_onSubmit} data={false}>
                        <TextCustomComponent color={'white'} textType={"bold"}>{'Out'}</TextCustomComponent>
                    </TouchOpacityButton>
                    <TouchOpacityButton style={styles.button} onPress={_onSubmit} data={true}>
                        <TextCustomComponent color={'white'} textType={"bold"}>{'In'}</TextCustomComponent>
                    </TouchOpacityButton>
                </View>
            </ScrollView>
        </View>
        <TextCustomComponent style={{paddingLeft: 15}}>
            <TextCustomComponent>{`Số tiền đã tiêu trong ngày `}</TextCustomComponent>
            <TextCustomComponent textType={'bold'}
                                 fontSize={20}>{sumDate(data) + ''}</TextCustomComponent>
            <TextCustomComponent>{` vnd`}</TextCustomComponent>
        </TextCustomComponent>
        <View style={{flexDirection: 'row', marginTop: 15}}>
            <View style={styles.container1}>
                <TextCustomComponent textType={"bold"}>{`Số tiền`}</TextCustomComponent>
            </View>
            <View style={styles.container1}>
                <TextCustomComponent textType={"bold"}>{`Mô tả`}</TextCustomComponent>
            </View>
        </View>
        <View style={{height: _const.HEIGHT_SCREEN * 0.4}}>
            <FlatList refreshControl={
                <RefreshControl
                    refreshing={refresh}
                    onRefresh={_onRefresh}
                />
            } data={data} renderItem={renderTable}
            />
        </View>
    </SafeAreaView>
})

const styles = StyleSheet.create({
    container1: {
        width: _const.WIDTH_SCREEN * 0.5,
        height: _const.HEIGHT_SCREEN * 0.08,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: COLOR_PAPER
    },
    box1: {
        width: _const.WIDTH_SCREEN * 0.5,
        height: _const.HEIGHT_SCREEN * 0.08,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: COLOR_PAPER,
        borderWidth: 1,
        backgroundColor: hexAToRGBA(COLOR_GREEN, true)
    },
    box2: {
        width: _const.WIDTH_SCREEN * 0.5,
        height: _const.HEIGHT_SCREEN * 0.08,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: COLOR_PAPER,
        borderWidth: 1,
        backgroundColor: hexAToRGBA(COLOR_RED, true)
    },
    button3: {
        width: _const.WIDTH_SCREEN * 0.2,
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
        width: _const.WIDTH_SCREEN * 0.9,
        height: _const.HEIGHT_SCREEN * 0.05,
        borderWidth: 2,
        borderColor: COLOR_PAPER,
        marginVertical: 15,
        borderRadius: 5,
        paddingLeft: 15
    },

})
export default HomePage3
