import React, {
	Component,
	PropTypes,
} from 'react';

import {Editor, EditorState, RichUtils, ContentState} from 'draft-js';
import {getDefaultKeyBinding, KeyBindingUtil} from 'draft-js';
const {hasCommandModifier} = KeyBindingUtil;
import Immutable from 'immutable';
import DBActions from "../db/DBActions";

const blockRenderMap = Immutable.Map({
	'unstyled': {
		element: 'p',
	}
});

class DDEditor extends Component {

	constructor(props) {
		super(props);
		this.state = {editorState: EditorState.createEmpty()};
		this.focus = () => this.refs.editor.focus();
		this.logState = () => console.log(this.state.editorState.toJS());
		this.onChange = (editorState) => this.setState({editorState});
		this.handleKeyCommand = this.handleKeyCommand.bind(this);
	}

	componentDidMount() {
		DBActions.on("restore", entry=> {
			if (entry) {
				console.log('restoring entry', entry);
				this.setState({
					editorState: EditorState.moveSelectionToEnd(EditorState.createWithContent(ContentState.createFromText(entry.text))),
				});
				this.focus();
			}
		});
		DBActions.restoreTodaysEntry();
		this.focus();
	}


	customBindings(e) {
		if (e.keyCode === 83 /* `S` key */ && hasCommandModifier(e)) {
			return 'save';
		}
		if (e.keyCode === 68 /* `D` key */ && hasCommandModifier(e)) {
			return 'log';
		}
		return getDefaultKeyBinding(e);
	}

	handleKeyCommand(command) {
		console.log('command', command);
		if (command === 'log') {
			this.logState();
			console.log(this.state.editorState.getCurrentContent().getPlainText());
			return 'handled';
		} else if (command === 'save') {
			DBActions.save(this.state.editorState);
			return 'handled';
		}
		return 'not-handled';
	}

	render() {
		const style = {
			lineHeight: "1.5", // The standard line height of 1.5 is considered ideal for setting body text
			// borderLeftStyle: "solid",
			// borderLeftWidth: "1px",
			// borderLeftColor: "#eeeeee",
			paddingLeft: "0.5em",
		};
		return (
			<div style={style}>
				<Editor
					editorState={this.state.editorState}
					handleKeyCommand={this.handleKeyCommand}
					onChange={this.onChange}
					keyBindingFn={this.customBindings}
					blockRenderMap={blockRenderMap}
					ref="editor"
				/>
			</div>
		);
	}
}

DDEditor.propTypes = {};
DDEditor.defaultProps = {};

export default DDEditor;
