import React from 'react';
import imageCompression from 'browser-image-compression';
import html2canvas from 'html2canvas';
import {Editor, EditorState} from 'draft-js';
import Toolbar from 'draft-js-buttons';
class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'album-1.png',
      editorState: EditorState.createEmpty()
    };
    this.setEditor = (editor) => {
      this.editor = editor;
    }
    this.onChange = (editorState) => this.setState({editorState});
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
    var text = this.state.editorState.getCurrentContent().getPlainText();
    return(
    <React.Fragment>
    <div id="capture"
      style={{
      position: 'relative',
      textAlign: 'center',
    }}>
      <img width="500" height="500" src={src + selectedImage} />
      <textarea defaultValue={quote} placeHolder="Text Here" style={{
        fontSize: 100,
        resize: 'none',
        margin: '0 auto',
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        overflow: 'hidden'
      }}></textarea>
    </div>

    <input name="Download" type="image" src="kanye/download.png" onClick={(e) => this.handleDownload()} />
    <div style={styles.editor}>
    <Editor
      ref={this.setEditor}
      editorState={this.state.editorState}
      onChange={this.onChange}
      />
    </div>
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
