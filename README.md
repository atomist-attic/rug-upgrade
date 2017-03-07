# Atomist 'rug-upgrade'

This [Rug][rug] project contains Rugs that help you migrate from one
version of Rug to the next.

[rug]: http://docs.atomist.com/

## Rugs

### ConvertRugToTypeScript

The ConvertRugToTypeScript converts a DSL Rug editor to a TypeScript
Rug editor.  It is not perfect, so be sure to check its results.

**WARNING!** This editor only works with
the [`jessitron/pretty-transpile` branch of rug][transpile] at
present.

[transpile]: https://github.com/atomist/rug/tree/jessitron/pretty-transpile

#### Prerequisites

Before running this editor, you must have the following prerequisites
satisfied.

*   A Rug archive source code repository with a DSL Rug

#### Parameters

To run this editor, you must supply the following parameters.

Name | Required | Default | Description
-----|----------|---------|------------
`rug_name` | Yes | | The name of the DSL Rug in the project to convert to TypeScript

#### Running

Run it as follows:

```
$ cd rug/project/directory
$ rug edit atomist-rugs:rug-editors:ConvertRugToTypeScript \
    rug_name=SomeOldDSLRug
```

This will convert the `SomeOldDSLRug` editor from the deprecated DSL
to TypeScript.  The conversion is not perfect, so please review the
changes and run your tests.  Once everything is working, remove the
original `.rug` file.

### UpdateRugVersion

The UpdateRugVersion editor updates the version of the rug dependency
in the Rug archive's `manifest.yml`.  If the project has a
`package.json`, it updates the dependency in that file too.  Since the
manifest and package version formats are different, their new values
are specified as different parameters.

#### Prerequisites

Before running this editor, you must have the following prerequisites
satisfied.

*   A Rug archive source code repository

#### Parameters

To run this editor, you must supply the following parameters.

Name | Required | Default | Description
-----|----------|---------|------------
`manifest_version` | Yes | | A valid Rug version of the form M.N.P or a version range of the form [M.N.P,X.Y.Z) where a square bracket includes the adjacent version and a parenthesis excludes it
`package_version` | Yes | | A [valid NPM dependency version][npm-version] representing valid Rug version(s)

[npm-version]: https://docs.npmjs.com/files/package.json#dependencies

#### Running

Run it as follows:

```
$ cd rug/project/directory
$ rug edit atomist-rugs:rug-editors:UpdateRugVersion \
    manifest_version='[0.8.0,1.0.0)' \
    package_version='~0.8.0'
```

This will update the rug version in the `.atomist/manifest.yml` and,
if present, the `.atomist/package.json`.  If there is no `.atomist`
directory, nothing will be done.

### UpgradeFrom0_7_1

Upgrades Rug DSL files from the syntax used in Rug 0.7.1 to the syntax
used in Rug 0.8.0.

#### Parameters

To run this editor, you must supply the following parameters.

#### Running

Run it as follows:

```
$ cd to/the/repo
$ rug edit atomist-rugs:rug-upgrade:UpgradeFrom0_7_1
```

This will update all the `.rug` files in the project to conform to Rug
0.8.0.

## Support

General support questions should be discussed in the `#support`
channel on our community Slack team
at [atomist-community.slack.com][slack].

If you find a problem, please create an [issue][].

[issue]: https://github.com/atomist-rugs/rug-editors/issues

## Development

You can build, test, and install the project locally with
the [Rug CLI][cli].

[cli]: https://github.com/atomist/rug-cli

```
$ rug test
$ rug install
```

To create a new release of the project, simply push a tag of the form
`M.N.P` where `M`, `N`, and `P` are integers that form the next
appropriate [semantic version][semver] for release.  For example:

[semver]: http://semver.org

```
$ git tag -a 1.2.3
```

The Travis CI build (see badge at the top of this page) will
automatically create a GitHub release using the tag name for the
release and the comment provided on the annotated tag as the contents
of the release notes.  It will also automatically upload the needed
artifacts.

---
Created by [Atomist][atomist].
Need Help?  [Join our Slack team][slack].

[atomist]: https://www.atomist.com/
[slack]: https://join.atomist.com/
