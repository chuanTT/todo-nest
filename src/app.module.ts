import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        console.log(configService.get('USERNAME'));
        return {
          type: 'mysql',
          host: configService.get('HOST'),
          port: +configService.get('PORTDB'),
          username: configService.get('USERNAMEDB'),
          password: configService.get('PASSWORDDB'),
          database: configService.get('DATABASE'),
          entities: [],
          synchronize: configService.get('SYNCHRONIZE'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
