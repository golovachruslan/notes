import {Component} from 'react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {observable, computed} from 'mobx';
import {observer} from 'mobx-react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import DevTools from 'mobx-react-devtools';

import {ContactList} from './components/NotesList';
import {EditContact} from './components/EditNote';
import {SearchBox} from './components/SearchBox';
import {Empty} from './components/Empty';
import Note from './interfaces/Note';
import {NoteClass} from "./interfaces/Note";
import {AppState} from "./AppState";

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
class EditContactWrapper extends Component<{params: {noteId: string}}, {}> {
    componentWillMount() {
        if (this.props.params.noteId) {
            appState.setSelectedNoteId(this.props.params.noteId);
        }
    }
    render() {
        return <EditContact note={appState.selectedNote} />
    }
}

@observer
class NewContactWrapper extends Component<{params}, {}> {
    render() {
        const note = new NoteClass();
        return <EditContact note={note} isNew={true} />
    }
}

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path='/' component={AppWrapper}>
            <IndexRoute component={Empty} />
            <Route path='new' component={NewContactWrapper} />
            <Route path=':noteId/edit' component={EditContactWrapper} />
        </Route>
    </Router>,
    document.getElementById('root'));
