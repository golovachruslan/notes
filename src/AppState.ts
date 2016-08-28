import {observable, computed} from 'mobx';
import {observer} from 'mobx-react';
import Note from './interfaces/Note';
import {NoteClass} from "./interfaces/Note";

export class AppState {

    @observable private _selectedNoteId: string = null;
    @observable notes: Array<Note> = [];
    @observable searchQuery: string = '';

    constructor() {
        this.notes = [
            new NoteClass('ddddd', 'ggggg'),
            new NoteClass('ddddd1', 'ggggg1'),
        ];
    }

    @computed
    get filteredNotes() {
        return this.notes;
    }

    @computed
    get selectedNote():Note {
        return this.filteredNotes[1];
    }

    @computed
    get selectedNoteId(): string {
        return this._selectedNoteId;
    }

    setSelectedNoteId(id: string) {
        this._selectedNoteId = id;
    }

}
