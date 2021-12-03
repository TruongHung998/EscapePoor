import React, {memo, useCallback} from "react";
import {LayoutAnimation, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import BaseHeaderHome from "../elements/header/baseHeader";
import TextInputAwareKeyboard from "../widget/TextInputAwareKeyboard";
import _const from "../../constants/common"
import LazyFastImage from "../widget/lazy_fast_image/lazy_fast_image";
import SkeletonPlaceholder from "react-native-skeleton-placeholder/lib/SkeletonPlaceholder";
import {COLOR_ORANGE, COLOR_RED} from "../../constants/color";
import {hexAToRGBA} from "../../utilities/helper";
import {LAYOUT} from "../../constants/globalStyles";
import LinearGradient from 'react-native-linear-gradient';
import TouchOpacityButton from "../widget/TouchOpacityButton";
import LoadingPlaceholder from "../widget/loadingPlaceholder";
import {useSetLoading, useShowAlert, useShowModal} from "../../context/appContext";

const HomePage = memo(() => {
    const showModal = useShowModal()
    const useAlert = useShowAlert()
    const setLoading = useSetLoading()
    const _onPressModal = useCallback(() => {
        LayoutAnimation.easeInEaseOut()
        showModal({
            childrenView: <View style={{flex: 1, backgroundColor: 'white'}}><Text
                style={{fontSize: 30, textAlign: 'center'}}>ModalBox</Text></View>,
            viewHeight: _const.HEIGHT_SCREEN * 0.7,
            isShowHeader: false
        })
    }, [])

    const _onPressAlert = useCallback(() => {
        const _dismiss = useAlert({
            visible: true,
            animationType: 'fade',
            contentTitle: 'SUCCESS',
            message: 'Alert Success',
            buttons: [{
                label: 'Back',
                active: true,
                onPress: () => {
                    _dismiss()
                }
            }],
        })
    }, [])

    const _onLoading = useCallback(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, [])

    return <SafeAreaView style={styles.container}>
        
    </SafeAreaView>
})

const styles = StyleSheet.create({
    container: {backgroundColor: 'white'},
    linear: {
        backgroundColor: "transparent",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        borderRadius: 25
    },
})
export default HomePage
