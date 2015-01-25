var fs = require('fs'),
    path = require('path'),
    version = require('./version');

module.exports = {
    read: function(cwd, options) {
        options = options || {};

        var filters = {
            hasVersion: options.hasVersion || false
        };

        return fs.readdirSync(cwd)
            .filter(function(filename) {
                return filename.indexOf('.json') > -1;
            })
            .map(function(filename) {
                var content = JSON.parse(fs.readFileSync(filename, 'UTF-8'));
                return {
                    name: filename,
                    path: path.join(cwd, filename),
                    version: content.version,
                    content: content
                }
            })
            .filter(function(pkg) {
                return filters.hasVersion ? !!pkg.version : true;
            });
    },
    write: function(pkgs, options) {
        if(!version.valid(pkgs)) {
            console.log('Cannot save package versions. Invalid version.', version.filter(pkgs, { invalid: true }));
            process.exit(1);
            return;
        }

        pkgs.forEach(function(pkg) {
            pkg.content.version = pkg.version;
            var data = JSON.stringify(pkg.content, null, 4);
            fs.writeFileSync(pkg.path, data, 'UTF-8');
        });
    }
};