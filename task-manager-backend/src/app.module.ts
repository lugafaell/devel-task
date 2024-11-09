import 'dotenv/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      extra: {
        max: parseInt(process.env.DB_MAX_CONNECTIONS, 10),
        idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT, 10),
        connectionTimeoutMillis: parseInt(process.env.DB_CONNECTION_TIMEOUT, 10),
      },
    }),
    TasksModule,
  ],
})
export class AppModule {}
