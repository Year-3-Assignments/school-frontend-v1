import React, { Component } from 'react';
import AvatarEditor from 'react-avatar-editor';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import { resizeImage } from '../utils/resizeImage';
import firebase from '../firebase.config';
import Loader from '../components/loader';

export default class ImagePreviewer extends Component {
  constructor(props) {
    super(props);
    this.changeRotation = this.changeRotation.bind(this);
    this.changeZoomLevel = this.changeZoomLevel.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.setEditor = this.setEditor.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.setUploadPercentage = this.setUploadPercentage.bind(this);
    this.state = {
      imageSrc: '',
      imageName: '',
      zoom: 1.2,
      rotate: 0,
      editor: '',
      isLoading: false,
      uploadPercentage: 0,
    };
  }

  setEditor = (editor) => {
    if (editor) {
      this.setState({ editor: editor });
    }
  };

  changeZoomLevel = (level) => {
    if (level) {
      this.setState({ zoom: level });
    }
  };

  changeRotation = () => {
    let rotation = parseInt(this.state.rotate) + 90;

    if (rotation >= 360) {
      rotation = 0;
    }
    this.setState({ rotate: rotation });
  };

  handleImageChange = (e) => {
    this.setState({ imageSrc: e.target.files[0] });
  };

  uploadImage = async (e) => {
    e.preventDefault();
    let image = '';
    const imageName =
      this.state.editor &&
      this.state.editor.props &&
      this.state.editor.props.image &&
      this.state.editor.props.image.lastModified;
    image = this.state.editor.getImage();
    image = resizeImage(image, 1000, 1000);
    const imageData = await (await fetch(image)).blob();
    this.setState({ isLoading: true });

    if (imageData) {
      let file = imageData;
      let upload = firebase
        .storage()
        .ref('/Profile-Images')
        .child(`${imageName}.jpeg`)
        .put(file);

      console.log('upload', upload);

      upload.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          this.setUploadPercentage(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          upload.snapshot.ref.getDownloadURL().then((url) => {
            console.log(url);
            this.props.getEditedImage(url);
            this.setState({ isLoading: false });
          });
        }
      );
    }
  };

  setUploadPercentage = (progress) => {
    this.setState({ uploadPercentage: progress });
  };

  render() {
    const { isLoading } = this.state;
    return (
      <div>
        <div className="justify-content-md-center text-center mb-3 mx-5 image-preview">
          <input
            type="file"
            id="fname"
            className="text-center"
            accept="image/*"
            name="imageSrc"
            onChange={(e) => this.handleImageChange(e)}
          />
        </div>
        <div className="form-group row g-0 justify-content-md-center text-center mx-4">
          <div className="col-xs-10 col-md-4">
            <div className="row">
              <div className="col-xs-12 col-sm-12 mb-0">
                <AvatarEditor
                  ref={this.setEditor}
                  image={this.state.imageSrc}
                  border={1}
                  width={200}
                  height={200}
                  borderRadius={0}
                  color={[0, 0, 0, 0.6]} // RGBA
                  scale={this.state.zoom}
                  rotate={this.state.rotate}
                />
              </div>
            </div>
            <div className="row g-0 justify-content-md-center text-center">
              <div className="col-md-10">
                <div className="slider">
                  <div className="slider-group">
                    <div className="slider-vertical">
                      <Slider
                        min={1}
                        max={5}
                        step={0.1}
                        tooltip={false}
                        value={this.state.zoom}
                        onChange={this.changeZoomLevel}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center">
            {isLoading ? (
              <Loader size={30} />
            ) : (
              <div>
                <button
                  type="button"
                  className="btn btn-secondary btn-rounded  btn-sm"
                  onClick={this.changeRotation}
                >
                  <i className="fas fa-undo"></i>
                </button>
                &nbsp;&nbsp;
                <button
                  className="btn btn-primary btn-rounded btn-sm"
                  onClick={this.uploadImage}
                >
                  <i class="fas fa-cloud-upload-alt"></i>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
