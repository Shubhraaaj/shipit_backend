import { CreateTariffChartInput } from './create-tariff-chart.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTariffChartInput extends PartialType(CreateTariffChartInput) {
  @Field(() => Int)
  id: number;
}
