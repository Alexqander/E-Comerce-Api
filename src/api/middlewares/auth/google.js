import passport from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import config from '../../../config/index.js';
import {
  createGoogleUser,
  findUserByEmail,
  signInUser
} from '../../services/user.service.js';
import { encrypt } from '../../../helpers/handleBcrypt.js';

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
        const userSession = await signInUser(userExist.data);
        if (!userSession.error) {
          done(null, { user: userSession.data, profile });
        }
      } else {
        const passwordHash = await encrypt(profile.id);

        const savedUser = await createGoogleUser(
          {
            email: profile.emails[0].value,
            name: profile.name.givenName,
            lastName: profile.name.familyName
          },
          passwordHash
        );
        if (!savedUser.error) {
          const userSession = await signInUser(savedUser.data);
          if (!userSession.error) {
            done(userSession.error, null);
          }
        } else {
          done(savedUser.error, null);
        }
      }
    }
  )
);
