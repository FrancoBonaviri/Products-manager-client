import { types } from "./types";


const initialState = {
    ModalOpen: false,
    ModalBody: ''
};


export const uiReducer = ( state = initialState, action ) => {

    switch (action.type) {
        case types.ModalOpen:
            return { 
                ...state,
                ModalOpen: true,
                ModalBody: action.payload.ModalBody,
                ModalTitle: action.payload.ModalTitle
            };
        case types.ModalClose: 
            return { 
                ...state, 
                ModalOpen: false,
                ModalBody: null,
                ModalTitle: ''
            }
        case types.AlertOpen: 
            return {
                ...state,
                AlertOpen: true,
                AlertText: action.payload.AlertText,
                AlertType: action.payload.AlertType
            }
        case types.AlertClose: 
            return {
                ...state,
                AlertOpen: false,
                AlertText: '',
                AlertType: undefined
            }
        default:
            return state;
    }

};