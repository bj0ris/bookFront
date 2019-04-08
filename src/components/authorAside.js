import React from 'react';


const viewPortWidth = window.innerWidth;

export default class AuthorAside extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            show:true,
            style:{
                left:-viewPortWidth/4
            }
        }
        this.mountStyle = this.mountStyle.bind(this);
        this.unMountStyle = this.unMountStyle.bind(this)
        this.transitionEnd = this.transitionEnd.bind(this)
    }
    componentDidMount(){
        setTimeout(this.mountStyle, 10) // call the into animation
    }

    componentWillReceiveProps(newProps) { // check for the mounted props
        if(!newProps.mounted){
            this.unMountStyle() // call outro animation when mounted prop is false
        }
    }
    mountStyle() {
        this.setState({
            style: {
                left: 0,
                transition: 'left 0.3s ease',
            }
        });
    }
    unMountStyle(){
        console.log("unmounting Aside");
        this.setState({
            style: {
                left: -viewPortWidth/4,
                transition: 'left 0.3s ease',
            }
        })
    }

    transitionEnd(){
        console.log("transitionEnd");
        if(!this.props.mounted){ // remove the node on transition end when the mounted prop is false
            this.setState({
                show: false
            })
        }
    }


    render(){
        //if pc...
        return (
            <div
                style={{...this.state.style,...outerStyle}}
                className="authorAside"
                >
                <div className="backArrow" onClick={this.props.cancelAuthor}>
                    <p>Arrow</p>
                </div>
                <div className="imageContainer">
                    <img src={this.props.authorJson.imageUrl} alt=""/>
                </div>
                <div className="textContainer">
                    <p>Hometown</p>
                    <p>Born At</p>
                    <p>Death</p>
                </div>
            </div>
        );
    }
}


const outerStyle = {
    position: 'fixed',
    height: '100vh',
    borderRight: '4px solid #61dafb',
    backgroundColor: '#484f5e',
    width:'25%'
}
