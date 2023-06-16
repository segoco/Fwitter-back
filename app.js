const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// eslint-disable-next-line import/no-extraneous-dependencies
const FacebookStrategy = require('passport-facebook').Strategy;
// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

const app = express();
const port = 5000 || process.env.PORT;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
},
// eslint-disable-next-line no-unused-vars
(accessToken, refreshToken, profile, done) => {
  // eslint-disable-next-line max-len
  // Aquí puedes manejar los datos del perfil de usuario recibidos de Google y realizar el registro en tu aplicación
  // Por ejemplo, puedes guardar los datos en tu base de datos y autenticar al usuario
  // Luego, puedes redirigir al usuario a la página principal de tu aplicación
},
));

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      // Aquí puedes realizar acciones con el perfil del usuario devuelto por Facebook.
      // eslint-disable-next-line max-len
      // Por ejemplo, puedes crear un nuevo usuario en tu base de datos o autenticar al usuario existente.
      // Luego, llama a `done` para finalizar la autenticación.
      done(null, profile);
    },
  ),
);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Ruta de autenticación con Facebook
app.get('/auth/facebook', passport.authenticate('facebook'));

// Ruta de callback después de la autenticación con Facebook
app.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/profile', failureRedirect: '/login' }),
);

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  // eslint-disable-next-line no-unused-vars
  (req, res) => {
    // eslint-disable-next-line max-len
    // Aquí puedes redirigir al usuario a la página principal de tu aplicación después de la autenticación exitosa
  },
);

app.listen(port, () => {
  console.info(`Fwitter backend listening at http://localhost:${port}`);
});
