import { IBacklogItem } from '@/Models/BacklogItemModel';
import { Context } from '@/services/context';
import { useEffect, useState } from 'react';

export function useBacklogState(initialItems: IBacklogItem[] = []) {
    const [items, setItems] = useState<IBacklogItem[]>([]);
  
    useEffect(()=>{
        setItems(Context.getInstance().BacklogItems);
    },[Context.getInstance().BacklogItems]);

     const handleRemoveItem=(item: IBacklogItem, checked : boolean)=>{
        const itemToUpdate = items.find(i => i.id === item.id);
        if (!itemToUpdate) {
            console.warn(`Item with id ${item.id} not found.`);
            return;
        }
        itemToUpdate!.isChecked = checked;
        var oldList = items.filter(i => i.id !== item.id);
        var newList = [...oldList, itemToUpdate!];
        setItems(prevItems => newList);        
        Context.getInstance().BacklogItems = items;
        console.log(items);
        Context.getInstance().SaveContext();
    }

    return {
        items,
        handleRemoveItem
    };
}