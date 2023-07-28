export type UploadData = {
    uuid: string | null;
    websiteData: string;
    favorite: boolean;
    time: {
        created: Date;
        modified: Date;
    };
}
