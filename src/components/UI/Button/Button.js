import React from 'react';


class Button extends React.Component {

  constructor(props) {
    super(props);
    this.state = {      
      btnClass : this.props.btnClass,
      arrowTailClass : 'arrow-tail',
      arrowHeadClass : 'arrow-head'
    }

    this.onHover = this.onHover.bind(this);
    this.onHoverOut = this.onHoverOut.bind(this);
  }

  onHover() {
    this.setState({      
      btnClass : this.props.btnClass + 'hover',
      arrowTailClass : 'arrow-tail hover',
      arrowHeadClass : 'arrow-head hover'
    });
  }

  onHoverOut() {
    this.setState({      
      btnClass : this.props.btnClass,
      arrowTailClass : 'arrow-tail',
      arrowHeadClass : 'arrow-head'
    });
  }
  
  render() {
      return (
        <div className="row">
                <div className="col-md-12 text-center">
                  <div className="arrow-button" onMouseOver={this.onHover} onMouseOut ={this.onHoverOut}>
                    <span className={this.state.arrowTailClass}></span>
                    <button 
                      type={this.props.btnType}
                      onClick={this.props.clicked} 
                      name={this.props.btnName} 
                      className={this.state.btnClass}>
                      {this.props.btnLabel}
                      </button>
                    <span className={this.state.arrowHeadClass}></span>
                  </div>
                </div>
              </div>
      );
  }
	
}

export default Button;