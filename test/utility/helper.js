const { systemPreferences } = require("electron")
const fs = require('fs')

module.exports= {
    delay(interval){
        return it('should delay', done => 
        {
            setTimeout(() => done(), interval)

        }).timeout(interval + 100) // The extra 100ms should guarantee the test will not fail due to exceeded timeout
        },
    focusOnWin(app, searchString, numberOfWindows) {
        //for(let i = 0; i < numberOfWindows; i++){
            i = numberOfWindows
            var bodyString = app.client.windowByIndex(i).getText('body')
            //console.log(bodyString)
            if(bodyString.includes(searchString)){
                return i
            }
        //}
    },
    createScreenshotFolder(){
        var currentDate = new Date()
        var datetime = currentDate.getFullYear() + 
                        currentDate.getMonth() +
                        currentDate.getDate() +
                        currentDate.getHours() +
                        currentDate.getMinutes() +
                        currentDate.getSeconds()
        var datetimeStr = datetime.toString()
        
        console.info(datetime)

    },
}

