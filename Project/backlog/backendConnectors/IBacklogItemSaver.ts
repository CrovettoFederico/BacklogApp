import { IBacklogItem } from "@/Models/BacklogItemModel";

export interface IBacklogItemSaver {
    saveBacklogItems(items: IBacklogItem[]): Promise<void>;
}