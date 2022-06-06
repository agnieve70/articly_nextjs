const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      images: {
        domains: ["random.imagecdn.app"],
      },
      env: {
        mongodb_username: "agnieve0513",
        mongodb_password: "JaOUg9KbzOqjmd1l",
        mongodb_clustername: "cluster0",
        mongodb_database: "posty-dev",
        nodemailer_username: "agnieve70@gmail.com",
        nodemailer_password: "gpvbmheneyemovkc",
        base_url: "http://localhost:3000"
      },
    };
  }

  return {
    env: {
      mongodb_username: "agnieve0513",
      mongodb_password: "JaOUg9KbzOqjmd1l",
      mongodb_clustername: "cluster0",
      mongodb_database: "posty-prod",
      NEXTAUTH_URL: "https://articly-nextjs.vercel.app",
      nodemailer_username: "agnieve70@gmail.com",
      nodemailer_password: "gpvbmheneyemovkc",
      base_url: "https://articly-nextjs.vercel.app",
    },
  };
};
