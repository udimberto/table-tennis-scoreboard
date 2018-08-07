/* Packages */
import React  from  'react';

/* Component */
class DetectSize extends React.Component {
    constructor() {
        super();

        this.state = {
            winWidth : window.innerWidth,
            winHeight: window.innerHeight,
        };
    }

    componentWillMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    handleWindowSizeChange = () => {
        this.setState({
            winWidth : window.innerWidth,
            winHeight: window.innerHeight,
        });
    };

    render() {
        const winWidth = this.state.winWidth;
        const minWidth = this.props.lt;
        const maxWidth = this.props.gt;

        if ((winWidth >= maxWidth) ||
            (winWidth <= minWidth)) {
            return(this.props.component);
        }

        return ('');
    }
}

/* Default Props */
DetectSize.defaultProps = {
    lt       : null,
    gt       : null,
    component: null,
};

/* Export Component */
export default DetectSize;
