import { BacklogItemGetterFromJson } from "@/backendConnectors/BacklogItemGetterFromJSON";
import { BacklogItemSaverToJSON } from "@/backendConnectors/BacklogItemSaverToJSON";
import { IBacklogItem } from "@/Models/BacklogItemModel";
import { ItemsManager } from "./ItemsManager";

export class Context{
    private static instance: Context;
    private static isInitialized: boolean = false;

    /**
     * Backlog items. Usar "AddItemToBacklog" Para agregar un item nuevo. Push no activara useEffects en otras views.
     */
    private _BacklogItems : IBacklogItem[] = [];

    public get BacklogItems(): IBacklogItem[] {
        return this._BacklogItems;
    }

    /** Singleton de Context */
    private constructor(private _itemsManager : ItemsManager){
    }

    /**
     * Agrega un item al backlog y fuerza actualizacion en otras views.
     * @param item Item a agregar
     */
    public addItemToBacklog(item: IBacklogItem): void {
        this._BacklogItems.push(item)
        // Creo nuevo array para actualizar referencias y volver a renderizar en las otras views
        this._BacklogItems = [...this._BacklogItems];            
    }

    public modifyBacklogItem(item: IBacklogItem): void {
        const index = this._BacklogItems.findIndex(i => i.id === item.id);
        if (index !== -1) {
            this._BacklogItems[index] = item;
            // Creo nuevo array para actualizar referencias y volver a renderizar en las otras views
            this._BacklogItems = [...this._BacklogItems];
        }
    }

    public deleteItemFromBacklog(item: IBacklogItem): void {
        this._BacklogItems = this._BacklogItems.filter(i => i.id !== item.id);
    }

    /**
     * Guarda el contexto actual. (El Backlog como esta)
     */
   public SaveContext() : void {
        this._itemsManager.saveBacklogItems(this.BacklogItems); 
   }

   /**
    * Carga los items del backlog y los deja en el contexto.
    */
    public loadBacklogItemsToContext() : void{        
        this._itemsManager.loadBacklogItems().then((items : IBacklogItem[]) => {
            this._BacklogItems = items;            
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