import * as _ from 'lodash';
import * as crypto from 'crypto';
import * as querystring from 'querystring';

export function hmac(secret: string, text: string, algorithm: string = 'sha256'): string {
  return crypto
    .createHmac(algorithm, secret)
    .update(text)
    .digest('hex');
}

export function queryStringify(o: any) {
  const noUndefined = _.pickBy(o, _.negate(_.isUndefined));
  return querystring.stringify(noUndefined);
}