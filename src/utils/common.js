import { jwtDecode } from "jwt-decode";
import * as yup from 'yup';
import StorageKeys from "../constants/storage_keys";

export function getRole() {
    const decodeAC = jwtDecode(localStorage.getItem(StorageKeys.ACCESS_TOKEN) || 'access token');
    return decodeAC;
    // Admin Criteria15 Service15 System15 User15 ==> Full role
}

export function formatDateTime(inputDateTime) {
    const utcTime = new Date(inputDateTime.replace("+00:00", ""));
    // Convert to local time
    const localTime = new Date(utcTime);
    localTime.setMinutes(utcTime.getMinutes() - utcTime.getTimezoneOffset());
    // Format the local time
    const options = {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    };
    return localTime.toLocaleString('en-US', options);
}

export function convertToLocalDate(inputDate, isShowDate) {
    // inputDateTime format: 11/19/2023
    var [month, day, year] = inputDate.split('/');
    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }
    return isShowDate ? `${year}-${month}-${day}` : `${year}-${month}`;
}

export const passwordValidation = yup.string().required('Please enter the required field.').min(8, 'The password is between 8 and 20 characters.').max(20, "The password is between 8 and 20 characters.").matches('(?=^.{8,20}$)(?=.*\\d)(?![.\\n])(?=.*[a-z|A-Z]).*$', 'The password must contain at least 1 letter and 1 number.')

export const clearLocalStorage = () => {
    // localStorage.removeItem(StorageKeys.USER);
    localStorage.removeItem(StorageKeys.ACCESS_TOKEN);
    localStorage.removeItem(StorageKeys.REFRESH_TOKEN);
}

export function getCloneColors(numColors) {
    const mainColors = [
        "#FF0000", // Red
        "#00FF00", // Green
        "#0000FF", // Blue
        "#FFFF00", // Yellow
        "#FF00FF", // Magenta
        "#00FFFF", // Cyan
        "#800000", // Maroon
        "#008000", // Olive
        "#000080", // Navy
        "#808000", // Olive Green
        "#800080", // Purple
        "#008080", // Teal
        "#A52A2A", // Brown
        "#DC143C", // Crimson
        "#006400", // Dark Green
        "#FF4500", // Orange Red
        "#32CD32", // Lime Green
        "#800080", // Purple
        "#FFD700", // Gold
        "#4B0082", // Indigo
        "#FF6347", // Tomato
        "#2E8B57", // Sea Green
        "#4682B4", // Steel Blue
        "#8B008B", // Dark Magenta
        "#556B2F", // Dark Olive Green
        "#9932CC", // Dark Orchid
        "#8B0000", // Dark Red
        "#5F9EA0", // Cadet Blue
        "#00CED1", // Dark Turquoise
        "#8A2BE2", // Blue Violet
        "#FF1493", // Deep Pink
        "#1E90FF", // Dodger Blue
        "#B22222", // Fire Brick
        "#4B0082", // Indigo
        "#008B8B", // Dark Cyan
        "#2F4F4F", // Dark Slate Gray
        "#FF8C00", // Dark Orange
        "#FF69B4", // Hot Pink
        "#00BFFF", // Deep Sky Blue
        "#DAA520", // Goldenrod
        "#00FA9A", // Medium Spring Green
        "#9370DB", // Medium Purple
        "#1E90FF", // Dodger Blue
        "#FFA07A", // Light Salmon
        "#20B2AA", // Light Sea Green
        "#FFB6C1", // Light Pink
        "#B0E0E6", // Powder Blue
        "#FF4500", // Orange Red
        "#8B4513", // Saddle Brown
        "#40E0D0", // Turquoise
    ];
    const actualLength = Math.min(numColors, mainColors.length);
    return mainColors.slice(0, actualLength);
}
