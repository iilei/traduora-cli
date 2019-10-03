# Traduora CLI

CLI for [traduora translation management](https://docs.traduora.com)

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

## CLI Script

CLI-Scripts are usable as npm scripts:

Example package.json scripts:

```json
    "//": "make traduora cli accessible in the project directory context -> ease of use for build steps",
    "traduora": "traduora"

```

If you want to have your environment defined in a `.env` file, you can use [dotenv](https://github.com/motdotla/dotenv), too:

```json
    "traduora": "node --require 'dotenv/config' ./node_modules/.bin/traduora"
```

### pull

To fetch the translated terms, run

```bash
traduora --task pull
# short:
traduora -t pull
```

### push

To perform remote creation for each new term found in `push-from`

```bash
traduora --task push
# short:
traduora -t push
```

Input files must be `jsonflat`. Input files are matched with glob patterns. The message keys must be unique across all aggregated files.

example

```json
{
  "menu.home.button": "Home",
  "messages.welcome": "Welcome {user.displayName}"
}
```

### <span id="jq-hint">How to use a unsuited input json schema</span>

In order to transform the output of [babel-plugin-react-intl](https://www.npmjs.com/package/babel-plugin-react-intl) to the desired format, consider using [jq](https://stedolan.github.io/jq/).

As an example

```bash
jq --slurp --sort-keys \
  'add | reduce .[] as $item ({} ; . + {"\($item.id)": $item.defaultMessage})' \
   ./intl/push/**/*.json \
   >| intl/push/aggregated.jsonflat
```

Which might be used as a preliminary step ahead of pushing the translations to traduora. Combined with `dotenv`:

```
...
  "traduora": "node --require 'dotenv/config' ./node_modules/.bin/traduora"
  "preintl:push": "jq --slurp --sort-keys 'add | reduce .[] as $item ({} ; . + {\"\\($item.id)\": $item.defaultMessage})' $(find ./intl/push/* -name \"*.json\") >| build/messages/aggregated.jsonflat",
  "intl:push": "npm run traduora -- -t push",
```

In conjunction with traduora-config

```
"push-from": "<rootDir>/intl/push/aggregated.jsonflat",
```

### translations

```bash
traduora --task translations --output ./locales.json
# short:
traduora -t translations -o ./locales.json
```

Obtains the locale codes which have translations. For example the resulting  *./locales.json* may look like

```json
{
  "de_DE": {
    "region": "Germany",
    "language": "German",
    "id": "0ab1eed9-f98a-465a-93fd-6b3a67353164"
  },
  "en_GB": {
    "region": "United Kingdom",
    "language": "English",
    "id": "544b64bb-2679-41fb-b39b-5758edbe092a"
  }
}
```

## Options:

Strings containing `<rootDir>`, `<locale>` or `<hash:\d+>` will be interpolated. Examples:

* `<rootDir>` will be replaced with the absolute Path to the project root
* `<locale>` will be replaced respective of context.
* `<hash:6>` will be replaced with the hash of the respective file, shortened to 6 characters.

| property | value  | | env var (default) |
|----------|:-------------:|:-------------|:---:|
| `client-id` | `{String}` | client id for the client credentials flow | `TR_CIENT_ID` |
| `client-secret`| `{String}` | **Warning** *take care not to expose it in version control* <br> client key for the client credentials flow | `TR_CIENT_SECRET` |
| `project-id` | `{String}` | traduora project ID | `TR_PROJECT_ID` |
| `base-url` | `{String}` | `<scheme>://<host>/<basePath>` – e.g. `https://traduora.example.com/` | `TR_BASE_URL` |
| `base-path` | `{String}` | most likely `/api/v1/` is correct | `TR_BASE_PATH` |
| `env-prefix` | `{String="TR"}` | Prefix to assume when interpolating environment variables for config options.  | n/a |
| `locale` | `{String}` | locale for authoring translation terms | n/a |
| `locales` | `{Array<String>}` | locales to obtain from traduora | n/a |
| `pull-to` | `{String="<rootDir>/intl/pull/<locale>.<hash:6>.json"}` | TBD| n/a |
| `push-from` | `{GlobString,Array<GlobString}=["<rootDir>/intl/push/**/<locale>.json"]` | The interpolated Paths are serving as a pattern for [globby](https://www.npmjs.com/package/globby) | n/a |
| `pull-format` | `{String="jsonflat"}` | TBD | n/a |
| `root-dir` | `{[String]}` | Means to override `<rootDir>` | `TR_ROOT_DIR` |
| `max-retry` | `{Integer=5}` | Retries if API calls fail | n/a | 

## Semver

Until traduora-cli reaches a `1.0` release, breaking changes will be released with a new minor version. For example `0.5.1`, and `0.5.4` will have the same API, but `0.6.0` will have breaking changes.

## Recommendations

### Using React?

Let your react components be the source of truth where i18n key-value pairs come to existence. Try

* [react-intl](https://github.com/formatjs/react-intl) and
* [Extract Intl messages](https://github.com/akameco/extract-react-intl-messages)

#### Using Eslint?

* [Prevent usage of string literals in JSX (react/jsx-no-literals)](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-literals.md)
