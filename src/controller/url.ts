import UrlModel from '../models/Url';
import { createHash } from 'crypto';
import { Request, Response } from 'express';

export const createUrl = async (req: Request, res: Response) => {
    console.log('adeku');

  const { longUrl } = req.body;
  const hashedUrl = createHash('md5').update(longUrl).digest('hex');
  const shortenedUrl = hashedUrl.slice(0, 5);

  const url = await UrlModel.create({ longUrl: longUrl, shortUrl: shortenedUrl });
  console.log(url, 'adeku');
  res.status(201).json({
    newUrl: `scissors.com/${shortenedUrl}`,
  });
};

//get the url
//split it ,then take out the part after the slash,
//find in your db whether that part exists,if it does redirect the browser to it
//if it does not,return invalid short Url

export const redirectUrl = async (req: Request, res: Response) => {
  const { shorturl } = req.params;

  const data = await UrlModel.findOne({ shortUrl: shorturl });
  console.log(data?.longUrl, 'long');

  if (!data) {
    return res.status(404).json({ msg: 'page not found' });
  }

  res.redirect(302, '/data.longUrl');   
};
