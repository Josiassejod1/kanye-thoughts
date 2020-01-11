import React from 'react';
import * as CopyToClipboard from "react-copy-to-clipboard"

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headShot: this.randomImage(),
      copySuccess: false
    };
  }


  handleCopy(e){
    this.setState({
      copySuccess: true
    })
  }

  handleRefresh(e){
    this.componentDidMount()
  }

  randomImage(){
    const image = [
      'head-one.png',
      'head-two.png',
      'head-three.png'
    ]
    const max = image.length;
    const rand = Math.floor(Math.random() * Math.floor(max));
    return image[rand];
  }


  render() {
    const quote = this.props.quote;
    var headShot = "kanye/" + this.state.headShot;
    var success = <h4>Quote Copied to ClipBoard <span>📎</span></h4>
    console.log(quote);
    if (this.state.copySuccess) {
      setTimeout(() => this.setState({copySuccess: false}), 8000);
    } else {
      success = <p></p>
    }
    return(
      <div>
          <h1>The Mysterious Thoughts of Kanye <span role="img">💬</span></h1>
        <div>
          <img width="100" height="100" alt="kanye-head" src={headShot} />
          <div>
            <h2> {quote} - Kanye West</h2>
            <CopyToClipboard text={quote}>
              <input type="image" src="kanye/copy.png" onClick={(e) => this.handleCopy(e)} />
            </CopyToClipboard>
              <input type="image" src="kanye/refresh.png" onClick={(e) => window.location.reload(true)} />
          </div>
          <div className="p-3 mb-2 bg-success text-white">{success}</div>
        </div>
      </div>
    )
  }
}



export default Header;
