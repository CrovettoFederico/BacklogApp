import { BacklogItemGetterFromJson } from "@/backendConnectors/BacklogItemGetterFromJSON";
import { IBacklogItemGetter } from "@/backendConnectors/IBacklogItemGetter";
import { IBacklogItemSaver } from "@/backendConnectors/IBacklogItemSaver";
import { IBacklogItem } from "@/Models/BacklogItemModel";

const backlogItemGetter: IBacklogItemGetter = new BacklogItemGetterFromJson();

export class ItemsManager{
    constructor(private backlogItemGetter: IBacklogItemGetter,
                private backlogItemSaver : IBacklogItemSaver) {

    }

   async loadBacklogItems(userId : string): Promise<IBacklogItem[]>{        
        const list = await this.backlogItemGetter.getBacklogItems(userId);        
        return list;
    }

    async saveBacklogItems(items: IBacklogItem[]): Promise<void> {
        await this.backlogItemSaver.saveBacklogItems(items);
    }


}