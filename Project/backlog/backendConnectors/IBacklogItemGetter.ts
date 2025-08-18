import { IBacklogItem } from "@/Models/BacklogItemModel";

export interface IBacklogItemGetter{
    getBacklogItems(): Promise<IBacklogItem[]>;
    getBacklogItemById(id: string): Promise<IBacklogItem | null>;
}