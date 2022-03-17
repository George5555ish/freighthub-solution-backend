import {
  CreateShipmentInput,
  GetShipmentInput,
  DeleteShipmentInput,
  UpdateShipmentInput,
  SortedShipmentOptionsInput,
  ShipmentModel,
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

  async findSortedShipments(
    ascending: boolean,
    sortOptions: SortedShipmentOptionsInput
  ) {
    // Pagination login

    const sortOrder = ascending ? 1 : -1;
    const params = sortOptions["sortParams"];

    let totalProducts;
    switch (params) {
      case "price":
        totalProducts = await ShipmentModel.find().sort({ price: sortOrder });
        return {
          totalNum: totalProducts.length,
          totalProducts,
        };
        break;

      case "name":
        totalProducts = await ShipmentModel.find().sort({ name: sortOrder });
        return {
          totalNum: totalProducts.length,
          totalProducts,
        };
        break;

      case "_id":
        totalProducts = await ShipmentModel.find().sort({ name: sortOrder });
        return {
          totalNum: totalProducts.length,
          totalProducts,
        };
        break;
      default:
        break;
    }
   
  }
  async findSingleShipment(input: GetShipmentInput) {
    return ShipmentModel.findOne(input).lean();
  }

  async deleteShipment(input: DeleteShipmentInput) {
    console.log("input", input);
    await ShipmentModel.remove({ _id: input._id });
    return true;
  }
  async updateShipment(id: string, inputOptions: UpdateShipmentInput) {
    console.log("input", inputOptions);
    await ShipmentModel.updateOne({ _id: id }, { ...inputOptions });
    const updatedProduct = await ShipmentModel.find({ _id: id });
    console.log("updated product", updatedProduct);
    return true;
  }
}

export default ShipmentService;
