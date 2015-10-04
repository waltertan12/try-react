var NoteEditor = React.createClass({
  onChange: function (event) {
    this.props.onChange(this.props.note, event.target.value);
  },
  render: function () {
    var note = this.props.note;
    var content;
    if (typeof note === "undefined") {
      content = ""
    } else {
      content = note.content;
    }
    return (
      <div>
      <textarea className="form-control"
                rows={5} cols={40}
                value={content}
                onChange={this.onChange} />
      <br/>
      <button onClick={this.props.onDelete}
              className="btn btn-danger">Delete Note
      </button>&nbsp;
      <button 
            className="btn btn-success" 
            onClick={this.props.submitNote.bind(this.props.notepad)}>
                  Save Note
          </button>
      </div>
    );
  }
});

var Notepad = React.createClass({
  getInitialState: function() {
    return {notes: []};
  },
  componentDidMount: function() {
    this.loadNotesFromServer();
  },
  loadNotesFromServer: function () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        console.log("DATA");
        console.log(data);
        this.setState({notes: data});
        onChange();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  onAddNote: function () {
    var note = {content: ""};
    var allNotes = this.state.notes.concat(note);
    this.setState({notes: allNotes});
    this.selected = note;

    onChange();
  },
  submitNote: function () {
    console.log("this.selected");
    console.log(this.selected);

    if (typeof this.selected.id === "undefined") {
      httpRequest = "POST";
    } else {
      httpRequest = "PUT";
    }

    $.ajax({
      url: this.props.url,
      dataType: "json",
      cache: false,
      type: httpRequest,
      data: this.selected,
      success: function(data) {
        var last = data.length - 1;
        this.selected = data[last];
        this.loadNotesFromServer();
        onChange();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  selected: null,
  onSelectNote: function (note) {
    this.selected = note;
    onChange();
  },
  onDelete: function () {
    if (typeof this.selected.id === "undefined") {
      this.selected = null;
      this.loadNotesFromServer();
      onChange();
    } else {
      $.ajax({
        url: this.props.url,
        type: "DELETE",
        dataType: "json",
        data: this.selected,
        success: function(data) {
          console.log("Delete success?");
          console.log(data);

          this.selected = null;
          this.loadNotesFromServer();
          onChange();
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    }
  },
  render: function () {
    var notes = this.state.notes;

    var editor = null;

    if (this.selected !== null) {
      editor = <NoteEditor url={this.props.url} 
                           note={this.selected}
                           submitNote={this.submitNote}
                           notepad={this} 
                           onDelete={this.onDelete}
                           onChange={this.props.onChangeNote} />;
    }

    return (
      <div id="notepad">
        <NotesList onSelectNote={this.onSelectNote}
                   notes={notes}/>
        <br/>
        <div>
          <button 
            className="btn btn-primary" 
            onClick={this.onAddNote}>
                  Add Note
          </button>
        </div>
        <br/>
        {editor}
      </div>
    );
  }
});

var NoteSummary = React.createClass({
  render: function () {
    var note = this.props.note;
    var title = note.content;
    var saved = (typeof note.id === "undefined") ? " (Unsaved)" : ""

    if (title.indexOf('\n') > 0) {
      title = note.content.substring(0, note.content.indexOf('\n'));
    }
    if (!title) {
      title = 'Untitled';
    }

    title += saved;

    return (
      <div className="note-summary">
        {title}
      </div>
    );
  }
});

var NotesList = React.createClass({
  render: function() {
    var notes = this.props.notes;

    return (
      <div className="note-list">
        {
          notes.map(function (note) {
            return (
              <a href="javascript:void(0)"
                 onClick={this.props.onSelectNote.bind(null, note)}>
              <NoteSummary url="/notes" key={note.id} note={note}/>
              </a>
            );
          }.bind(this))
        }
      </div>
    );
  }
});

var onChange = function () {
  console.log("ON CHANGE");
  React.render(
    <Notepad url="/notes" 
             onChangeNote={onChangeNote}/>,
    document.getElementById("content")
  );
};

var onChangeNote = function (note, value) {
  note.content = value;
  this.selected = note;

  onChange();
};

onChange();