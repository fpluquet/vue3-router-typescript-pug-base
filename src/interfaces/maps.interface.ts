// ToDo: Use native types
// export interface ISelectedAddress extends google.maps.places.PlaceResult {}
// export interface ISelectedAddress {
//     address_components: IAddresscomponent[];
//     adr_address: string;
//     formatted_address: string;
//     geometry: IGeometry;
//     icon: string;
//     id: string;
//     name: string;
//     place_id: string;
//     plus_code: IPluscode;
//     reference: string;
//     scope: string;
//     types: string[];
//     url: string;
//     utc_offset: number;
//     vicinity: string;
//     html_attributions: any[];
//     utc_offset_minutes: number;
// }


export interface IAddress {
  name: string;
  address1: string;
  number: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  notes: string;
}
