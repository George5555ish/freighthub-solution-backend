import { Arg, Authorized, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import {
  CreateShipmentInput,
  GetShipmentInput,
  DeleteShipmentInput,
  UpdateShipmentInput,
  GetShipmentResponse,
  Shipment
} from "../schema/shipment.schema";
import ShipmentService from "../services/shipment.service";

@Resolver()
export default class ShipmentResolver {
  constructor(private shipmentService: ShipmentService) {
    this.shipmentService = new ShipmentService();
  }

  //   @Authorized()
  @Mutation(() => Shipment)
  createShipment(@Arg("input") input: CreateShipmentInput) {
    return this.shipmentService.createShipment({ ...input });
  }

  @Query(() => GetShipmentResponse)
  getShipments() {
    return this.shipmentService.getShipments();
  }

  @Query(() => GetShipmentResponse)
  getPaginatedShipments(
      @Arg("limit", () => Int) limit: number,
      @Arg("page", () => Int) page: number,
  ) {
    return this.shipmentService.findPaginatedShipments(limit,page);
  }

  @Query(() => Shipment)
  findSingleShipment(@Arg("input") input: GetShipmentInput) {
    return this.shipmentService.findSingleShipment({ ...input });
  }

  @Mutation(() => Boolean)
  deleteProduct(
    @Arg("input", () => DeleteShipmentInput) input: DeleteShipmentInput
  ) {
    return this.shipmentService.deleteProduct(input);
  }

  @Mutation(() => Boolean)
  updateProduct(
    @Arg("id", () => String) id: string,
    @Arg("inputOptions", () => UpdateShipmentInput)
    inputOptions: UpdateShipmentInput
  ){
    return this.shipmentService.updateProduct(id, inputOptions);
  }
}
