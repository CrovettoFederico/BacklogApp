import { IBacklogItem } from "@/Models/BacklogItemModel";

export interface IBackendGetter{
    getBacklogItems(userId : string): Promise<IBacklogItem[]>;
    getBacklogItemById(id: string): Promise<IBacklogItem | null>;    
}