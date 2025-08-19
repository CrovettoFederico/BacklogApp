import { IBacklogItem } from '@/Models/BacklogItemModel';
import { ResultType } from '@/Models/ResultType';
import { Context } from '@/services/context';
import { useEffect, useState } from 'react';

export function useBacklogState(initialItems: IBacklogItem[] = []) {
    const [items, setItems] = useState<IBacklogItem[]>([]);
    const [result, setResult] = useState<ResultType>({ result: "info", message: "", isShown: false });
    useEffect(()=>{
        setItems(Context.getInstance().BacklogItems);
    },[Context.getInstance().BacklogItems]);

     const handleUpdateItem=(item: IBacklogItem, checked : boolean)=>{
        console.log("HandleUpdateItem")
        try{
            
            const itemToUpdate = { ...item, isChecked: checked };
            if (!itemToUpdate) {
                console.warn(`Item with id ${item.id} not found.`);
                return;
            }
            Context.getInstance().modifyBacklogItem(itemToUpdate!);
            Context.getInstance().SaveContext();
            if (checked) {
                setResult({
                    result: "success",
                    message: "Item completed!",
                    isShown: true
                });
            } else {
                setResult({
                    result: "info",
                    message: "Item marked as pending.",
                    isShown: true
                });
            }
        }catch(error){
            setResult({
                result: "error",
                message: "Error completing item :(",
                isShown: true
            })
        }
    }

    const handleRemoveItem=(item : IBacklogItem)=>{
        try{
            Context.getInstance().deleteItemFromBacklog(item);
            setResult({
                result: "info",
                message: "Item deleted.",
                isShown: true
            });
        }catch{
            setResult({
                result: "error",
                message: "Error removing item :(",
                isShown: true
            });
        }
    }

    const handleCloseMessage = (): void => {
        setResult({isShown: false, result: "info", message: ""});
    };

    return {
        items,
        handleRemoveItem,
        result,
        handleCloseMessage,
        handleUpdateItem
    };
}