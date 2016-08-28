interface Note {
    id: string;
    title: string,
    body: string,
}

export class NoteClass implements Note {
    public id:string;

    constructor(public title:string = '',
                public body:string = '') {
        this.id = Math.random().toString(36).substring(2);
    }
}

export default Note;
