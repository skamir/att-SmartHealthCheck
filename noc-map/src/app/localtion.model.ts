export class LocaltionModel {
    phoneNumber: string;
    geoLocation: {
        latitude: number;
        longitude: number;
    }
    codeNumber: number;
}

export class MapLocationModel extends LocaltionModel {
    icon: string;
}
