export type UploadData = {
    uuid: string;
    websiteData: string;
    favorite: boolean;
    time: {
        created: Date;
        modified: Date;
        used: Date;
    };
}
