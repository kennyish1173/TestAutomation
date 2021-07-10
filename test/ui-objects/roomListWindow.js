module.exports = {
    windowIndex: 3,
    //groupSelector: '#topHeader > div > div.header_bottom > div > div:nth-child(1) > div > div > div > div',
    groupSelector: '#topHeader > div > div.header_bottom > div > div.menu > div > div > div',
    group01: '#app > div.menu__content.menuable__content__active > div > div:nth-child(1) > a > div > div', //Spectron自動化
    group02: '#app > div.menu__content.menuable__content__active > div > div:nth-child(2) > a > div > div', //自動化試験用チーム
    currentRoom: '#app > div.application--wrap > aside > div:nth-child(1) > div > div:nth-child(1) > div > div > div.room_box.current_room',
    //roomName01: '#app > div.application--wrap > div > div > div:nth-child(1) > div.room_list > div > div:nth-child(1) > div > div.room_name', //old
    //roomName01:             '#app > div.application--wrap > aside > div:nth-child(1) > div > div:nth-child(1) > div > div > div:nth-child(1)', //no member
    //roomName01: '#app > div.application--wrap > aside > div:nth-child(1) > div > div:nth-child(1) > div > div > div:nth-child(1) > div.room > div.room_name',
    currentRoom_text: '#app > div.application--wrap > aside > div:nth-child(1) > div > div:nth-child(2) > div > div > div.room_box.current_room > div.room > div.room_name',
    roomName01: '#app > div.application--wrap > aside > div:nth-child(1) > div > div:nth-child(2) > div > div > div:nth-child(1) > div',
    roomName01_text: '#app > div.application--wrap > aside > div:nth-child(1) > div > div:nth-child(2) > div > div > div:nth-child(1) > div.room > div.room_name',
    //roomName02: '#app > div.application--wrap > div > div > div:nth-child(1) > div.room_list > div > div:nth-child(2) > div > div.room_name', //old
    roomName02: '#app > div.application--wrap > aside > div:nth-child(1) > div > div:nth-child(2) > div > div > div:nth-child(2)',
    //toggleOfflineMember : 'div.input-group--selection-controls__ripple' // old
    toggleOfflineMember : '#app > div.application--wrap > aside > div:nth-child(1) > div > div.room_buttons > div > div > div > div.input-group__input > div > div.input-group--selection-controls__ripple',
    //manageRoomButton: '#app > div.application--wrap > aside > div:nth-child(1) > div > div.room_buttons > div > div > span:nth-child(2) > button > div', //ver 0.9.117
    manageRoomButton: '#app > div.application--wrap > aside > div:nth-child(1) > div > div.container.room_buttons.setting_box > div > div:nth-child(2) > button',
    inviteMemberButton: '#app > div.application--wrap > aside > div:nth-child(1) > div > div.room_buttons > div > div > span:nth-child(4) > button',
    lobbyText: '#app > div.application--wrap > aside > div:nth-child(1) > div > div:nth-child(2) > div > div:nth-child(2) > div.offline_title',
    offlinemember01: '#app > div.application--wrap > aside > div:nth-child(1) > div > div:nth-child(2) > div > div:nth-child(2) > div.offline_member_list > div:nth-child(1) > div > div.offline_member > div.offline_member_name',
    inviteButton: '#app > div.application--wrap > aside > div:nth-child(1) > div > div.container.room_buttons.setting_box > div > div:nth-child(3) > button'
}