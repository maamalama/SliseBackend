import { DynamicModule, Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { AnalyticsController } from './analytics/analytics.controller';
import { PrismaModule } from './prisma/prisma.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { ScheduleModule } from '@nestjs/schedule';
import * as Sentry from '@sentry/node';
import { BullModule } from '@nestjs/bull';
import { TokenProcessorModule } from './tokenprocessor/tokenprocessor.module';
import IORedis from 'ioredis';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [AuthModule, AnalyticsModule, PrismaModule, RedisModule.forRoot({
    config: {
      url: process.env.REDIS_URL,
      connectTimeout: 20000,
      tls: {
        rejectUnauthorized: false
      }
    }
  }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
        connectTimeout: 20000,
        tls: {
          rejectUnauthorized: false
        }
      }
    }),
    SchedulerModule, ScheduleModule.forRoot(),
    TokenProcessorModule,
    // SentryModule.forRoot({
    //   dsn: 'sentry_io_dsn',
    //   debug: true,
    //   environment: 'dev',
    //   release: null, // must create a release in sentry.io dashboard
    //   logLevels: ['debug'] //based on sentry.io loglevel //
    // })
  ],
  controllers: [AppController, AnalyticsController],
  providers: [AppService, AnalyticsModule]
})
export class AppModule implements OnModuleInit {
  onModuleInit() {
    console.log('MAIN ', process.pid);
  }
}
