import React, {memo, useCallback, useState} from 'react';
import {PixelRatio, StyleSheet, View} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import moment from 'moment';
import {useTranslation} from 'react-i18next';
import _const from '../../constants/common'
import TextCustomComponent from '../text/textComponent'
import {useSetLoading} from "@context/appContext";
import {COLOR_GREEN, COLOR_ORANGE, COLOR_RED} from "@constants/color";
import {ItemDay} from "@shared/redux/constants/modalTypes";
import {hexAToRGBA, numberWithCommas, removeNumberWithCommas} from "@utilities/helper";

const INITIAL_DATE = moment(new Date()).format('YYYY-MM-DD');

const dummyPromotion = [23, 24, 8, 17];

type DatePicker = {
    initialDate?: any,
    data: ItemDay[]
}

const DatePickerCalendarCustom = memo(({data = [], initialDate = INITIAL_DATE}: DatePicker) => {
    const {t} = useTranslation();
    LocaleConfig.locales['vi'] = {
        monthNames: [
            t('Tháng 1'),
            t('Tháng 2'),
            t('Tháng 3'),
            t('Tháng 4'),
            t('Tháng 5'),
            t('Tháng 6'),
            t('Tháng 7'),
            t('Tháng 8'),
            t('Tháng 9'),
            t('Tháng 10'),
            t('Tháng 11'),
            t('Tháng 12'),
        ],
        monthNamesShort: [
            t('Tháng 1'),
            t('Tháng 2'),
            t('Tháng 3'),
            t('Tháng 4'),
            t('Tháng 5'),
            t('Tháng 6'),
            t('Tháng 7'),
            t('Tháng 8'),
            t('Tháng 9'),
            t('Tháng 10'),
            t('Tháng 11'),
            t('Tháng 12'),
        ],
        dayNames: [t('CN'), t('T2'), t('T3'), t('T4'), t('T5'), t('T6'), t('T7')],
        dayNamesShort: [t('CN'), t('T2'), t('T3'), t('T4'), t('T5'), t('T6'), t('T7')],
        today: t('Hôm nay'),
    };
    LocaleConfig.defaultLocale = 'vi';
    const setLoading = useSetLoading()

    const [selected, setSelected] = useState(initialDate);
    const onDayPress = (day: any) => {
        setSelected(day.dateString);
    };

    const renderDay = useCallback(
        (item) => {
            const value = queryDate(data, item)
            return (
                <View
                    style={[
                        styles.day
                    ]}
                >
                    <TextCustomComponent
                        style={{
                            fontSize: 15,
                            color: 'black'
                        }} textType={"bold"}
                    >
                        {`${item?.date?.day}`}
                    </TextCustomComponent>
                    <TextCustomComponent
                        style={{
                            fontSize: PixelRatio.get() <= 2 ? 10 : 12,
                            color: value[0] === '-' ? COLOR_RED : COLOR_GREEN
                        }} textType={"bold"}
                    >
                        {`${addK(value)}`}
                    </TextCustomComponent>
                </View>
            );
        },
        [dummyPromotion, onDayPress, selected],
    );
    return (
        <View style={styles.container}>
            <Calendar
                dayComponent={renderDay}
                style={styles.calendar}
                // Specify theme properties to override specific styles for calendar parts. Default = {}
                theme={{
                    textMonthFontSize: 20,
                    textDayHeaderFontSize: 16,
                }}
                enableSwipeMonths={true}
                onDayPress={onDayPress}

                /*// @ts-ignore */
            />
        </View>
    );
});

const styles = StyleSheet.create({
    day: {
        width: _const.WIDTH_SCREEN * 0.14,
        height: _const.HEIGHT_SCREEN * 0.12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: hexAToRGBA(COLOR_ORANGE, true),

    },
    icon: {position: 'absolute', top: 0, right: 0},
    title_button: {
        color: 'white',
    },
    calendar: {
        height: _const.HEIGHT_SCREEN * 0.4,
    },
    container: {
        backgroundColor: 'white',
        width: _const.WIDTH_SCREEN,
        height: _const.HEIGHT_SCREEN * 0.85,
        borderRadius: 10,
    },
});
export default DatePickerCalendarCustom;

const queryDate = (dateArray: ItemDay[], date: any) => {
    const _date = moment(date.date.dateString).format('MM/DD/YYYY')
    let value = "0"
    dateArray.forEach((item) => {
        if (item._data.date === _date) {
            value = item._data.money
        }
    })
    return value
}
const addK = (string: string) => {
    if (string) {
        let split = string[0] === "-" ? string.slice(1) : string.slice(0)
        const prefix = string[0] === "-" ? "-" : "+"
        if (split !== '0') {
            const num = parseInt(removeNumberWithCommas(split))
            console.log(num)
            if (num >= 1000) {
                return prefix + numberWithCommas(num / 1000) + 'k'
            } else return prefix + num
        } else return ""
    } else return "0đ"
}
