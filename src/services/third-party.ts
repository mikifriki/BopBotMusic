import {inject, injectable} from 'inversify';
import Youtube from 'youtube.ts';
import {TYPES} from '../types.js';
import Config from './config.js';

@injectable()
export default class ThirdParty {
  readonly youtube: Youtube;

  constructor(@inject(TYPES.Config) config: Config) {
    // Library is transpiled incorrectly
    // eslint-disable-next-line
    this.youtube = new ((Youtube as any).default)(config.YOUTUBE_API_KEY);
  }


}
