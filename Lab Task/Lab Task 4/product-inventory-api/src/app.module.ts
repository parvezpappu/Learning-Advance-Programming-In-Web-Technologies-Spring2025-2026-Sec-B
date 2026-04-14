import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';

  @Module({
  imports: [ProductsModule, TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'parvez@627',
  database: 'product_inventory_db',
  autoLoadEntities: true,
  synchronize: true,
  }),
  ],
  })
  export class AppModule {}
