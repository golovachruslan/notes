import {Component} from 'react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {observable, computed} from 'mobx';
import {observer} from 'mobx-react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import DevTools from 'mobx-react-devtools';

import {ContactList} from './components/ContactList/index';
import {ContactDetails} from './components/ContactDetails/index';
import {EditContact} from './components/EditContact/index';
import {SearchBox} from './components/SearchBox/index';
import {Empty} from './components/Empty/index';
import Note from './interfaces/Note';
import {NoteClass} from "./interfaces/Note";

export class AppState {
    @observable private _selectedContactId: string = null;
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
    get selectedContactId(): string {
        return this._selectedContactId;
    }

    setSelectedContactId(id: string) {
        this._selectedContactId = id;
    }
}

export const appState =  new AppState();


@observer
class App extends Component<{children: any, params: any}, {}> {
    render() {
        return (
            <div className="container">
                <header className="main-header"></header>
                <main>
                    <aside>
                        <SearchBox appState={appState} params={this.props.params} />
                        <ContactList appState={appState} />
                    </aside>
                    {this.props.children}
                </main>
                <footer className="main-footer"></footer>
                <DevTools />
            </div>
        );
    }
}

@observer
class AppWrapper extends Component<{params: any, children: any}, {}> {
    render() {
        return <App params={this.props.params} children={this.props.children}/>
    }
}

@observer
class ContactDetailsWrapper extends Component<{params: {contactId: string}}, {}> {

    componentWillMount() {
        if (this.props.params.contactId && ['new', 'search'].indexOf(this.props.params.contactId) === -1) {
            appState.setSelectedContactId(this.props.params.contactId);
        }
    }

    render() {
        return <ContactDetails note={appState.selectedNote}/>
    }
}

@observer
class EditContactWrapper extends Component<{params: {contactId: string}}, {}> {
    componentWillMount() {
        if (this.props.params.contactId) {
            appState.setSelectedContactId(this.props.params.contactId);
        }
    }
    render() {
        return <EditContact contact={appState.selectedNote} />
    }
}

@observer
class NewContactWrapper extends Component<{params}, {}> {
    render() {
        const contact = new NoteClass();
        return <EditContact contact={contact} isNew={true} />
    }
}

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path='/' component={AppWrapper}>
            <IndexRoute component={Empty} />
            <Route path='search/:query' component={ContactDetailsWrapper} />
            <Route path='new' component={NewContactWrapper} />
            <Route path=':contactId' component={ContactDetailsWrapper} />
            <Route path=':contactId/edit' component={EditContactWrapper} />
        </Route>
    </Router>,
    document.getElementById('root'));
