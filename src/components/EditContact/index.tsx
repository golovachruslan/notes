import * as React from 'react';
import {Component} from 'react';
import {observer} from 'mobx-react';
import {browserHistory} from 'react-router';

import Note from '../../interfaces/Note';

import {AppState, appState} from '../../index';

@observer
export class EditContact extends Component<{contact: Note, isNew?: boolean}, {}> {

  constructor (props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  formatPhoneNumber(raw: string): string {
    return `(${raw.substr(0, 3)}) ${raw.substr(3,3)}-${raw.substr(6)}`;
  }

  quit() {
    if (this.props.isNew) {
      return browserHistory.push('/');
    }
    browserHistory.push('/' + this.props.contact.id);
  }

  save() {
    console.log(this);
    this.quit();
  }

  updateProperty (key, value) {
    this.props.contact[key] = value;
  }

  onChange (event) {
    debugger;
    this.updateProperty(event.target.name, event.target.value);
  }

  render() {
    const note = this.props.contact;

    if (!note) {
      return <div className="details"></div>
    }

    return (
      <div className="editing details">
        <header>
          <div>
            <input type="file" className="upload-picture" />
          </div>
          <div className="title">
            <h1 className="name">
              <input name="firstName" placeholder="First Name" type="text" value={note.title} onChange={this.onChange}/>
            </h1>
          </div>
        </header>
        <table>
          <textarea name="body" placeholder="body" type="text" value={note.body} onChange={this.onChange}/>
        </table>
        <footer>
          <div className="left">
          </div>
          <div className="right">
            <button onClick={this.quit.bind(this)}>Cancel</button>
            <button type="submit" onClick={this.save.bind(this)}>Save</button>
          </div>
        </footer>
      </div>
    )
  }
}
