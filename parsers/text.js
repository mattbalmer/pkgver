var pattern = /(version=)(.*?)($|\n)/;

module.exports = {
    files: 'gradle.properties',
    read: function(raw) {
        var matches = raw.match(pattern);
        return (matches || [])[2];
    },
    write: function(raw, version) {
        return raw.replace(pattern, "$1"+version+"$3")
    }
};