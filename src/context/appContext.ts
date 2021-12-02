import {createContext, useContext} from 'react';
import {AlertOverlayProps} from "./alertOverlay";
import {ModalOverlayProps} from "./modalOverlay";

export type AppContextType = {
    setLoading: (loading: boolean, timeout?: number) => void,
    showAlert: (option: AlertOverlayProps) => () => void,
    showModal: (option: ModalOverlayProps) => void,
    dismissModal: () => void,
    dismissAlert: () => void
}
export const AppContext = createContext<AppContextType>({
    setLoading: (_loading, _timeout) => {
    },
    showAlert: (_option) => {
        return () => {

        }
    },
    showModal: (_option) => {

    },
    dismissModal: () => {

    },
    dismissAlert: () => {

    },
});

export const useAppContext = () => {
    return useContext(AppContext);
};
export const useSetLoading = (): ((loading: boolean, timeout?: number) => void) => {
    return useAppContext().setLoading;
};
export const useShowAlert = (): (option: AlertOverlayProps) => () => void => {
    return useAppContext().showAlert;
};
export const useShowModal = (): (option: ModalOverlayProps) => void => {
    return useAppContext().showModal;
};
export const useDismissModal = (): () => void => {
    return useAppContext().dismissModal;
};
export const useDismissAlert = (): () => void => {
    return useAppContext().dismissModal;
};
