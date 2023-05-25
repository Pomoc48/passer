export type Website = {
    uuid: string;
    favorite: boolean;
    data: {
        name: string;
        note: string | null;
        password: string | null;
        url: URL | null;
        username: string | null;
    },
    time: {
        created: Date;
        modified: Date;
        used: Date;
    };
}
