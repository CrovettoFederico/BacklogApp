import { IBackendGetter } from "@/backendConnectors/IBackendGetter";
import { IBackendSaver } from "@/backendConnectors/IBackendSaver";
import { IBacklogItem } from "@/Models/BacklogItemModel";
import { IUser } from "@/Models/User";



export class BackendManager{
    constructor(private backendGetter: IBackendGetter,
                private backendSaver : IBackendSaver) {

    }

    async updateItem(item: IBacklogItem): Promise<IBacklogItem> {
        return await this.backendSaver.UpdateItem(item);
    }

    async addBacklogItem (item : IBacklogItem, list: IBacklogItem[]) : Promise<IBacklogItem[]> {         
        return await this.backendSaver.addBacklogItem(item, list);
    }

   async loadBacklogItems(PhoneId : string): Promise<IBacklogItem[]>{        
        const list = await this.backendGetter.getBacklogItems(PhoneId);        
        return list;
    }

    async saveBacklogItems(items: IBacklogItem[]): Promise<void> {
        await this.backendSaver.saveBacklogItems(items);
    }

    async SaveUser(PhoneId : string) : Promise<IUser>{
        return await this.backendSaver.SaveUser(PhoneId);
    }

}