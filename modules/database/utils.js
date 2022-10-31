var sanitize = require('mongo-sanitize');

module.exports.randomPrefix = function(mask = 'xxxxx') {
    return `${mask}`.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

module.exports.fullSanitize = function(data){

    data = sanitize(data);
    data = data.replace(/"/g,'\\"');
    data = data.replace(/'/g,'\\"');
    data = data.split("\n").join(" ");
    return  data;

}