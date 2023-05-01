// This script is mainly used during development.
// Starts BopBotMusic without applying database migrations.
import {startBot} from '../index.js';
import logBanner from '../utils/log-banner.js';

(async () => {
  logBanner();
  await startBot();
})();
