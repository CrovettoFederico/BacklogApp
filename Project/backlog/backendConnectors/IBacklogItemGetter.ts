import { IBacklogItem } from "@/Models/BacklogItemModel";

export interface IBacklogItemGetter{
    getBacklogItems(userId : string): Promise<IBacklogItem[]>;
    getBacklogItemById(id: string): Promise<IBacklogItem | null>;
}