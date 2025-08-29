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

     const HandleSumbitItem = async (Titulo: string, Descripcion : string, Deadline : DateType  ) : Promise<void> => {
        try{
            //var newId = Context.getInstance().BacklogItems.length + 1;
            
            await Context.getInstance().addItemToBacklog({
                createdAt: new Date(),
                title: Titulo,
                description: Descripcion,
                isFinished: false,
                isOpen: false,
                deadline: Deadline as Date,
                userId: Context.getInstance().CurrentUser.id!,
            })
            // TENGO QUE VER QUE PASA EN LA API Y MEJORAR SU LOGUEOS
            
            //Context.getInstance().SaveContext();

            resetForm();
            setResult({
                result: "success",
                message: "Item added successfully!",
                isShown: true
            })
        }catch (Error){
            console.log(Error);
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