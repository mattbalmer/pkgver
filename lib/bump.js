var log = require('./log'),
    packages = require('./packages'),
    version = require('./version');

module.exports = function(cwd, args, options) {
    log(cwd);

    var pkgs = packages.read(cwd),
        part = args[0] || 'patch',
        highest = version.parse(version.highest(pkgs)),
        newVersion = version.stringify(highest.inc(part));

    console.log('Bumping %s version (%s)', part, newVersion);

    pkgs = version.set(pkgs, newVersion);

    packages.write(pkgs);
};