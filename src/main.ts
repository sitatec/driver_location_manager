import http from "http";
import router from './server/router';
// Remove all console logs.
http.createServer(router).listen(3000, () => console.log('Started'));
