import { ResultType } from '@/Models/ResultType';
import { Context } from '@/services/context';
import { useEffect, useState } from 'react';
import { DateType, useDefaultStyles } from 'react-native-ui-datepicker';



export function useAddFormState() {
    const [titulo, onChangeTitulo] = useState('');
    const [descripcion, onChangeDescripcion] = useState('');    
    const [deadline, setDeadline] = useState<DateType>();    
    const defaultStyles = useDefaultStyles();
    const [result, setResult] = useState<ResultType>({ result: "info", message: "", isShown: false });
    useEffect(()=>{
        
    }, []);

     const HandleSumbitItem =(Titulo: string, Descripcion : string, Deadline : DateType  ) : void => {
        try{
            var newId = Context.getInstance().BacklogItems.length + 1;
            
            console.log(deadline);

            Context.getInstance().addItemToBacklog({
                createdDate: new Date(),
                title: Titulo,
                description: Descripcion,
                id : newId.toString(),
                isChecked: false,
                isOpen: false,
                deadlineDate: Deadline as Date
            })
            // Creo nuevo array para actualizar referencias y volver a renderizar en las otras views
            
            Context.getInstance().SaveContext();
            resetForm();
            setResult({
                result: "success",
                message: "Item added successfully!",
                isShown: true
            })
        }catch{
            setResult({
                result: "error",
                message: "Error adding Item :(",
                isShown: true
            })
        }
    }

    const handleCloseMessage = (): void => {
        setResult({isShown: false, result: "info", message: ""});
    };

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
        setDeadline,
        result,
        handleCloseMessage

    };
}