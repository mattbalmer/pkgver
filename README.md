# pkgver
CLI tool for managing versions in JSON files.

## Description

Provides a simple CLI for reading, setting, bumping, and syncing the version numbers across JSON files.

Example, you're writing a Javascript module that could be installed from either NPM or Bower.
Consequently, you have a `package.json` and a `bower.json` in your module's directory.
Using `pkgver`, you run `pkv bump` or `pkv set 1.2.3`, and both of these files are now updated and in sync!

## Usage

`pkgver` can be invoked via `pkgver`, `pkv`, or `ver` from the command line.

Most methods look something like:

`pkg <action> [part] [value] --options`

Where part and value are optional, depending on the action.

The `part` option can be one of the 4 semver parts: `Major.minor.patch-pre`

### Log

`pkv [log]` (`pkv` or `pkv log`)

Will log out the name & version of all JSON files in the current directory. Will also mark any invalid version numbers.

### Sync

`pkv sync`

Will sync the version numbers in all JSON files in the current directory to the highest version number found.

### Set

`pkv set [part] <value>` (`pkv set 1.2.3` or `pkv set patch 12`)

Will set the version numbers in all JSON files in the current directory to the given value.

If `part` is not given, value must be a valid semver version number.

If `part` is given (Major.minor.patch-pre), the value must be an integer (Except in the case of `pre`, in which any alpha-numeric value is valid).


### Bump

`pkv bump [part]` (`pkv bump` or `pkv bump pre`)

Will bump the version numbers in all JSON files in the current directory.

If `part` is given (Major.minor.patch-pre), then the requested piece will be bumped by 1.

If `part` is not given, `pkgver` will default to bumping the `patch` number by 1.

Note: if `pre` is bumped, and no `pre` number currently exists, the `patch` number will be bumped by 1, and `pre` will be set to 1. (`1.0.0 -> 1.0.1-1`)

Note: if `patch` is bumped, and a `pre` number currently exists, the `patch` number will NOT change, but the `pre` will be dropped. (`1.0.1-3 -> 1.0.1`)