module.exports = {
    windowIndex : 2,
    closeButton: '#app > div.application--wrap > div > div.header > div.header_close > button > div',
    roomNameTextField: '#app > div.application--wrap > div > div.setting_box > div > div.input-group__input > input[type=text]',
    createNewRoomButton: '#app > div.application--wrap > div > div.setting_box > button',
    firstRoomName: '#app > div.application--wrap > div > div.room_list > div:nth-child(1) > div > div.room_name',
    firstRoomEditButton: '#app > div.application--wrap > div > div.room_list > div:nth-child(1) > div > div:nth-child(2)',
    firstRoomDeleteButton: '#app > div.application--wrap > div > div.room_list > div:nth-child(1) > div > div:nth-child(3)',
    secondRoomName: '#app > div.application--wrap > div > div.room_list > div:nth-child(2) > div > div.room_name',
    secondRoomEditButton: '#app > div.application--wrap > div > div.room_list > div:nth-child(2) > div > div:nth-child(2)',
    secondRoomDeleteButton: '#app > div.application--wrap > div > div.room_list > div:nth-child(2) > div > div:nth-child(3)',
    thirdRoomName: '#app > div.application--wrap > div > div.room_list > div:nth-child(3) > div > div.room_name',
    thirdRoomEditButton: '#app > div.application--wrap > div > div.room_list > div:nth-child(3) > div > div:nth-child(2)',
    thirdRoomDeleteButton: '#app > div.application--wrap > div > div.room_list > div:nth-child(3) > div > div:nth-child(3)',
    errorMessage: '#app > div.application--wrap > div > div.setting_box > p > font',

    //delete confirmation popup
    confirmDeleteButton: '#app > div.dialog__content.dialog__content__active > div > div > div.card__actions > button:nth-child(3)',

    //Edit room name popup
    editRoomNameTextField: '#app > div.dialog__content.dialog__content__active > div > div > div.card__text > div > div.input-group__input > input[type=text]',
    closeEditRoomButton: '#app > div.dialog__content.dialog__content__active > div > div > div.card__actions > button:nth-child(1)',
    saveEditRoomButton: '#app > div.dialog__content.dialog__content__active > div > div > div.card__actions > button:nth-child(3)',

    //Error Message
    errorMessage_null: '1文字以上で入力してください',
    errorMessage_whitespace: '空白だけの名前は設定できません'
}
