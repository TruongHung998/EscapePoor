/**
 * Define screen names as constants here
 */

import {ICON_NAME} from "./iconName";
import {COLOR_GREEN, COLOR_ORANGE, COLOR_PINK, COLOR_RED} from "./color";

const SCREENS = {
    Home: {
        name: 'Home',
        description: 'Trang Chủ',
        activeColor: COLOR_PINK,
        iconName: ICON_NAME.ICON_HOME
    },
    Example1: {
        name: 'Example1',
        description: 'Lịch tiêu dùng',
        activeColor: COLOR_ORANGE,
        iconName: ICON_NAME.SCHEDULE
    },
    Example2: {
        name: 'Example1',
        description: 'Tiêu dùng trong ngày',
        activeColor: COLOR_GREEN,
        iconName: ICON_NAME.MONEY
    },
};

export {SCREENS};
