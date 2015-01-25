var semver = require('semver');

var X = {
    filter: function(list, options) {
        options = options || {
            valid: true,
            invalid: false
        };

        return list.filter(function(pkg) {
            var version = pkg.version || pkg;

            if(options.valid && !semver.valid(version)) {
                return false;
            }

            if(options.invalid && semver.valid(version)) {
                return false;
            }

            return true;
        })
    },
    sort: function(list, flag) {
        flag = flag || 1;

        return list.sort(function(a, b) {
            a = a.version || a;
            b = b.version || b;
            return semver.gte(a, b) ? -flag : flag;
        });
    },
    set: function(list, newVersion) {
        return list.slice(0).map(function(item) {
            if(typeof item === 'object') {
                item.version = newVersion;
                return item;
            } else {
                return newVersion;
            }
        });
    },
    highest: function(pkgs) {
        var validPackages = X.sort(X.filter(pkgs));
        return validPackages[0].version;
    },
    valid: function(packages) {
        return packages.length == X.filter(packages).length;
    },
    parse: function(version) {
        if(!semver.valid(version)) return;

        var v = semver.clean(version).split('-'),
            whole = v[0].split('.'),
            pre = (v[1] || '').split('.');

        pre = pre.filter(function(piece) {
            return !!piece;
        });

        return {
            major: whole[0],
            minor: whole[1],
            patch: whole[2],
            pre: pre,
            set: function(part, value) {
                if(part == 'pre') {
                    this.pre = value == 'null' ? [] : [value];
                } else {
                    this[part] = value;
                }

                return this;
            },
            inc: function(part) {
                var lastPre = this.pre[this.pre.length - 1];

                if(part == 'pre') {
                    if(!lastPre) {
                        this.patch = parseInt(this.patch) + 1;
                    }

                    if(parseInt(lastPre)) {
                        this.pre[this.pre.length - 1] = parseInt(lastPre) + 1;
                    } else {
                        this.pre.push(1);
                    }
                } else {
                    if(lastPre) {
                        this.pre = [];
                        if(part == 'patch') {
                            return this;
                        }
                    }
                    this[part] = parseInt(this[part]) + 1;
                }

                return this;
            }
        }
    },
    stringify: function(version) {
        var whole = [version.major, version.minor, version.patch].join('.'),
            pre = version.pre.length > 0 ? version.pre.join('.') : '';
        return whole + (pre ? '-' + pre : '')
    }
};

module.exports = X;