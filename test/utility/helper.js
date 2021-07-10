const { systemPreferences } = require("electron")
const path = require('path')
const fs = require('fs')

module.exports= {
    delay(interval){
        return it('should delay', done => 
        {
            setTimeout(() => done(), interval)

        }).timeout(interval + 100) // The extra 100ms should guarantee the test will not fail due to exceeded timeout
        },
    clearFiles(directory){
        fs.readdir(directory,(err, files) => {
            if(err) throw err;

            for(const file of files) {
                fs.unlink(path.join(directory, file), err => {
                    if (err) throw err;
                })
            }
        })
    },
}

