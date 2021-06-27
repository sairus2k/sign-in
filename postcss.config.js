const media = 'src/styles/variables.css'

module.exports = {
  plugins: [
    require('postcss-preset-env')({
      stage: 3,
      features: {
        'nesting-rules': true,
        'system-ui-font-family': true,
        'custom-media-queries': {
          importFrom: media,
        },
      },
    }),
  ],
}
