import Koa from 'koa';
import path from 'path';
const conditional = require('koa-conditional-get');
const etag = require('koa-etag');
//静态资源中间件
import resource from 'koa-static';

const app = new Koa();
const host = 'localhost';
const port = 4396;
app.use(conditional());
app.use(etag());

app.use(async (ctx, next) => {
  // 设置响应头Cache-Control 设置资源有效期为300秒
   ctx.set({
     'Cache-Control': 'max-age=30'  
   });
   await next();
 });
app.use(resource(path.join(__dirname, './static')));

app.listen(port, () => {
  console.log(`server is listen in ${host}:${port}`);
});
