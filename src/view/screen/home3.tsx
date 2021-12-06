import React, {memo, useCallback, useState} from "react";
import {SafeAreaView, ScrollView, StyleSheet, View} from "react-native";
import TextInputCustomComponent from "@view/text/textInputComponent";
import _const from "@constants/common";
import {COLOR_GREEN, COLOR_PAPER} from "@constants/color";
import TextCustomComponent from "@view/text/textComponent";
import TouchOpacityButton from "@view/widget/TouchOpacityButton";
import {LAYOUT} from "@constants/globalStyles";

const HomePage3 = memo(() => {
    const [form, setForm] = useState({
        amount: '',
        description: ''
    })

    const _onChangeForm = useCallback((value, slug) => {
        switch (slug) {
            case 'amount':
                setForm({
                    ...form,
                    amount: value
                })
                break;
            case 'description':
                setForm({
                    ...form,
                    description: value
                })
                break;
        }
    }, [])


    return <SafeAreaView style={styles.container}>
        <View style={{height: _const.HEIGHT_SCREEN * 0.3}}>
            <ScrollView>
                <View style={{paddingLeft: 15}}>
                    <TextCustomComponent textType={"bold"}>{'Nhập số Tiền'}</TextCustomComponent>
                    <TextInputCustomComponent keyboardType="numeric"
                                              style={styles.text_input} onChangeText={(value: any) => {
                        _onChangeForm(value, 'amount')
                    }}/>
                </View>
                <View style={{paddingLeft: 15}}>
                    <TextCustomComponent textType={"bold"}>{'Mô tả chi tiêu'}</TextCustomComponent>
                    <TextInputCustomComponent keyboardType="numeric"
                                              style={styles.text_input} onChangeText={(value: any) => {
                        _onChangeForm(value, 'description')
                    }}/>
                </View>
                <TouchOpacityButton style={styles.button}>
                    <TextCustomComponent color={'white'} textType={"bold"}>{'Lưu'}</TextCustomComponent>
                </TouchOpacityButton>

            </ScrollView>
        </View>
        <ScrollView>
            <TextCustomComponent>
                <TextCustomComponent>{`Số tiền đã tiêu trong ngày `}</TextCustomComponent>
                <TextCustomComponent textType={'bold'}
                                     fontSize={20}>{`20000`}</TextCustomComponent>
                <TextCustomComponent>{` vnd`}</TextCustomComponent>
            </TextCustomComponent>
        </ScrollView>
    </SafeAreaView>
})

const styles = StyleSheet.create({
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
