import { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';

type BacklogItemState = {
    isChecked: boolean,
    isOpen: boolean
};

export function useBacklogItemState(_isChecked?: boolean) {
    const [isOpen, setIsOpen] = useState(false);
    const [isChecked, setChecked] = useState(_isChecked ?? false);
    const refDissappear = useRef(new Animated.Value(1)).current;
    
    useEffect(()=>{
        
    },[]);

    const handleChecked = (checked: boolean, onFadeOutEnd? : (checked: boolean) => void)=>{
        setChecked(checked);        
        Animated.timing(refDissappear, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            if (onFadeOutEnd) onFadeOutEnd(checked);
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
        handleOpen,
        setIsChecked
    };
}