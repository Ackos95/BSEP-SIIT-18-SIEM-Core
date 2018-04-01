import { Request, Response } from 'express';


class RawBodyMiddleware {
  public run = (req: Request, res: Response, next: () => any) => {
    req.setEncoding('utf8');
    req.body = '';
    req.on('data', function(chunk) {
      req.body += chunk;
    });
    req.on('end', function(){
      next();
    });
  };
}


export {
  RawBodyMiddleware,
};
