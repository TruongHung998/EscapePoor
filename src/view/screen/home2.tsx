import React, {memo, useCallback, useEffect, useState} from "react";
import {LayoutAnimation, RefreshControl, SafeAreaView, ScrollView, StyleSheet} from "react-native";
import DatePickerCalendarCustom from "@view/widget/DatePickerCalendar";
import {requestCalendar} from "@shared/redux/actions/dateAction";
import {useSetLoading} from "@context/appContext";

const HomePage2 = memo(() => {
    const [refresh, setRefresh] = useState(false)
    const setLoading = useSetLoading()
    const [data, setData] = useState([])

    useEffect(() => {
        setLoading(true)
        requestCalendar((data) => {
            LayoutAnimation.easeInEaseOut()
            setLoading(false)
            setData(data)
        }, () => {
            setLoading(false)
        })
    }, [])

    const _onRefresh = useCallback(() => {
        setRefresh(true)
        requestCalendar((data) => {
            LayoutAnimation.easeInEaseOut()
            setRefresh(false)
            setData(data)
        }, () => {
            setRefresh(false)
        })
    }, [])
    return <SafeAreaView style={styles.container}>
        <ScrollView refreshControl={
            <RefreshControl
                refreshing={refresh}
                onRefresh={_onRefresh}
            />
        }>
            <DatePickerCalendarCustom data={data}/>
        </ScrollView>
    </SafeAreaView>
})

const styles = StyleSheet.create({
    container: {backgroundColor: 'white', flex: 1}
})
export default HomePage2
