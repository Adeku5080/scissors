"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth2_1 = __importDefault(require("passport-google-oauth2"));
const GoogleStrategy = passport_google_oauth2_1.default.Strategy;
const GOOGLE_CLIENT_ID = '784191906946-1eabpo0eop3ajrsvu5at94ddna9qk48f.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
passport_1.default.use(new GoogleStrategy({
    clientID: '784191906946-1eabpo0eop3ajrsvu5at94ddna9qk48f.apps.googleusercontent.com',
    clientSecret: GOOGLE_CLIENT_ID,
    callbackURL: GOOGLE_CLIENT_SECRET,
    passReqToCallback: true,
}, function (profile, done) {
    return done(null, profile);
}));
