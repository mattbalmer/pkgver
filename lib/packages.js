var fs = require('fs'),
    path = require('path'),
    glob = require('glob'),
    version = require('./version');

function flatten(arr, a) {
    return arr.concat(a);
}
function removeDuplicates(e, i, a) {
    return a.indexOf(e) == i;
}

module.exports = {
    read: function(cwd, options) {
        options = options || {};

        var filters = {
            hasVersion: options.hasVersion || false
        };

        var parsers = fs.readdirSync( path.join(__dirname, '../parsers') )
            .map(function(filename) {
                return require( path.join(__dirname, '../parsers', filename) )
            });

        return parsers
            .map(function(parser) {
                var files = (Array.isArray(parser.files) ? parser.files : [parser.files])
                    .map(function(pattern) {
                        return glob.sync(pattern, {
                            cwd: cwd
                        });
                    })
                    .reduce(flatten, [])
                    .filter(removeDuplicates);

                return files
                    .map(function(filename) {
                        var filepath = path.join(cwd, filename),
                            content = fs.readFileSync(filepath, 'UTF-8'),
                            version = parser.read(content);
                        return {
                            name: filename,
                            path: filepath,
                            version: version,
                            content: content,
                            parser: parser
                        }
                    })
                    .filter(function(pkg) {
                        return filters.hasVersion ? !!pkg.version : true;
                    });
            })
            .reduce(flatten, []);
    },
    write: function(pkgs, options) {
        if(!version.valid(pkgs)) {
            console.log('Cannot save package versions. Invalid version.', version.filter(pkgs, { invalid: true }));
            process.exit(1);
            return;
        }

        pkgs.forEach(function(pkg) {
            var content = pkg.parser.write(pkg.content, pkg.version);
            fs.writeFileSync(pkg.path, content, 'UTF-8');
        });
    }
};