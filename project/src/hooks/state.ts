import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { State, AppDispatch } from 'types/state';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSlector: TypedUseSelectorHook<State> = useSelector;
