import React, {memo, useCallback, useEffect, useState} from "react";
import {Alert, RefreshControl, SafeAreaView, ScrollView, StyleSheet, View} from "react-native";
import TextInputCustomComponent from "@view/text/textInputComponent";
import _const from "@constants/common";
import {COLOR_GREEN, COLOR_PAPER} from "@constants/color";
import TextCustomComponent from "@view/text/textComponent";
import TouchOpacityButton from "@view/widget/TouchOpacityButton";
import {LAYOUT} from "@constants/globalStyles";
import {numberWithCommas, removeNumberWithCommas, toTimestamp} from "@utilities/helper";
import {insertDate, onDeleteDate, requestDateNowInfo, sumDate} from "@shared/redux/actions/dateAction";
import {useSetLoading} from "@context/appContext";

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
            setLoading(false)
            setData(data)
        }, () => {
            setLoading(false)
        })
    }, [])

    const _onSubmit = useCallback(() => {
        setLoading(true)
        insertDate({
            time: toTimestamp(dateNow),
            money: form.amount,
            description: form.description
        }, () => {
            setForm({
                amount: 0,
                description: ''
            })
            requestDateNowInfo((data) => {
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
                setForm({
                    ...form,
                    amount: parseInt(removeNumberWithCommas(value))
                })
                break;
            case 'description':
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
                setData(data)
                setLoading(false)
            }, () => {
                setLoading(false)
            })
        }, () => {
            setLoading(false)
        })
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
                    <TouchOpacityButton style={styles.button} onPress={_onSubmit}>
                        <TextCustomComponent color={'white'} textType={"bold"}>{'Lưu'}</TextCustomComponent>
                    </TouchOpacityButton>
                </View>
            </ScrollView>
        </View>
        <ScrollView refreshControl={
            <RefreshControl
                refreshing={refresh}
                onRefresh={() => {
                }}
            />
        }>
            <TextCustomComponent style={{paddingLeft: 15}}>
                <TextCustomComponent>{`Số tiền đã tiêu trong ngày `}</TextCustomComponent>
                <TextCustomComponent textType={'bold'}
                                     fontSize={20}>{sumDate(data) + ''}</TextCustomComponent>
                <TextCustomComponent>{` vnd`}</TextCustomComponent>
            </TextCustomComponent>
        </ScrollView>
    </SafeAreaView>
})

const styles = StyleSheet.create({
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
