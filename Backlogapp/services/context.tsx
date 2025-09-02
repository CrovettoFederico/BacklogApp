import { BackendGetterFromAzure } from "@/backendConnectors/BackendGetterFromAzure";
import { BackendSaverToAzure } from "@/backendConnectors/BackendSaverToAzure";
import { IBacklogItem } from "@/Models/BacklogItemModel";
import { IUser, User } from "@/Models/User";
import { BackendManager } from "./ItemsManager";

export class Context{
    private static instance: Context;
    private static isInitialized: boolean = false;
    public itemsLoaded : boolean = false;
    public CurrentUser : IUser = new User();
    /**
     * Backlog items. Usar "AddItemToBacklog" Para agregar un item nuevo. Push no activara useEffects en otras views.
     */
    private _BacklogItems : IBacklogItem[] = [];

    public get BacklogItems(): IBacklogItem[] {
        return this._BacklogItems;
    }

    /** Singleton de Context */
    private constructor(private _BackendManager : BackendManager){
    }

    /**
     * Agrega un item al backlog y fuerza actualizacion en otras views.
     * @param item Item a agregar
     */
    public async addItemToBacklog(item: IBacklogItem): Promise<IBacklogItem[]> {
        // Creo nuevo array para actualizar referencias y volver a renderizar en las otras views
        const newList = await this._BackendManager.addBacklogItem(item, this._BacklogItems);

        this._BacklogItems = [...newList];
        return this._BacklogItems;
    }

    public async modifyBacklogItem(item: IBacklogItem): Promise<void> {
        await this._BackendManager.updateItem(item);
        const index = this._BacklogItems.findIndex(i => i.id === item.id);
        if (index !== -1) {
            this._BacklogItems[index] = item;
            // Creo nuevo array para actualizar referencias y volver a renderizar en las otras views
            this._BacklogItems = [...this._BacklogItems];
        }
    }

    /**
     * Guarda el contexto actual. (El Backlog como esta)
     */
   public async SaveContext() : Promise<void> {
        await this._BackendManager.saveBacklogItems(this.BacklogItems); 
   }

   /**
    * Carga los items del backlog y los deja en el contexto.
    */
    public async loadBacklogItemsToContext(PhoneId : string) : Promise<void>{     
        this._BacklogItems = await this._BackendManager.loadBacklogItems(PhoneId);
        this.itemsLoaded = true;
    }

    public async addBacklogItem(item : IBacklogItem) : Promise<boolean>{
        try{
            this._BacklogItems = await this._BackendManager.addBacklogItem(item, this._BacklogItems);
            return true;
        }catch{
            return false;
        }
    }
    
    public async SaveUser(PhoneId : string) : Promise<IUser>{
        return await this._BackendManager.SaveUser(PhoneId);
    }


    public static getInstance() : Context{
        if (!Context.instance) {
            Context.instance = new Context(new BackendManager(new BackendGetterFromAzure(), new BackendSaverToAzure()));
            Context.isInitialized = true;
        }
        return Context.instance;
    }
    
}