const fs= require('fs');
function logReqRes(fileName){
    return (req, res, next) => {
        fs.appendFile(fileName, `${Date.now()} -> Request: ${req.method} ${req.url}\n`, (err) => {
            if (err) {
                console.error('Error logging request:', err);
            }
            next();    
        });
    }
}
module.exports = {
    logReqRes,
};