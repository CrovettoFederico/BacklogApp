import { IBacklogItem } from "@/Models/BacklogItemModel";
import { IUser } from "@/Models/User";

export interface IBackendSaver {

    /**
     * Saves the whole list of Backlog Items
     * @param items 
     */
    saveBacklogItems(items: IBacklogItem[]): Promise<void>;

    /**
     * Saves a Backlog Item and returns the updated list
     * @param item 
     * @param list 
     */
    addBacklogItem(item: IBacklogItem, list : IBacklogItem[]): Promise<IBacklogItem[]>;

    /**
     * Saves a User if doesnt exist.
     * @param phoneId 
     */
    SaveUser(phoneId: string): Promise<IUser>;

    UpdateItem(item: IBacklogItem): Promise<IBacklogItem>;
}