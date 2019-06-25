# Traduora CLI

### Work in progress

The current release is work in progress, releases `0.0.x-canary-*` are experimental.

### Config

Options are set using one of the following

    package.json property "traduora"
    .tradourarc
    .traduorarc.json
    .traduorarc.yaml
    .traduorarc.yml
    .traduorarc.js
    traduora.config.js

In combination with all-caps snake cased variants of the property names in `process.env`,
prefixed with `TR`. E.g `TR_BASE_URL` is equivalent to `base-url` in config files.

Note that the prefix itself is also configurable but it can not be set via environment variables.

##### Options:

Strings containing `<rootDir>` and `<locale>` will be interpolated. Examples:

**Given `package.json` resides at `/abs-path/project/package.json`:**

* `<rootDir>` will be replaced with `/abs-path/project`
* `<locale>` will be replaced respective of context, so that with `"locale": "de_DE"` the default `"pull-to": "<rootDir>/intl/pull/<locale>.json"` will become `"/abs-path/project/intl/pull/de_DE.json"`

| property | value  | | env var (default) |
|----------|:-------------:|:-------------|:---:|
| `client-id` | `{String}` | client id for the client credentials flow | `TR_CIENT_ID` |
| `client-secret`| `{String}` | **Warning** *take care not to expose it in version control* <br> client key for the client credentials flow | `TR_CIENT_SECRET` |
| `project-id` | `{String}` | traduora project ID | `TR_PROJECT_ID` |
| `base-url` | `{String}` | `<scheme>://<host>/<basePath>` – e.g. `https://traduora.example.com/api/v1/` | `TR_BASE_URL` |
| `env-prefix` | `{String="TR"}` | Prefix to assume when interpolating environment variables for config options.  | n/a |
| `locale` | `{String}` | locale for authoring translation terms | n/a |
| `locales` | `{Array<String>}` | locales to obtain from traduora | n/a |
| `pull-to` | `{String="<rootDir>/intl/pull/<locale>.json"}` | TBD| n/a |
| `push-from` | `{GlobString="<rootDir>/intl/push/**/<locale>.json"}` | globbing TBD | n/a |
| `pull-format` | `{String="jsonflat"}` | TBD | n/a |
| `push-format` | `{String="json"}` | TBD | n/a |
| `root-dir` | `{[String]}` | Means to override `<rootDir>`  | `TR_ROOT_DIR` |

## Semver

Until traduora reaches a `1.0` release, breaking changes will be released with a new minor version. For example `0.5.1`, and `0.5.4` will have the same API, but `0.6.0` will have breaking changes.
