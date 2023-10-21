import passport from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import config from '../../../config/index.js';
import { createUser, findUserByEmail } from '../../services/user.service.js';

passport.use(
  'auth-google',
  new GoogleStrategy(
    {
      clientID: config.google.googleClientId,
      clientSecret: config.google.googleClientSecret,
      callbackURL: 'http://localhost:3000/apiEcomerce/1.0/auth/google'
    },
    async function (accessToken, refreshToken, profile, done) {
      const userExist = await findUserByEmail(profile.emails[0].value);
      if (!userExist.error) {
        done(null, profile);
      } else {
        const savedUser = await createUser({
          name: profile.displayName,
          email: profile.emails[0].value,
          password: profile.id
        });
        if (!savedUser.error) {
          done(null, profile);
        } else {
          done(savedUser.error, null);
        }
      }
    }
  )
);
