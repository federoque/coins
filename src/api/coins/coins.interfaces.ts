export interface Coin {
    id: number;
    x: number;
    y: number;
    z: number;
    owner: number | null;
}

export interface Metaverse {
    xmax: number;
    ymax: number;
    zmax: number;
}

export interface Room {
    xmin: number;
    xmax: number;
    ymin: number;
    ymax: number;
    zmin: number;
    zmax: number;
}
