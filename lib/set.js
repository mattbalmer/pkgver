var log = require('./log'),
    packages = require('./packages'),
    version = require('./version'),
    semver = require('semver');

var fromPart = function(pkgs, part, newVersion) {
    var highest = version.highest(pkgs),
        vo = version.parse(highest);

    var newCombinedVersion = version.stringify(vo.set(part, newVersion));

    console.log('Setting %s version to: %s (%s)', part, newVersion, newCombinedVersion);
    return newCombinedVersion;
};

var fromWhole = function(newVersion) {
    if(!newVersion || !semver.valid(newVersion)) {
        console.log('Cannot set packages to invalid version %s', newVersion);
        process.exit(1);
        return;
    } else {
        newVersion = semver.clean(newVersion);
    }

    console.log('Setting versions to: %s', newVersion);
    return newVersion;
};

module.exports = function(cwd, args, options) {
    log(cwd);

    var pkgs = packages.read(cwd),
        part = args[1] ? args[0] : null,
        newVersion = args[1] || args[0];

    newVersion = part ? fromPart(pkgs, part, newVersion) : fromWhole(newVersion);

    pkgs = version.set(pkgs, newVersion);

    packages.write(pkgs);
};