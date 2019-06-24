# Traduora CLI

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
prefixed with `TR`. E.g `TR_API_BASE` is equivalent to `api-base` in config files.

Note that the prefix itself is also configurable but it can not be set via environment variables.

##### Options:

| property | expected  | | env var (default) |
|----------|:-------------:|:-------------|:---:|
| `client-id` | `{String}` | client id for the client credentials flow | `TR_CIENT_ID` |
| `client-key`| `{String}` | **Warning** *take care not to expose it in version control* <br> client key for the client credentials flow | `TR_CIENT_KEY` |
| `project-id` | `{String}` | traduora project ID | `TR_PROJECT_ID` |
| `api-base` | `{String}` | `<scheme>://<host>/<basePath>` – e.g. `https://traduora.example.com/` or `https://example.com/traduora/` | `TR_API_BASE` |
| `env-prefix` | `{String="TR"}` | Prefix to assume when interpolating environment variables for config options.  | n/a |
| `locale` | `{String}` | locale for authoring translation terms | n/a |
| `locales` | `{Array:<String>}` | locales to obtain from traduora | n/a |

