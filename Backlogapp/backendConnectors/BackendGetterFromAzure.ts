import { Config } from "@/constants/Config";
import { DefaultItems } from "@/constants/DefaultItems";
import { IBacklogItem } from "@/Models/BacklogItemModel";
import { IBackendGetter } from "./IBackendGetter";

export class BackendGetterFromAzure implements IBackendGetter {

    getBacklogItemById(id: string): Promise<IBacklogItem | null> {
        throw new Error("Method not implemented.");
    }

    async getBacklogItems(PhoneId : string): Promise<IBacklogItem[]> {    
        try{            
            const response = await fetch(`${Config.ApiUrl}${Config.GetTasksByUser}?phoneId=${PhoneId}`);            
            if (!response.ok) {
                console.log(response);

                throw new Error("Failed to fetch backlog items");
            }
            let list = await response.json() as IBacklogItem[];  
            if(!list || list.length === 0){
                list = this.ensureFileAndDefaultItems();
            }
            return list;
        } catch (error) {
            console.log(error);
            return this.ensureFileAndDefaultItems();
        }
    }

    private ensureFileAndDefaultItems(){
        return DefaultItems;
    }
}