import { postLocation } from "../../lib/type";

export function buildPayload(address: any): postLocation {
  return {
    full_name: address.name,
    phone: address.phone,
    governorate_id: address.governorateId,
    city_id: address.cityId,
    area_id: address.areaId,
    address_details: address.details,
    latitude: "9.933468557950285",
    longitude: "31.8412072956562"
  };
}