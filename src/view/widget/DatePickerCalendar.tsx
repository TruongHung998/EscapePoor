import React, {memo, useCallback, useState} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import moment from 'moment';
import {useTranslation} from 'react-i18next';
import _const from '../../constants/common'
import TextCustomComponent from '../text/textComponent'
import {useSetLoading} from "@context/appContext";

const INITIAL_DATE = moment(new Date()).format('YYYY-MM-DD');

const dummyPromotion = [23, 24, 8, 17];

type DatePicker = {
    initialDate?: any
}

const DatePickerCalendarCustom = memo(({initialDate = INITIAL_DATE}: DatePicker) => {
    const {t} = useTranslation();
    LocaleConfig.locales['vi'] = {
        monthNames: [
            t('JANUARY'),
            t('FEBRUARY'),
            t('MARCH'),
            t('APRIL'),
            t('MAY'),
            t('JUNE'),
            t('JULY'),
            t('AUGUST'),
            t('SEPTEMBER'),
            t('OCTOBER'),
            t('NOVEMBER'),
            t('DECEMBER'),
        ],
        monthNamesShort: [
            t('JANUARY'),
            t('FEBRUARY'),
            t('MARCH'),
            t('APRIL'),
            t('MAY'),
            t('JUNE'),
            t('JULY'),
            t('AUGUST'),
            t('SEPTEMBER'),
            t('OCTOBER'),
            t('NOVEMBER'),
            t('DECEMBER'),
        ],
        dayNames: [t('SUNDAY'), t('MONDAY'), t('TUESDAY'), t('WEDNESDAY'), t('THURSDAY'), t('FRIDAY'), t('SATURDAY')],
        dayNamesShort: [t('SUNDAY'), t('MONDAY'), t('TUESDAY'), t('WEDNESDAY'), t('THURSDAY'), t('FRIDAY'), t('SATURDAY')],
        today: t('TODAY'),
    };
    LocaleConfig.defaultLocale = 'vi';
    const setLoading = useSetLoading()

    const [selected, setSelected] = useState(initialDate);
    const onDayPress = (day: any) => {
        setSelected(day.dateString);
    };
    const _onPress = useCallback(() => {
    }, [selected]);

    const renderDay = useCallback(
        (item) => {
            const isPromotion = dummyPromotion.indexOf(item?.date?.day);
            return (
                <TouchableOpacity
                    activeOpacity={item.state === 'disabled' ? 1 : 0.5}
                    style={[
                        styles.day,
                        {
                            backgroundColor: selected === item.date.dateString ? 'red' : 'white',
                        },
                    ]}
                    onPress={() => {
                        if (item.state !== 'disabled') onDayPress(item.date);
                    }}
                >
                    <TextCustomComponent
                        style={{
                            fontSize: item.state !== 'disabled' ? 16 : 15,
                            color:
                                selected === item.date.dateString
                                    ? 'white'
                                    : item.state !== 'disabled'
                                        ? 'black'
                                        : 'red',
                        }}
                    >
                        {`${item?.date?.day}`}
                    </TextCustomComponent>
                    <TextCustomComponent
                        style={{
                            fontSize: item.state !== 'disabled' ? 11 : 10,
                            color:
                                selected === item.date.dateString
                                    ? 'white'
                                    : item.state !== 'disabled'
                                        ? 'black'
                                        : 'red',
                        }}
                    >
                        {`2350k`}
                    </TextCustomComponent>
                </TouchableOpacity>
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
        borderRadius: 10,
        width: _const.WIDTH_SCREEN * 0.14,
        height: _const.HEIGHT_SCREEN * 0.12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {position: 'absolute', top: 0, right: 0},
    title_button: {
        color: 'white',
    },
    calendar: {
        height: _const.HEIGHT_SCREEN * 0.4,
        borderRadius: 10,
    },
    button: {
        backgroundColor: 'red',
        width: _const.WIDTH_SCREEN * 0.8,
        height: _const.HEIGHT_SCREEN * 0.05,
        borderRadius: 10,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: Platform.OS === 'android' ? _const.HEIGHT_SCREEN * 0.1 : _const.HEIGHT_SCREEN * 0.08,
        marginBottom: 25,
        flexDirection: 'row',
    },
    container: {
        backgroundColor: 'white',
        width: _const.WIDTH_SCREEN,
        height: _const.HEIGHT_SCREEN * 0.85,
        borderRadius: 10,
    },
});
export default DatePickerCalendarCustom;
