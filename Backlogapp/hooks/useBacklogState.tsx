import { IBacklogItem } from '@/Models/BacklogItemModel';
import { ResultType } from '@/Models/ResultType';
import { Context } from '@/services/context';
import { useEffect, useState } from 'react';

export function useBacklogState(initialItems: IBacklogItem[] = []) {
    const [items, setItems] = useState<IBacklogItem[]>([]);
    
    useEffect(()=>{
        setItems(Context.getInstance().BacklogItems);
    },[Context.getInstance().BacklogItems]);

     const handleUpdateItem=(item: IBacklogItem, checked : boolean) : ResultType=>{
        try{            
            const itemToUpdate = { ...item, isFinished: checked };
            if (!itemToUpdate) {
                console.warn(`Item with id ${item.id} not found.`);
                return {
                    result: "error",
                    message: "Item not found.",
                    isShown: true
                } as ResultType;
            }
            
            Context.getInstance().modifyBacklogItem(itemToUpdate!);
            if (checked) {
                return{
                    result: "success",
                    message: "Item completed!",
                    isShown: true
                } as ResultType;
            } else {
                return {
                    result: "info",
                    message: "Item marked as pending.",
                    isShown: true
                } as ResultType;
            }
        }catch(error){
            return{
                result: "error",
                message: "Error completing item :(",
                isShown: true
            } as ResultType;
        }
    }

    const handleRemoveItem=(item : IBacklogItem) : ResultType=>{
        try{
            const itemToUpdate = { ...item, isDeleted: true };
            Context.getInstance().modifyBacklogItem(itemToUpdate);
            return{
                result: "info",
                message: "Item deleted.",
                isShown: true
            } as ResultType;
        }catch{
            return{
                result: "error",
                message: "Error removing item :(",
                isShown: true
            } as ResultType;            
        }
    }

    

    return {
        items,
        handleRemoveItem,
        handleUpdateItem
    };
}