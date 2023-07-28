export type Website = {
    uuid: string;
    favorite: boolean;
    data: {
        name: string;
        password: string | null;
        url: URL | null;
        username: string | null;
    },
    time: {
        created: Date;
        modified: Date;
    };
}
