import React from 'react';
import imageCompression from 'browser-image-compression';
import html2canvas from 'html2canvas';


class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'album-1.png',
      textColor: 'black',
      fontWeight: 'initial',
      toggleItalic: 'normal',
      fontFamily: 'Times',
      toggleBold: 'initial'
    };
  }



  cyclefontFamily(){
    const fontFamily = [
      "Impact",
      "Arial",
      "Courier New",
      "Veranda",
      "sans-serif"
    ]
    var currentFont = this.state.fontFamily;
    var max = fontFamily.length - 1;
    var index = fontFamily.indexOf(currentFont);
    var nextFont = "none"
    if (max == index) {
      nextFont = fontFamily[0]
    } else {
      nextFont = fontFamily[index + 1]
    }
    console.log(nextFont);
    this.setState({
      fontFamily: nextFont
    })
  }

  toggleBold(){
    var state = ""
    if (this.state.toggleBold == 'initial'){
      state = 'bold'
    } else {
      state = "initial"
    }
    this.setState({
      toggleBold: state
    })
  }

  toggleItalic(){
    var state = ""
    var key = this.state.toggleItalic

    if (key == 'normal'){
      state = 'italic'
    } else {
      state =  "normal"
    }
    this.setState({
      toggleItalic: state
    })
  }

  handleSelect(e){
    this.setState({
      display: e.target.name
    })
  }

  handleDownload(){
    html2canvas(document.querySelector("#capture"), {
       useCORS: true,
       width: 750,
       height: 750,
       backgroundColor: null,
       scrollX: 0,
       scrollY: -window.scrollY,
       scale: 1
     })
       .then(canvas => {
         const imgData = canvas.toDataURL('image/png');
         console.log(canvas);
         console.log(imgData); //Maybe blank, maybe full image, maybe half of image
         //console.log(canvas.url);
         var link = document.createElement('a');
         link.href = imgData;
         link.id = 'capture';
         link.download = 'download.png';
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);
       });
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
    const styles = {
      editor: {
        boxSizing: 'border-box',
        border: '1px solid #ddd',
        cursor: 'text',
        padding: '16px',
        borderRadius: '2px',
        marginBottom: '2em',
        boxShadow: 'inset 0px 1px 8px -3px #ABABAB',
        background: '#fefefe',
        height: '100px',
      }
    };
    var quote = this.props.quote;
    var selectedImage = this.state.display;
    var textColor = this.state.textColor;
    var fontFamily = this.state.fontFamily;
    var toggleBold = this.state.toggleBold;
    var toggleItalic = this.state.toggleItalic;
    var colorPicker = [
      "red",
      "black",
      "green",
      "white",
      "orange",
      "purple"
    ]

    return(
    <React.Fragment>
    <div id="capture"
      style={{
      position: 'relative',
      textAlign: 'center',
    }}>
      <img width="500" height="500" src={src + selectedImage} />
      <textarea defaultValue={quote} rows="5" cols="20" placeholder="Text Here" style={{
        fontSize: 40,
        fontFamily: fontFamily,
        resize: 'none',
        fontWeight: toggleBold,
        color: textColor,
        fontStyle: toggleItalic,
        margin: '0 auto',
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        overflow: 'hidden'
      }}></textarea>
    <React.Fragment>

        <div>
        <div
        style={{
          width: "50px",
          height: "50px",
          margin: "25px",
          padding: "15px",
          borderRadius: "25%",
          border: "1px solid black",
          backgroundColor: "#d4d0d0",
          display: "inline-block"
        }}>
          <p onClick={(e) => (this.cyclefontFamily())}style={{fontSize: "40px", margin: "0 auto"}}>T</p>
        </div>

        <div
        style={{
          width: "50px",
          height: "50px",
          margin: "25px",
          padding: "15px",
          borderRadius: "25%",
          border: "1px solid black",
          backgroundColor: "#d4d0d0",
          display: "inline-block"
        }}>
          <strong><p onClick={(e) => (this.toggleBold())} style={{fontSize: "40px", margin: "0 auto"}}>B</p></strong>
        </div>

        <div
        style={{
          width: "50px",
          height: "50px",
          margin: "25px",
          padding: "15px",
          borderRadius: "25%",
          border: "1px solid black",
          backgroundColor: "#d4d0d0",
          display: "inline-block"
        }}>
          <em><p onClick={(e) => {this.toggleItalic()}}style={{fontSize: "40px", margin: "0 auto"}}>I</p></em>
        </div>
        </div>

          <div style={{
            padding: 15,
            margin: "0 auto",
          }}>
          {
            colorPicker.map((color, i) => (
              <div
              key={i}
              onClick={(e) => (
console.log(e),
console.log(color),
                this.setState({

                textColor: color
              }))}
              style={{
                width: "50px",
                height: "50px",
                margin: "10px",
                padding: "25px",
                borderRadius: "25%",
                border: "1px solid black",
                backgroundColor: colorPicker[i],
                display: "inline-block"
              }}>
              </div>
              ))
            }
          </div>



    </React.Fragment>

    </div>

    <input name="Download" type="image" src="kanye/download.png" onClick={(e) => this.handleDownload()} />
    <div data-html2canvas-ignore style={{padding: '20px'}}>
      {
        image_array.map((image, i) => (
          <img width="150" height="150" name={image} onClick={(e) => this.handleSelect(e)} key={i} src={src + image} />
        ))
      }
    </div>
    </React.Fragment>
    )
  }
}

export default ImageGallery;
