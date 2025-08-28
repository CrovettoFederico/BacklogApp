import { Config } from "@/constants/Config";
import { IBacklogItem } from "@/Models/BacklogItemModel";
import { IUser } from "@/Models/User";
import * as FileSystem from 'expo-file-system';
import { IBackendSaver } from "./IBackendSaver";

const fileUri = FileSystem.documentDirectory + Config.FileName;

export class BackendSaverToAzure implements IBackendSaver {

    async UpdateItem(item: IBacklogItem): Promise<IBacklogItem> {
        console.log("Updating item in Azure: ", item);
        const response = await fetch(`${Config.ApiUrl}${Config.UpdateTask}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
        });
        return Promise.resolve(await response.json() as IBacklogItem);
    }

    async addBacklogItem(item: IBacklogItem, list: IBacklogItem[]): Promise<IBacklogItem[]> {

        const response = await fetch(`${Config.ApiUrl}${Config.PostTask}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
        });            
        console.log(response);
        if (!response.ok) {
            console.log(response.status)
            throw new Error("Failed to add backlog item \n Error Code: " + response.status + " \n " +  response.statusText);
        }
        let newItem= await response.json() as IBacklogItem;

        list.push(newItem);
        return Promise.resolve(list);
        
    }

    async saveBacklogItems(items: IBacklogItem[]): Promise<void> {
        
        items.forEach(async i=>{
            let response = await this.UpdateItem(i);            
        })
        return Promise.resolve();
    }    

    async SaveUser(phoneId: string): Promise<IUser> {
        const response = await fetch(`${Config.ApiUrl}${Config.PostUser}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phoneId: phoneId }),
        });
        if (!response.ok) {
            console.log(response.status)
            throw new Error("Failed to save user \n Error Code: " + response.status + " \n " +  response.statusText);
        }
        return Promise.resolve(response.json() as IUser);
    }
}