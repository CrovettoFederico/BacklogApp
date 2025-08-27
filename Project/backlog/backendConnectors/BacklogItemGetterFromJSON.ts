import { Config } from "@/constants/Config";
import { DefaultItems } from "@/constants/DefaultItems";
import { IBacklogItem } from "@/Models/BacklogItemModel";
import * as FileSystem from 'expo-file-system';
import { IBacklogItemGetter } from "./IBacklogItemGetter";






const fileUri = FileSystem.documentDirectory + Config.FileName;

export class BacklogItemGetterFromJson implements IBacklogItemGetter {
    getBacklogItemById(id: string): Promise<IBacklogItem | null> {
        throw new Error("Method not implemented.");
    }

    async getBacklogItems(userId : string): Promise<IBacklogItem[]> {
        await this.ensureFileAndDefaultItems();
        
        const jsonString = await FileSystem.readAsStringAsync(fileUri);
        const data = JSON.parse(jsonString) as IBacklogItem[];
        return Promise.resolve(data);
    }

    async ensureFileAndDefaultItems(){
        const fileInfo = await FileSystem.getInfoAsync(fileUri);
        if (!fileInfo.exists) {
            await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(DefaultItems, null, 2));
        }
    }
}