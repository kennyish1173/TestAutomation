module.exports = {
    windowIndex: 3,
    closeButton: '#topHeader > div > div.buttons > div.close_win',
    closeButton2: '#topHeader > div > div.buttons > div.close_win > span > i',
    //roomListMenuIcon: '#app > div > div.header > div:nth-child(2) > div.layout.row.wrap.justify-center.align-center > div:nth-child(1) > i', //old
    //roomListMenuIcon: '#topHeader > div > div > div.teamList > div > div:nth-child(3)', //not interactable
    //expandIcon: '#topHeader > div > div > div.teamList > div > div.flex.xs1.offset-xs1 > i', //ver 0.7.110
    //expandIcon: '#topHeader > div > div.header_bottom > div.left_arrow > i', //ver 0.7.115
    expandIcon: '#topHeader > div > div.header_bottom > span:nth-child(3) > span > div > i',
    //expandIcon: '#topHeader > div > div.header_bottom > span:nth-child(3)',
    //collapseIcon: '#topHeader > div > div > div.teamList > div > div.flex.xs1.offset-xs1', //ver 0.7.110
    collapseIcon: '#topHeader > div > div.header_bottom > div.right_arrow', //ver 0.7.115
    //settingsMenuIcon: '#app > div > div.header > div:nth-child(2) > div.layout.row.wrap.justify-center.align-center > div:nth-child(2) > i', //old
    //settingsMenuIcon: '#topHeader > div > div > div.layout.row.wrap.justify-center.align-center > div.flex.xs6 > i', //ver 0.7.110
    settingsMenuIcon: '#topHeader > div > div:nth-child(2) > i', //ver 0.7.115
    //currentRoomName: "#app > div.application--wrap > aside > div:nth-child(1) > div > div:nth-child(1) > div > div > div.room_box.current_room > div.room > div.room_name", //old
    currentRoomName: '#app > div.application--wrap > main > div > div > div > div:nth-child(1) > div',
    //micButton: '#micButton',
    micButton: '#app > div.application--wrap > main > div > div > div > footer > v-row > button:nth-child(1)',
    //micStatusIcon: '#micStatusIcon.icon.icon.icon-mic-off',
    //micStatusIcon: '',
    //micStatusOffIcon: '#micStatusIcon.icon.icon.icon-mic-off',
    //micStatusOff: 'icon-mic-off',
    //micStatusOffIcon: '#app > div > footer > v-row > button:nth-child(1) > div > div > i',   
    //micStatusOnIcon: '#micStatusIcon.icon.icon.icon-mic-on',
    //micStatusOnIcon: '#app > div > footer > v-row > button.control_btn.control_on.btn > div > div > i',    
    //screenShareButton: '#screenShareButton',
    screenShareButton: '#app > div.application--wrap > main > div > div > div > footer > v-row > button:nth-child(2)',
    //screenShareStatusIcon: '#screenShareStatusIcon',
    //screenShareStatusIcon: '',
    //screenshareSTatusOffIcon: '#screenShareStatusIcon.icon.icon.icon-screen-off',
    //screenshareSTatusOffIcon: '#app > div > footer > v-row > button:nth-child(2) > div > div > i',
    //screenshareSTatusOnIcon: '#screenShareStatusIcon.icon.icon.icon-screen-off'
    //screenshareSTatusOnIcon: '#app > div > footer > v-row > button.control_btn.control_on.btn.btn--flat > div > div > i'    

    // current Room Pane
    //avatar: '#app > div.application--wrap > main > div > div > div > div.container.pa-0.wrap.justify-center.fluid > div > div.avatar_repeat.pa-0.ma-0 > div > div > div > img',
    //avatar: '#app > div.application--wrap > main > div > div > div > div.container.pa-0.wrap.justify-center.fluid > div > div.avatar_repeat.pa-0.ma-0 > div > div > div',
    //avatar: '#app > div.application--wrap > main > div > div > div > div.container.pa-0.wrap.justify-center.fluid > div > div.avatar_repeat.pa-0.ma-0 > div > div', // ver 0.7.213
    avatar: '#myData > div.avatar_item > div',
    //#myData > div.avatar_item > div > div.avatar.avatar.teal.lighten-5 > img
    
    avatarNoImage: '#app > div.application--wrap > main > div > div > div > div.container.pa-0.wrap.justify-center.fluid > div > div.avatar_repeat.pa-0.ma-0 > div > div > div > span' 
}   