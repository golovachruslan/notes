import {Component} from 'react';
import * as React from 'react';
import {observer} from 'mobx-react';
import {computed} from 'mobx';

import Note from '../interfaces/Note';

import {AppState} from '../AppState';
import {NoteListItem} from './NoteListItem';

class Divider {
  public isDivider: boolean = true;
  public id: string;
  constructor (public charchtar: string) {
    this.id = Math.random().toString(36);
  }
}

@observer
export class ContactList extends Component<{appState: AppState}, {}> {

  get notes(): Array<Note> {
    return this.props.appState.filteredNotes;
  }

  render() {
    return (
      <div className="list">
        <ul>
          {this.notes.map(item => {

            const note = item as Note;
            return <NoteListItem
                      key={note.id.toString()}
                      note={note}
                      isSelected={this.props.appState.selectedNote === note} />
          })}
        </ul>
      </div>
    );
  }
}
