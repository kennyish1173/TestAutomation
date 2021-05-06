module.exports = {
    windowIndex: 3,
    currentRoom: '#app > div.application--wrap > aside > div:nth-child(1) > div > div:nth-child(1) > div > div > div.room_box.current_room',
    //roomName01: '#app > div.application--wrap > div > div > div:nth-child(1) > div.room_list > div > div:nth-child(1) > div > div.room_name', //old
    roomName01: '#app > div.application--wrap > aside > div:nth-child(1) > div > div:nth-child(1) > div > div > div:nth-child(1)',
    //roomName02: '#app > div.application--wrap > div > div > div:nth-child(1) > div.room_list > div > div:nth-child(2) > div > div.room_name', //old
    roomName02: '#app > div.application--wrap > aside > div:nth-child(1) > div > div:nth-child(1) > div > div > div:nth-child(2)',
    //toggleOfflineMember : 'div.input-group--selection-controls__ripple' // old
    toggleOfflineMember : '#app > div.application--wrap > aside > div:nth-child(1) > div > div.room_buttons > div > div > div > div.input-group__input > div > div.input-group--selection-controls__ripple',
    manageRoomButton: '#app > div.application--wrap > aside > div:nth-child(1) > div > div.room_buttons > div > div > span:nth-child(2) > button > div',
    inviteMemberButton: '#app > div.application--wrap > aside > div:nth-child(1) > div > div.room_buttons > div > div > span:nth-child(4) > button'
}