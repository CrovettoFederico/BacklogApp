import { Config } from "@/constants/Config";
import { IBacklogItem } from "@/Models/BacklogItemModel";
import { IBacklogItemGetter } from "./IBacklogItemGetter";

export class BacklogItemGetterFromAzure implements IBacklogItemGetter {
    
    getBacklogItemById(id: string): Promise<IBacklogItem | null> {
        throw new Error("Method not implemented.");
    }

    async getBacklogItems(userId : string): Promise<IBacklogItem[]> {    
        const response = await fetch(`${Config.ApiUrl}${Config.GetTasksByUser}?userId=${userId}`);            
        if (!response.ok) {
            throw new Error("Failed to fetch backlog items");
        }
        return await response.json() as Promise<IBacklogItem[]>;  
    }

    async ensureFileAndDefaultItems(){
        
    }
}