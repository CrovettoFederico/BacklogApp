
export interface IBacklogItem {
  id?: string;
  title: string;
  description?: string;
  isOpen?: boolean;
  isFinished?: boolean;
  isDeleted?: boolean;
  createdAt?: Date;
  finishedAt?: Date;
  deadline?: Date;
  userId?: string;
}

export class BacklogItemModel implements IBacklogItem {
    id: string;
    title: string;
    description: string;
    isOpen: boolean;
    isFinished: boolean;
    isDeleted: boolean;
    createdAt: Date;
    finishedAt?: Date;    
    deadline?: Date;
    userId: string;

    constructor(item: Partial<IBacklogItem>) {
        this.id = item.id ?? "";
        this.title = item.title ?? "";
        this.description = item.description ?? "";
        this.isOpen = item.isOpen ?? false;
        this.isFinished = item.isFinished ?? false;
        this.createdAt = item.createdAt ?? new Date();
        this.finishedAt = item.finishedAt ?? undefined;
        this.deadline = item.deadline ?? undefined;
        this.userId = item.userId ?? "";
        this.isDeleted = item.isDeleted ?? false;
    }
    
}
