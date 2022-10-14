export interface User {
    readonly gender: string;
    readonly name: Name;
    readonly location: Location;
    readonly email: string;
    readonly login: Login;
    readonly dob: Dob;
    readonly registered: Registered;
    readonly phone: string;
    readonly cell: string;
    readonly id: Id;
    readonly picture: Picture;
    readonly nat: string;
    readonly age: number;
}

interface Name {
    readonly title: string;
    readonly first: string;
    readonly last: string;
}

interface Street {
    readonly number: number;
    readonly name: string;
}

interface Coordinates {
    readonly latitude: string;
    readonly longitude: string;
}

interface Timezone {
    readonly offset: string;
    readonly description: string;
}

interface Location {
    readonly street: Street;
    readonly city: string;
    readonly state: string;
    readonly country: string;
    readonly postcode: string;
    readonly coordinates: Coordinates;
    readonly timezone: Timezone;
}

interface Login {
    readonly uuid: string;
    readonly username: string;
    readonly password: string;
    readonly salt: string;
    readonly md5: string;
    readonly sha1: string;
    readonly sha256: string;
}

interface Dob {
    readonly date: string;
    readonly age: number;
}

interface Registered {
    readonly date: string;
    readonly age: number;
}

interface Id {
    readonly name: string;
    readonly value: string;
}

interface Picture {
    readonly large: string;
    readonly medium: string;
    readonly thumbnail: string;
}
