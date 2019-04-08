import React from 'react';
import ReactDOM from 'react-dom';

const viewPortHeight = window.innerHeight;
const viewPortWidth = window.innerWidth;

export default class BookExpanded extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            show:true,
            style:{
                top:this.props.top,
                left:this.props.left,
                width:300,
                height:200
            }
        }
        this.mountStyle = this.mountStyle.bind(this);
        this.expandStyle = this.expandStyle.bind(this);
        this.unMountStyle = this.unMountStyle.bind(this);
        this.retractStyle = this.retractStyle.bind(this);
    }

    componentDidMount(){
        setTimeout(this.mountStyle, 0) // call the into animation
    }

    componentWillReceiveProps(newProps) { // check for the mounted props
        if(!newProps.mounted){

            this.retractStyle() // call outro animation when mounted prop is false
        }
    }

    mountStyle() {
        console.log("mounting");
        this.setState({
            style: {
                top: 0,
                left: this.props.leftMost,
                width:300,
                height:200,
                transition: 'all 1s ease',
            }
        });
        setTimeout(this.expandStyle,1000);
    }
    expandStyle(){
        this.setState({
            style: {
                top: 0,
                left: this.props.leftMost,
                width:'55.5%',
                height:400,
                transition: 'all 1s ease',
            }
        });
    }

    unMountStyle() {
        console.log("mounting");
        this.setState({
            style: {
                top: this.props.top,
                left: this.props.left,
                width:300,
                height:200,
                transition: 'all 1s ease',
            }
        });
    }
    retractStyle(){
        console.log("unounting");
        this.setState({
            style: {
                top: 0,
                left: this.props.leftMost,
                width:300,
                height:200,
                transition: 'all 1s ease',
            }
        });
        setTimeout(this.unMountStyle,1000);
    }



    render(){
        return(
            <div
                style={{...bookStyleExpanded,...this.state.style}}
                >
                <div className="imageContainer" style={imageContainer}>
                    <img src={this.props.imageUrl} alt= "" style={coverStyle} />
                </div>
                <div className="rightContainer" style={rightContainer}>
                    <p>{this.props.title}</p>
                    <p>Rating {this.props.rating}</p>
                    <p>bb status</p>
                </div>
                <div className="bottomContainer" style={bottomContainer}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a ullamcorper lectus, et vulputate massa. Aliquam turpis quam, ultrices non pharetra elementum, faucibus pretium nisl. Fusce in finibus sapien. Suspendisse diam mi, euismod at iaculis non, viverra sed tortor. Fusce lobortis malesuada metus sit amet lobortis. Pellentesque rhoncus urna sit amet odio malesuada sodales. Proin at ipsum et lorem mollis malesuada. Aenean tempor molestie elementum.
                    </p>
                </div>
            </div>
        );
    }

}


const bookStyleExpanded = {
    width:200,
    height:100,
    margin: '1%',
    position:'fixed',
    overflow:'hidden',
    display:'flex',
    flexWrap:'wrap',
    backgroundColor:'rgb(72, 79, 94)',
    borderColor: 'rgb(97, 218, 251)',
    borderWidth: 4,
    borderRadius: 20,
    borderStyle:'solid'
}

const imageContainer = {
    flex:1,
    display:'flex'
}
const coverStyle = {
    maxWidth: '80%',
    margin: 'auto',
}

const rightContainer = {
    flex:1
}
const bottomContainer = {
    width:'100%',
}
