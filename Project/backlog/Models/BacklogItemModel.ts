
export interface IBacklogItem {
  id: string;
  title: string;
  description: string;
  isOpen: boolean;
  isChecked: boolean;
  createdAt: Date;
  finishedAt?: Date;
  deadline?: Date;
}

export class BacklogItemModel implements IBacklogItem {
    id: string;
    title: string;
    description: string;
    isOpen: boolean;
    isChecked: boolean;
    createdAt: Date;
    finishedAt?: Date;    
    deadline?: Date;
    
    constructor(item: Partial<IBacklogItem>) {
        this.id = item.id ?? "";
        this.title = item.title ?? "";
        this.description = item.description ?? "";
        this.isOpen = item.isOpen ?? false;
        this.isChecked = item.isChecked ?? false;
        this.createdAt = item.createdAt ?? new Date();
        this.finishedAt = item.finishedAt ?? undefined;
        this.deadline = item.deadline ?? undefined;
    }
    
}
