import jwt from 'jsonwebtoken';
import express, { Request, Response } from 'express';
import UserModel from '../models/User';
import * as dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const register = async (req: Request, res: Response) => {
  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  //check if a user with the email already exists
  const alreadyExists = await UserModel.findOne({ email: req.body.email });

  if (alreadyExists) {
    return res.status(401).json({ msg: 'A user with this email already exists' });
  }

  const user = await UserModel.create(userData);

  const tokenUser = {
    name: user.name,
    id: user._id,
  };

  const SECRET_KEY: string = process.env.JWT_SECRET as string;

  const token = jwt.sign(tokenUser, SECRET_KEY, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
    signed: true,
  });

  res.status(201).json({ user: tokenUser });
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      msg: 'email and password is required',
    });
  }

  const user = await UserModel.findOne({ email: email });

  if (!user) {
    return res.status(401).json({ msg: 'unauthorized' });
  }

  const userPassword = user?.password as string;

  const isPasswordCorrect = await bcrypt.compare(password, userPassword);

  if (!isPasswordCorrect) {
    return res.status(401).json({ msg: 'Unauthenticated,provide the correct credentials' });
  }

  const tokenUser = {
    name: user.name,
    id: user._id,
  };
  const SECRET_KEY: string = process.env.JWT_SECRET as string;

  const token = jwt.sign(tokenUser, SECRET_KEY, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
    signed: true,
  });

  res.status(200).json({ user: tokenUser });
};

export { login, register };
