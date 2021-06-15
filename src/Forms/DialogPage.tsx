import React, {useEffect, ReactNode} from "react";
import Modal from 'react-modal';

Modal.setAppElement('#root')
if (Modal.defaultStyles) {
    if (Modal.defaultStyles.overlay) {
        if (Modal.defaultStyles.overlay.backgroundColor) {
            Modal.defaultStyles.overlay.backgroundColor = '#00000044'
        }
    }
}

const customStyles = {
    content : {
        width: '300px',
        height: '200px',
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};
export interface IDialogProps {
    isOpen: boolean,
    title: string,
    children?: ReactNode,
    onClose: any,
    onSave?: any,
    btnOk: string,
    btnCancel: string,
}

export const DialogPage = (props: IDialogProps) => (
    <Modal
        style={customStyles}
        isOpen={props.isOpen}
        onRequestClose={props.onClose}>
        <div className="modalDialog">
            <div className="title">
                <h2>{props.title}</h2>
            </div>
            <div className="content">
                {props.children}
            </div>
            <div className="button1">
                &nbsp;
            </div>
            <div className="button2">
                <button onClick={props.onSave}>{props.btnOk}</button>
            </div>
            <div className="button3">
                <button onClick={props.onClose}>{props.btnCancel}</button>
            </div>
        </div>
    </Modal>
);

export default DialogPage