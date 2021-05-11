import { IAddress } from '@/interfaces/maps.interface';

export const decodeSelectedAddress = (place: any): IAddress => {
    return {
        name: place?.formatted_address || '',
        address1:
            place?.address_components?.find((x: { types: string | string[]; }) => x.types.includes('route'))
                ?.long_name || '',
        number:
            place?.address_components?.find((x: { types: string | string[]; }) => x.types.includes('street_number'))
                ?.long_name || '',
        city:
            place?.address_components?.find((x: { types: string | string[]; }) => x.types.includes('locality'))
                ?.long_name ||
            '',
        state:
            place?.address_components?.find((x: { types: string | string[]; }) =>
                x.types.includes('administrative_area_level_1')
            )?.long_name || '',
        zipCode:
            place?.address_components?.find((x: { types: string | string[]; }) => x.types.includes('postal_code'))
                ?.long_name || '',
        country:
            place?.address_components?.find((x: { types: string | string[]; }) => x.types.includes('country'))
                ?.long_name || '',
        notes: '',
    };
};