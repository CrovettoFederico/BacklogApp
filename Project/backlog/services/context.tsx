import { BacklogItemGetterFromJson } from "@/backendConnectors/BacklogItemGetterFromJSON";
import { BacklogItemSaverToJSON } from "@/backendConnectors/BacklogItemSaverToJSON";
import { IBacklogItem } from "@/Models/BacklogItemModel";
import { ItemsManager } from "./ItemsManager";

export class Context{
    private static instance: Context;
    private static isInitialized: boolean = false;
    public BacklogItems : IBacklogItem[] = [];

    private constructor(private _itemsManager : ItemsManager){

    }

   public SaveContext() : void {
        console.log("SaveContext");
        console.log(this.BacklogItems);
        this._itemsManager.saveBacklogItems(this.BacklogItems);        
        console.log("Despues de saved");
        console.log(this.BacklogItems);
   }

    public loadBacklogItemsToContext() : void{        
        this._itemsManager.loadBacklogItems().then((items : IBacklogItem[]) => {
            Context.getInstance().BacklogItems = items;            
        });        
    }
    
    public static getInstance() : Context{
        if (!Context.instance) {
            Context.instance = new Context(new ItemsManager(new BacklogItemGetterFromJson(), new BacklogItemSaverToJSON));
            Context.isInitialized = true;
        }
        return Context.instance;
    }
    
}