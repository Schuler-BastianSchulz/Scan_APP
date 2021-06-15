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
        height: '300px',
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};
export interface IDialogMessageProps {
    isOpen: boolean,
    title: string,
    children?: ReactNode,
    onClose: any,
    btnOk: string,
    autoClose: number,
}

export const DialogMessagePage = (props: IDialogMessageProps) => {
    useEffect(()=>{
        if (props.autoClose == 0) return
        if (!props.isOpen) return
console.log('X1')
        const id = setTimeout(()=>{
            console.log('X2')
            props.onClose()
        }, props.autoClose)
        console.log('X3')

        return () => {
            console.log('X4')
            clearTimeout(id)
        }
    }, [props.isOpen, props.autoClose])

    return (
        <Modal
            style={customStyles}
            isOpen={props.isOpen}
            onRequestClose={props.onClose}>
            <div className="modalDialogAlert">
                <div className="title">
                    <h2>{props.title}</h2>
                </div>
                <div className="content">
                    {props.children}
                </div>
                <div className="button1">
                    <button onClick={props.onClose}>{props.btnOk}</button>
                </div>
            </div>
        </Modal>
    )
}

export default DialogMessagePage