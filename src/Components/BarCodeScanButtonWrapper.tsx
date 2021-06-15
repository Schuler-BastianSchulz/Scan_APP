import React, {Component} from 'react';
import config from '../Config';

interface IProps {
    onResult: (data: string, isCancelled: boolean, format: string, scanCallback?: ()=>void) => void
    onError?: (data: string) => void,
    onScreenMessage? : string,
    fakeResult?: string,
    isScanDisabled?: boolean,
}

interface IState {
    isOpen: boolean,
    text: string,
}

class BarCodeScanButtonWrapper extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            isOpen: false,
            text: "",
        }
    }

    scan = () => {
        return
    }


    render() {
        return (
            <span onClick={this.scan}>
                {this.props.children}
            </span>
        )
    }
}

export default BarCodeScanButtonWrapper
