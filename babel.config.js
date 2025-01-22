module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
  ],
  plugins: [
    ['@babel/plugin-transform-typescript', {allowDeclareFields: true}],  // Coloca este plugin antes de los otros
    ['@babel/plugin-proposal-decorators', { legacy: true }], // Decorators primero
    ['@babel/plugin-proposal-class-properties', { loose: true }], // Luego propiedades de clase
  ],
};