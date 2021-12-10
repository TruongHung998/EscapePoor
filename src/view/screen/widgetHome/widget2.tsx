import React, {memo} from "react";
import {Image, StyleSheet, View} from "react-native";
import TextCustomComponent from "@view/text/textComponent";
import {numberWithCommas} from "@utilities/helper";
import _const from "@constants/common";
import {LAYOUT} from "@constants/globalStyles";
import {sumDate} from "@shared/redux/actions/dateAction";

export const Widget2 = memo(({data}: any) => {
    const sum = sumDate(data)
    console.log(sum)
    const string = sum && sum[0] === "-" ? 'Hôm nay tiêu mẹ nó mất :(' : 'Kiếm tiền giờ dễ quá =))'
    return <View style={styles.view1}>
        <View style={styles.view2}>
            <TextCustomComponent textType={'bold'} fontSize={25}
                                 color={'white'}>{'Anh yêu Lan Huyền Lắm'}</TextCustomComponent>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require("../../../assets/images/pig.png")} style={styles.image}/>
            <View>
                <TextCustomComponent textType={"regular"} fontSize={20}>
                    {string}
                </TextCustomComponent>
                <View style={{
                    width: _const.WIDTH_SCREEN * 0.65,
                    backgroundColor: 'white',
                    height: _const.HEIGHT_SCREEN * 0.04, ...LAYOUT.box_shadow_light,
                    borderRadius: 10,
                    alignSelf: 'center',
                    marginTop: 10
                }}>
                    <TextCustomComponent>
                        <TextCustomComponent textType={"bold"} fontSize={25} style={{textAlign: 'center'}}>
                            {sumDate(data) + ''}
                        </TextCustomComponent>
                        <TextCustomComponent>
                            {' vnđ'}
                        </TextCustomComponent>
                    </TextCustomComponent>
                </View>
            </View>
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
    image: {
        width: _const.WIDTH_SCREEN * 0.15,
        height: _const.WIDTH_SCREEN * 0.15,

    },
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
