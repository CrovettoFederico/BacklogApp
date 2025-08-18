import { IBacklogItem } from "@/Models/BacklogItemModel";
export const DefaultItems : IBacklogItem[] = [
    {
        id: "1",
        title: "Esto es una tarea",
        description: "Y esta su descripcion.",
        isChecked :false,
        createdDate: new Date(),
        finishedDate: undefined,
        deadlineDate: undefined,
        isOpen: false
    },
    {
        id: "2",
        title: "Crea tus propias tareas!",
        description: "Y cumple tus objetivos!",
        isChecked :false,
        createdDate: new Date(new Date().toLocaleDateString("ar-es")),
        finishedDate: undefined,        
        deadlineDate: undefined,
        isOpen: false
    }
]