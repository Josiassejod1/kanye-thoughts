import React from 'react';
import Header from './Header';
import ImageGallery from './ImageGallery';

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: '',
    };
  }

  componentDidMount() {
    fetch("https://api.kanye.rest")
      .then(result => result.json())
      .then(result => {
          this.setState({
            quote: result,
          })
      }).catch(error => console.log(error))
  }

  render() {
    var quote = this.state.quote['quote']
    return(
    <React.Fragment>
      <Header quote={quote}/>
      <ImageGallery quote={quote} />
    </React.Fragment>
    )
  }
}



export default Canvas;
