import babel from 'rollup-plugin-babel'

export default {
    entry: 'src/minutes.js',
    format: 'umd',
    plugins: [ babel() ],
    dest: 'dist/minutes.js',
    moduleName: 'Minutes'
}
