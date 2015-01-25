#!/usr/bin/env node

var optimist = require('optimist'),
    options = optimist.argv,
    args = options._,
    cwd = process.cwd(),
    ver = require('../lib');

var action = args[0];

if(!action || action == 'log') {
    ver.log(cwd);
}
if(action == 'sync') {
    ver.sync(cwd);
}
if(action == 'set') {
    ver.set(cwd, args.slice(1), options);
}
if(action == 'bump') {
    ver.bump(cwd, args.slice(1), options);
}