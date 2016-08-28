import {Component} from 'react';
import * as React from 'react';
import {observer} from 'mobx-react';
import {browserHistory} from 'react-router';

import {AppState} from '../../index';
import Note from "../../interfaces/Note";

declare const require;
const classnames = require('classnames');

@observer
export class ContactListItem extends Component<{appState: AppState, note: Note; isSelected: boolean; key: string;}, {}> {
    selectContact() {
        browserHistory.push('/' + this.props.note.id);
        this.props.appState.setSelectedContactId(this.props.note.id);
    }

    render() {
        const note = this.props.note;
        return (<li>{note.title}</li>);
    }
}
