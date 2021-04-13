import { types } from "../reducers/types";

export const openModal = ( ModalBody, ModalTitle ) => {
    return {
        type: types.ModalOpen,
        payload: {
            ModalBody, 
            ModalTitle
        }
    };
};

export const closeModal = () => {
    return {
        type: types.ModalClose,
        payload: {} 
    };
};

export const openAlert = ( AlertType, AlertText ) => {
    return {
        type: types.AlertOpen,
        payload: {
            AlertText,
            AlertType
        }
    };
}

export const closeAlert = () => {
    return {
        type: types.AlertClose,
        payload: {}
    };
}