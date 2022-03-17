import ShipmentResolver from "./shipment.resolver";
import UserResolver from "./user.resolver";

export const resolvers = [UserResolver, ShipmentResolver] as const;