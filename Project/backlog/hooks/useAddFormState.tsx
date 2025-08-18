import { Context } from '@/services/context';
import { useEffect, useState } from 'react';
import { DateType, useDefaultStyles } from 'react-native-ui-datepicker';

export function useAddFormState() {
    const [titulo, onChangeTitulo] = useState('');
    const [descripcion, onChangeDescripcion] = useState('');    
    const [deadline, setDeadline] = useState<DateType>();    
    const defaultStyles = useDefaultStyles();
  
    useEffect(()=>{
        
    }, []);

     const HandleSumbitItem=(Titulo: string, Descripcion : string, Deadline : DateType  )=>{
        var newId = Context.getInstance().BacklogItems.length + 1;
        
        Context.getInstance().BacklogItems.push({
            createdDate: new Date(),
            title: Titulo,
            description: Descripcion,
            id : newId.toString(),
            isChecked: false,
            isOpen: false,
            deadlineDate: Deadline as Date
        })
        Context.getInstance().SaveContext();
        resetForm();
    }


    const resetForm = (): void => {
        onChangeTitulo('');
        onChangeDescripcion('');
        setDeadline(undefined);
    }
    return {
        HandleSumbitItem,
        titulo,
        descripcion,
        deadline,
        defaultStyles,
        onChangeTitulo,
        onChangeDescripcion,
        setDeadline

    };
}