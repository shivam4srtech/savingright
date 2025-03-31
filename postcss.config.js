module.exports = {
    "plugins": [
      "postcss-flexbugs-fixes",
      [
        "postcss-preset-env",
        {
          "autoprefixer": {
            "flexbox": "no-2009"
          },
          "stage": 3,
          "features": {
            "custom-properties": false
          }
        }
      ],
      [
        '@fullhuman/postcss-purgecss',
        {
          content: [
              './src/pages/**/*.{js,jsx,ts,tsx}',
              "./src/components/**/*.{js,ts,jsx,tsx}",
          ],
          defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
          safelist: {
            standard: ['html', 'body', 'btn','slick-slider'],
            deep: [/^react-search-box-dropdown/,/^faq-section/,/^offerToday/,/^couponOffer/,/^row/,/^col/,/^btn-/,/carousel/,/^navbar/,/^footer/,/^nav/,/^modal/,/^search/,/^visible/,/form-control/,/categorySection/]

          }        
        }
      ],
    ]
  }