import React from 'react';
import CSSModules from 'react-css-modules';
import ProfilePicUploadComponentStyle from './assets/ProfilePicUploadComponent.scss';
import Dropzone from 'react-dropzone';


class ProfilePicUploadComponent extends React.Component {

	constructor (props) {

		super(props);
		this.onDrop = this.onDrop.bind(this);
		this.onOpenClick = this.onOpenClick.bind(this);
		this.state = {

			files : []

		}
		
	} 

    onDrop  (acceptedFiles) {
      this.setState({
        files: acceptedFiles
      });
    }

    onOpenClick () {
      this.dropzone.open();
    }
    onClickUploadFile () {
    	if (this.state.files.length > 0) {

    		this.props.accountManagementActions.updateProfilePic(this.state.files[0]);
    		this.setState({
    			files : []
    		});
    	}
    	
    }
	
	

	render () {

		return (
			<div>
	            <Dropzone multiple = {false} ref={(node) => { this.dropzone = node; }} onDrop={this.onDrop}>
                    <div>Try dropping some files here, or click to select files to upload.</div>
                </Dropzone>
                <button type="button" onClick={this.onOpenClick}>
                    Open Dropzone
                </button>
                {this.state.files.length > 0 ? <div>
                <h2>Uploading {this.state.files.length} files...</h2>
                <div>{this.state.files.map((file, index) => <img key = {index} src={file.preview} /> )}</div>
                <input type = 'button' className = 'btn btn-success' value = 'Upload' 
                onClick = {() => this.onClickUploadFile()}/> 
                </div> : null}
                
          	</div>
			);
	}
}

export default CSSModules(ProfilePicUploadComponent, ProfilePicUploadComponentStyle);
