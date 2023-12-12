export default interface IFindNeighborhoodAdvertsDTO {
  exceptUserId: string;
  exceptPostalCode: string;
  exceptAddressNumber: number;
  latitude: number;
  longitude: number;
  max_distance: number;
}
