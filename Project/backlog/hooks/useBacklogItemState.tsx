import { useEffect, useState } from 'react';
import { runOnJS, useSharedValue, withTiming } from 'react-native-reanimated';

type BacklogItemState = {
    isChecked: boolean,
    isOpen: boolean
};

export function useBacklogItemState(_isChecked?: boolean) {
    const [isOpen, setIsOpen] = useState(false);
    const [isChecked, setChecked] = useState(_isChecked ?? false);
    const refDissappear = useSharedValue(1);
    
    useEffect(()=>{
        
    },[]);

    const handleChecked = (checked: boolean, onFadeOutEnd? : (checked: boolean) => void)=>{
        setChecked(checked);     
        refDissappear.value = withTiming(0, { duration: 300 }, (finished) => {
            if (finished && onFadeOutEnd){
                runOnJS(onFadeOutEnd)(checked);
            }
        });        
    };

    const setIsChecked = (checked: boolean) => {
        setChecked(checked);
    };

    const handleOpen = ()=>{
        setIsOpen((value) => !value);
    }


    return {
        isOpen,
        isChecked,
        refDissappear,        
        handleChecked,
        handleOpen 
    };
}