module.exports = {
    windowIndex : 3,
    windowIndex02: 1, // when opened second time onwards
    messageBoxButton: '#myStatus > div.header_userProfile > div.shoulder_btn > span > span > span > button',
    avatar: '#myStatus > div.header_userProfile > div.avatar.small_avatar.teal.lighten-5 > div',
    name: '#myStatus > div.header_userProfile > div.my_name',
    statusIcon: '#myStatus > div.header_userProfile > div.member_profile_status > div.member_icon > i',  
    currentStatus: '#myStatus > div:nth-child(3) > div > div > div > div.status_summary',

    //プレゼンス
    setToLetsTalk: '#app > div.menu__content.menuable__content__active > div > div:nth-child(1) > div:nth-child(2) > a > div.list__tile__content > div',
    setToActive: '#app > div.menu__content.menuable__content__active > div > div:nth-child(1) > div:nth-child(3) > a > div.list__tile__content > div',
    setToBusy: '#app > div.menu__content.menuable__content__active > div > div:nth-child(1) > div:nth-child(4) > a > div.list__tile__content > div',

    //カスタムステータス
    setToOpenForConsulation: '#app > div.menu__content.menuable__content__active > div > div:nth-child(3) > div:nth-child(2) > a > div.list__tile__content > div',
    setToOutForMeal: '#app > div.menu__content.menuable__content__active > div > div:nth-child(3) > div:nth-child(3) > a > div.list__tile__content > div',
    setToFocusTime: '#app > div.menu__content.menuable__content__active > div > div:nth-child(3) > div:nth-child(4) > a > div.list__tile__content > div',
    clearStatusButton: '#myStatus > div:nth-child(3) > div > div > div > button',
    
    //statusTime
    statusTimeDropDownButton: '#myStatus > div:nth-child(5) > div > div > div > div > span > span > span',
    timerValue: '#myStatus > div:nth-child(5) > div > div > div > div > span > span',
    fifteenMinutes: '#app > div.menu__content.menuable__content__active > div > div:nth-child(1) > a > div > div',
    thirtyMinutes: '#app > div.menu__content.menuable__content__active > div > div:nth-child(2) > a > div > div',
    oneHour: '#app > div.menu__content.menuable__content__active > div > div:nth-child(3) > a > div > div',
    twoHours: '#app > div.menu__content.menuable__content__active > div > div:nth-child(4) > a > div > div',
    fourHours: '#app > div.menu__content.menuable__content__active > div > div:nth-child(5) > a > div > div',
    wholeDay: '#app > div.menu__content.menuable__content__active > div > div:nth-child(6) > a > div > div',

    muteButton: '#myStatus > div.volume_control > div.volume_off',
    muteOffButton: '#myStatus > div.volume_control > div.volume_on',
    //timerValue: '#myStatus > div:nth-child(4) > div > div > span',
    
    statusTimeDropDownText: '#myStatus > div:nth-child(4) > div.menu.drop_down_menu > div > div > div > div.drop_down_text',
    statusTimeOneHour: '#app > div.menu__content.menuable__content__active > div > div:nth-child(1) > a',
    statusTimeTwoHours: '#app > div.menu__content.menuable__content__active > div > div:nth-child(2) > a',
    statusTimeFourHours: '#app > div.menu__content.menuable__content__active > div > div:nth-child(3) > a',
    statusTimeWholeDay: '#app > div.menu__content.menuable__content__active > div > div:nth-child(4) > a',
    
    //clearBusyStatusButton: '#myStatus > div:nth-child(4) > div > span > span > span > button',
    statusDropDownButton: '#myStatus > div:nth-child(5) > div.menu.drop_down_menu > div > div > div',
    statusDropDownText: '#myStatus > div:nth-child(5) > div.menu.drop_down_menu > div > div > div > div.drop_down_text',
    statusLetsTalk: '#app > div.menu__content.menuable__content__active > div > div:nth-child(1) > a > div > div',
    statusOutForMeal: '#app > div.menu__content.menuable__content__active > div > div:nth-child(2) > a > div > div',
    statusInAMeeting: '#app > div.menu__content.menuable__content__active > div > div:nth-child(3) > a > div > div',
    statusGoneOut: '#app > div.menu__content.menuable__content__active > div > div:nth-child(4) > a > div > div',
    statusSick: '#app > div.menu__content.menuable__content__active > div > div:nth-child(5) > a > div > div',
    statusWorkFromHome: '#app > div.menu__content.menuable__content__active > div > div:nth-child(2) > a > div > div',
    statusOnLeave: '#app > div.menu__content.menuable__content__active > div > div:nth-child(2) > a > div > div',   
    clearStatus: '#myStatus > div:nth-child(5) > div:nth-child(2) > button',
    calenderStatus: '#myStatus > div:nth-child(6) > div > div > div > i',
    calendarSettingsButton: '#myStatus > div:nth-child(6) > div > button',

    //Temp (tag strings)
    activeBadge: 'icon status_icon_green fas fa-check',
    awayBadge: 'icon status_icon_clock far fa-clock',
    avatarWithPhotoHtml: '<img data-v-2a1db53f="" src="https://firebasestorage.googleapis.com/v0/b/xchat-2b2c3.appspot.com/o/users%2Fhifl0t4Rp8aTwK63sefT7myabeF2%2Fuserphoto.jpeg?alt=media&amp;token=3f5fc96c-5be7-47e4-a560-677ce8753d69">',
    avatarNoPhotoHtml: '<div data-v-2a1db53f="" class="avatar teal lighten-3" style="height: 45px; width: 45px;"><span data-v-2a1db53f="" class="white--text" style="font-size: 26px;">K</span></div>',
    avatarWithPhotoCss: ''
}
