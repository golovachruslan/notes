import {Component} from 'react';
import * as React from 'react';
import {observer} from 'mobx-react';
import {browserHistory} from 'react-router';

import Note from "../interfaces/Note";

declare const require;
const classnames = require('classnames');

@observer
export class NoteListItem extends Component<{note: Note; isSelected: boolean; key: string;}, {}> {

    constructor (props) {
        super(props);
        this.onSelect = this.onSelect.bind(this);
    }

    onSelect() {
        alert(this.props.note.id);
    }

    render() {
        const note = this.props.note;
        return (<li onClick={this.onSelect}>{note.title}</li>);
    }
}
