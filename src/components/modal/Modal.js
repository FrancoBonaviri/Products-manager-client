import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../actions/uiActions';
import './Modal.css'


export const Modal = (props) => {


    const body = useMemo(() => document.getElementsByClassName('page-wrapper'));
    const { ModalOpen, ModalBody, ModalTitle } = useSelector(state => state.ui);
    const dispatch = useDispatch();

    useEffect(() => {
        if( ModalOpen ) {
            body[0].style.opacity = .5;
        } else {
            body[0].style.opacity = 1;
        }
    }, [ModalOpen])

    const handlerCloseModal = () => {
        dispatch( closeModal() );
    }


    return (
        <div style={{ display: ModalOpen ? 'block' : 'none' }} className={ ModalOpen ? 'modal fade show' : 'modal fade' } id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{ ModalTitle }</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={ handlerCloseModal }>
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    { ModalBody }
                </div>
            </div>
        </div>
    )
}
