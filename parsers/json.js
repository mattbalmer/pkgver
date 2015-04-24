module.exports = {
    files: '*.json',
    read: function(raw) {
        var json = JSON.parse(raw);
        return json.version;
    },
    write: function(raw, version) {
        var json = JSON.parse(raw);
        json.version = version;
        return JSON.stringify(json, null, 4);
    }
};