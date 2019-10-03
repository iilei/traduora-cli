module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-class-properties',
    [
      'shebang',
      {
        replacement: '#!/usr/bin/env node',
        force: (process.env.NODE_ENV || '').includes('prod'),
      },
    ],
  ],
}
