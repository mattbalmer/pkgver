var log = require('./log'),
    packages = require('./../packages'),
    version = require('./../version');

module.exports = function(cwd) {
    log(cwd);

    var pkgs = packages.read(cwd),
        highestVersion = version.highest(pkgs);

    console.log('Syncing versions to highest: %s', highestVersion);

    pkgs.forEach(function(pkg) {
        pkg.version = highestVersion;
    });

    packages.write(pkgs);
};