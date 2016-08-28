import * as React from 'react';
import {Component} from 'react';
import {observer} from 'mobx-react';
import {browserHistory} from 'react-router';

import {Empty} from '../Empty/index';
import Note from '../../interfaces/Note';
import {AppState, appState} from '../../index';

class TableRow extends Component<{label: string; value: string}, {}> {
  render() {
    if (!this.props.value) {
      return <tr></tr>;
    }
    return <tr>
             <td>{this.props.label}</td>
             <td>{this.props.value}</td>
           </tr>
  }
}

@observer
export class ContactDetails extends Component<{note: Note}, {}> {

  formatPhoneNumber(raw: string): string {
    return `(${raw.substr(0, 3)}) ${raw.substr(3,3)}-${raw.substr(6)}`;
  }

  edit() {
    browserHistory.push(this.props.note.id + '/edit');
  }

  navigateToNew() {
    appState.setSelectedContactId(null);

    browserHistory.push('/new');
  }

  render() {
    const note = this.props.note;

    if (!note) {
      return <Empty params={null} />
    }

    return (
      <div className="details">
        <header>
          <div className="title">
            <h1 className="name">{note.title}</h1>
          </div>
        </header>
        <div>
          {note.body}
        </div>
        <footer>
          <div className="left">
            <button onClick={this.navigateToNew.bind(this)}>+</button>
          </div>
          <div className="right">
            <button>Delete</button>
            <button onClick={this.edit.bind(this)}>Edit</button>
          </div>
        </footer>
      </div>
    )
  }
}
