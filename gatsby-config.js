module.exports = {
  siteMetadata: {
    title: 'Streamer Screen',
    author: 'Georgi Yanev',
    description:
      'Allows for easy configuration of start and end screens for your Twitch stream that you can use in OBS.',
    siteUrl: 'https://streamer-screen.netlify.com',
  },
  plugins: [
    {
      resolve: `@wapps/gatsby-plugin-material-ui`,
      options: {
        theme: {
          palette: {
            primary: {
              main: '#0375d8',
            },
            secondary: {
              main: '#fafafa',
            },
          },
        },
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    'gatsby-plugin-styled-components',
    {
      resolve: `gatsby-plugin-sitemap`,
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `XXX`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `streamer-screen.netlify.com`,
        short_name: `StreamerScreen`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#0375d8`,
        display: `minimal-ui`,
        icon: `src/assets/fpvtips-logo-512.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
  ],
}
