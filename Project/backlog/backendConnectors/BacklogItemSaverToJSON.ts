import { Config } from "@/constants/Config";
import { IBacklogItem } from "@/Models/BacklogItemModel";
import * as FileSystem from 'expo-file-system';
import { IBacklogItemSaver } from "./IBacklogItemSaver";

const fileUri = FileSystem.documentDirectory + Config.FileName;

export class BacklogItemSaverToJSON implements IBacklogItemSaver {

    async saveBacklogItems(items: IBacklogItem[]): Promise<void> {
        const jsonString = JSON.stringify(items, null, 2);
        await FileSystem.writeAsStringAsync(fileUri, jsonString);
        return Promise.resolve();
    }
    

  
}