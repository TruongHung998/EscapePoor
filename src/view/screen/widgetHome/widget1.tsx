import React, {memo} from "react";
import {StyleSheet, View} from "react-native";
import TextCustomComponent from "@view/text/textComponent";
import {numberWithCommas} from "@utilities/helper";
import _const from "@constants/common";
import {LAYOUT} from "@constants/globalStyles";

export const Widget1 = memo(({data}: any) => {
    const total = data?.total || "0"
    const target = data?.target || "0"

    return <View style={styles.view1}>
        <View style={styles.view2}>
            <TextCustomComponent textType={'bold'} fontSize={25} color={'white'}>{'Tổng quát'}</TextCustomComponent>
        </View>
        <View style={styles.view3}>
            <TextCustomComponent textType={"bold"}>{`Mục tiêu `}</TextCustomComponent>
            <TextCustomComponent>
                <TextCustomComponent textType={'light'}
                                     fontSize={25}>{`${numberWithCommas(target)}`}</TextCustomComponent>
                <TextCustomComponent>{` vnđ`}</TextCustomComponent>
            </TextCustomComponent>
        </View>
        <View style={styles.view3}>
            <TextCustomComponent textType={"bold"}>{`Số dư `}</TextCustomComponent>
            <TextCustomComponent>
                <TextCustomComponent textType={'light'}
                                     fontSize={25}>{`${numberWithCommas(total)}`}</TextCustomComponent>
                <TextCustomComponent>{` vnđ`}</TextCustomComponent>
            </TextCustomComponent>
        </View>
        {/*<TextInputCustomComponent keyboardType="numeric"*/}
        {/*                          style={stylesUser.text_input} onChangeText={(value: any) => {*/}
        {/*    setMoneyAmount(removeNumberWithCommas(value))*/}
        {/*}} value={numberWithCommas(moneyAmount)}/>*/}
        {/*<TouchOpacityButton style={stylesUser.button} onPress={_onUpdateAmount}>*/}
        {/*    <TextCustomComponent color={'white'}>ss</TextCustomComponent>*/}
        {/*</TouchOpacityButton>*/}
    </View>
})

const styles = StyleSheet.create({
    view3: {
        width: _const.WIDTH_SCREEN * 0.85,
        backgroundColor: 'white', ...LAYOUT.box_shadow_light,
        alignSelf: 'center',
        marginVertical: 5,
        borderRadius: 10,
        paddingTop: 20,
        paddingLeft: 15
    },
    view2: {
        backgroundColor: '#aececf', width: _const.WIDTH_SCREEN * 0.9,
        height: _const.HEIGHT_SCREEN * 0.06,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        paddingLeft: 20,
        paddingTop: 10
    },
    view1: {
        width: _const.WIDTH_SCREEN * 0.9,
        backgroundColor: 'white',
        borderRadius: 15,
        ...LAYOUT.box_shadow,
        alignSelf: 'center',
        marginTop: 15,
        paddingBottom: 20
    },
})
