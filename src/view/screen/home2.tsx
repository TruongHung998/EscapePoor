import React, {memo, useState} from "react";
import {RefreshControl, SafeAreaView, ScrollView, StyleSheet} from "react-native";
import DatePickerCalendarCustom from "@view/widget/DatePickerCalendar";

const HomePage2 = memo(() => {
    const [refresh, setRefresh] = useState(false)
    return <SafeAreaView style={styles.container}>
        <ScrollView refreshControl={
            <RefreshControl
                refreshing={refresh}
                onRefresh={() => {
                }}
            />
        }>
            <DatePickerCalendarCustom/>
        </ScrollView>
    </SafeAreaView>
})

const styles = StyleSheet.create({
    container: {backgroundColor: 'white', flex: 1}
})
export default HomePage2
