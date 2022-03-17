import {
  CreateShipmentInput,
  GetShipmentInput,
  DeleteShipmentInput,
  UpdateShipmentInput,
  ShipmentModel
} from "../schema/shipment.schema";

class ShipmentService {
  async createShipment(input: CreateShipmentInput) {
    return ShipmentModel.create(input);
  }

  async getShipments() {
    // Pagination login
    const totalProducts = await ShipmentModel.find().lean();
    return {
      totalNum: totalProducts.length,
      totalProducts,
    };
  }

  async findPaginatedShipments(limit: number, page: number) {
    // Pagination login
    const totalProducts = await ShipmentModel.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();
    return {
      totalNum: limit,
      totalProducts,
    };
  }
  async findSingleShipment(input: GetShipmentInput) {
    return ShipmentModel.findOne(input).lean();
  }

  async deleteProduct(input: DeleteShipmentInput) {
    console.log("input", input);
    await ShipmentModel.remove({ _id: input._id });
    return true;
  }
  async updateProduct(id: string, inputOptions: UpdateShipmentInput) {
    console.log("input", inputOptions);
    await ShipmentModel.updateOne({ _id: id }, { ...inputOptions });
    const updatedProduct = await ShipmentModel.find({ _id: id });
    console.log("updated product", updatedProduct);
    return true;
  }
}

export default ShipmentService;
