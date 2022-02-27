"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const vendors_module_1 = require("./vendors/vendors.module");
const graphql_1 = require("@nestjs/graphql");
const path_1 = require("path");
const typeorm_1 = require("@nestjs/typeorm");
const tariff_chart_module_1 = require("./tariff-chart/tariff-chart.module");
const config_1 = require("@nestjs/config");
const auth_entity_1 = require("./vendors/entities/auth.entity");
const order_module_1 = require("./order/order.module");
const user_module_1 = require("./user/user.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ envFilePath: `${process.env.NODE_ENV}.env` }),
            vendors_module_1.VendorsModule,
            graphql_1.GraphQLModule.forRoot({
                autoSchemaFile: (0, path_1.join)(process.cwd(), 'src/graphql-schema.gql'),
                context: (({ req }) => ({ headers: req.headers }))
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: "postgres",
                host: '13.234.187.25',
                port: 5432,
                username: "shipitadmin",
                password: "shipit@123",
                database: "shipit",
                entities: ["dist/**/*.entity{.ts,.js}"],
                synchronize: true,
            }),
            auth_entity_1.Auths,
            tariff_chart_module_1.TariffChartModule,
            order_module_1.OrderModule,
            user_module_1.UserModule
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map