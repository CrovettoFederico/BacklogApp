
export interface IBacklogItem {
  id: string;
  title: string;
  description: string;
  isOpen: boolean;
  isChecked: boolean;
  createdDate: Date;
  finishedDate?: Date;
  deadlineDate?: Date;
}

export class BacklogItemModel implements IBacklogItem {
    id: string;
    title: string;
    description: string;
    isOpen: boolean;
    isChecked: boolean;
    createdDate: Date;
    finishedDate?: Date;    
    deadlineDate?: Date;
    
    constructor(item: Partial<IBacklogItem>) {
        this.id = item.id ?? "";
        this.title = item.title ?? "";
        this.description = item.description ?? "";
        this.isOpen = item.isOpen ?? false;
        this.isChecked = item.isChecked ?? false;
        this.createdDate = item.createdDate ?? new Date();
        this.finishedDate = item.finishedDate ?? undefined;
        this.deadlineDate = item.deadlineDate ?? undefined;
    }
    
}
