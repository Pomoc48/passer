export type Website = {
    uuid: string;
    favorite: boolean;
    data: {
        name: string;
        password: string | undefined;
        url: string | undefined;
        username: string | undefined;
        note: string | undefined;
    },
    time: {
        created: Date;
        modified: Date;
    };
}
