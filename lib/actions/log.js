var packages = require('./../packages'),
    version = require('./../version');

module.exports = function(cwd) {
    var pkgs = packages.read(cwd);

    version.sort(version.filter(pkgs))
        .forEach(function(pkg) {
            console.log('%s - %s', pkg.name, pkg.version);
        });

    version.filter(pkgs, { invalid: true })
        .forEach(function(pkg) {
            console.log('[invalid] %s - %s', pkg.name, pkg.version);
        });
};