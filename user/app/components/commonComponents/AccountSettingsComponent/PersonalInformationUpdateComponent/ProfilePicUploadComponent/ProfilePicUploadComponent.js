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
                <div styleName = 'form'>

    	            <Dropzone multiple = {false} ref={(node) => { this.dropzone = node; }} onDrop={this.onDrop}>
                        <label styleName = 'labels-input'>
                            <div>Try dropping some files here, or click to select files to upload.</div>
                        </label>
                    </Dropzone>
                    {this.state.files.length > 0 ? <div>
                    <label styleName = 'labels-input'>
                            <div>Preview of file.</div>
                    </label>
                    <div styleName = 'gap'>{this.state.files.map((file, index) => <img styleName = 'profile-pic-preview' key = {index} src={file.preview} /> )}</div>
                    <input type = 'button'
                    onClick = {()=> this.onClickUploadFile()}
                    styleName = 'button button-block' value = 'Upload' />
                    </div> : null}
                </div>
                
          	</div>
			);
	}
}

export default CSSModules(ProfilePicUploadComponent, ProfilePicUploadComponentStyle, {allowMultiple:true});
