module.exports = {
  siteMetadata: {
    title: `College Information Portal`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@niteshsrivats`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `College Information Portal`,
        short_name: `Info Portal`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        credentials: {
          apiKey: "AIzaSyCi9TNynjt6zURQW3_ImKHudAf9BkzNLp0",
          authDomain: "college-information-portal.firebaseapp.com",
          databaseURL: "https://college-information-portal.firebaseio.com",
          projectId: "college-information-portal",
          storageBucket: "college-information-portal.appspot.com",
          messagingSenderId: "24079450753",
          appId: "1:24079450753:web:05f351a1ad16ed2e0d8380",
          measurementId: "G-DNBDR48ST7",
        },
      },
    },
  ],
};
