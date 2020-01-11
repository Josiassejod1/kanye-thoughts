import React from 'react';
import imageCompression from 'browser-image-compression';


class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'album-1.png'
    };
  }

  handleSelect(e){
    this.setState({
      display: e.target.name
    })
  }
  render(){
    const image_array = [
      "album-1.png",
      "album-2.png",
      "album-3.png",
      "album-4.png",
      "album-5.png",
      "album-6.png",
      "album-7.png",
      "album-8.png",
    ]
    var src = "kanye/"
    var quote = this.props.quote;
    var selectedImage = this.state.display;
    return(
    <React.Fragment>
    <div style={{
      position: 'relative',
      textAlign: 'center'
    }}>
      <img src={src + selectedImage} />
      <h1 style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        overflow: 'hidden'
      }}>{quote}</h1>
    </div>
    <div style={{padding: '20px'}}>
      {
        image_array.map((image, i) => (
          <img width="150" name={image} onClick={(e) => this.handleSelect(e)}height="150" key={i} src={src + image} />
        ))
      }
    </div>
    </React.Fragment>
    )
  }
}

export default ImageGallery;
