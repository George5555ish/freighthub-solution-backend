import { getModelForClass, index, prop } from "@typegoose/typegoose";
import { Field, InputType, Int, ObjectType } from "type-graphql";
import { customAlphabet } from "nanoid"; 
import { IsNumber, MaxLength, Min, MinLength } from "class-validator";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz123456789", 10);

@ObjectType()
@index({ productId: 1 })
export class Shipment {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @prop({ required: true })
  name: string;

  @Field(() => String)
  @prop({ required: true })
  description: string;

  @Field(() => String)
  @prop({ required: true })
  price: string;

  @Field(() => String)
  @prop({ required: true, default: () => `product_${nanoid()}, unique: true}` })
  productId: string;
}

export const ShipmentModel = getModelForClass<typeof Shipment>(Shipment);

@InputType()
export class CreateShipmentInput {
  @Field()
  name: string;

  @MinLength(20, {
    message: "Description must be at least 20 characters",
  })
  @MaxLength(1000, {
    message: "Description must not be more than 1000 characters",
  })
  @Field()
  description: string;

  @IsNumber()
  @Min(1)
  @Field()
  price: number;
}

@InputType()
export class GetShipmentInput {
  @Field()
  productId: string;
  
}
@InputType()
export class GetPaginatedShipmentInput {
  
  @Field(() => Int)
  page: number;

  @Field(() => Int)
  limit: number;
}

@InputType()
export class GetSortedShipmentInput {
  
  @Field(() => Boolean)
  ascending: boolean;

  @Field(() => Boolean)
  sortOptions: boolean;
}

@InputType()
export class DeleteShipmentInput {
  @Field()
  _id: string
}

@InputType()
export class UpdateShipmentInput {
  @Field(() => String, {nullable: true})
  name: string | null;

  @MinLength(20, {
    message: "Description must be at least 20 characters",
  })
  @MaxLength(1000, {
    message: "Description must not be more than 1000 characters",
  })
  @Field(() => String, {nullable: true})
  description: string| null;

  @IsNumber()
  @Min(1)
  @Field(() => Int, {nullable: true})
  price: number| null;
 
}

@ObjectType()
export class GetShipmentResponse{
  @Field(() => Int)
  totalNum: number
  
  @Field(() => [Shipment])
  totalProducts: [Shipment]
}

@InputType()
export class SortedShipmentOptionsInput {

  @Field(() => String,{nullable: true, defaultValue: "price"})
  sortParams: string | null;
}