import * as rp from 'request-promise-native';
import { hmac, queryStringify } from './Util';

/**
 * APIリクエストを送信するクラスです。
 */
export default class HttpClient {
  
  constructor(readonly baseUrl: string, readonly key?: string, readonly secret: string = '') {}
  
  /**
   * HTTP GETリクエストを送信します。
   * @param  {string} path
   * @param  {T} requestParam
   * @return {Promise<R>} リクエスト結果
   */
  async get<R, T = never>(path: string, requestParam?: T): Promise<R> {
    const method = 'GET';
    let pathWithParam = path;
    if (requestParam) {
      const param = queryStringify(requestParam);
      if (param) {
        pathWithParam += `?${param}`;
      }
    }
    return await this.call<R>(pathWithParam, method);
  }

  /**
   * HTTP POSTリクエストを送信します。
   * @param  {string} path
   * @param  {T} requestBody
   * @return {Promise<R>} リクエスト結果
   */
  async post<R, T>(path: string, requestBody: T): Promise<R> {
    const method = 'POST';
    const body = JSON.stringify(requestBody);
    return await this.call<R>(path, method, body);
  }
  
  /**
   * HTTPリクエストを送信します。
   * @param {string} path 
   * @param {string} method 
   * @param {string} body 
   * @return {Promise<R>} リクエスト結果
   */
  private async call<R>(path: string, method: string, body: string = ''): Promise<R> {
    const url = this.baseUrl + path;
    const timestamp = Date.now().toString();
    const message = timestamp + method + path + body;
    const sign = hmac(this.secret, message);
    const headers = {
      'Content-Type': 'application/json',
      'ACCESS-KEY': this.key,
      'ACCESS-TIMESTAMP': timestamp,
      'ACCESS-SIGN': sign
    };
    const options = {
      url: url,
      method: method,
      headers: headers,
      body: body
    };
    const res = JSON.parse(await rp(options)) as R;
   
    return res;
  }
 
}