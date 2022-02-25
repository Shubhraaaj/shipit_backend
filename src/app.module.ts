import { Module } from '@nestjs/common';
import { VendorsModule } from './vendors/vendors.module';
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule, } from '@nestjs/serve-static';
// import { Vendor } from './vendors/entities/vendor.entity'
import { TariffChartModule } from './tariff-chart/tariff-chart.module';
import { ConfigModule } from '@nestjs/config';
import { Auths } from './vendors/entities/auth.entity';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `${process.env.NODE_ENV}.env` }),
    VendorsModule,
    GraphQLModule.forRoot(
      {
        autoSchemaFile: join(process.cwd(), 'src/graphql-schema.gql'),
        context: (({ req }) => ({ headers: req.headers }))
      }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: 'localhost',
      port: 5432,
      username: "shipitadmin",
      password: "shipit@123",
      database: "shipit",
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true, // don't use it in production
    })
    , Auths,
    // AuthModule,
    TariffChartModule,
    OrderModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule { }
