import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/filter/response.interceptor';
import { ConfigModule } from '@nestjs/config';
ConfigModule.forRoot({
  envFilePath: '.env',
});
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.setGlobalPrefix('api_match');
  const port = Number(process.env.APP_PORT);
  const host = String(process.env.HOST);
  await app.listen(port, host);

  console.log(`Application is running on: http://${host}:${port}`)
}
bootstrap();
