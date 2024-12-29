import React, { Component } from "react";
import Header from "./Header.js";
import NotesList from "./NotesList.js";

class App extends Component {
  state = {
    notes: [
      {
        id: Date.now(),
        title: "",
        description: "",
        doesMatchSearch: true,
      },
    ],
    searchText: "",
  };

  addNote = () => {
    const newNote = {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true,
    };

    const newNotes = [newNote, ...this.state.notes];

    this.setState({ notes: newNotes });

    //  OR
    //  this.setState({notes:[newNote, ...this.state.notes]})
  };

  removeNote = (clickedNoteId) => {
    const filterCallBack = (note) => note.id !== clickedNoteId;
    const updatedNotes = this.state.notes.filter(filterCallBack);
    this.setState({ notes: updatedNotes });
  };

  onType = (editMeId, updatedKey, updatedValue) => {
    // editMeId==id of note that is edited
    // updatedKey==title or description field
    // updatedValue==value of title or description

    const updatedNotes = this.state.notes.map((note) => {
      if (note.id !== editMeId) {
        return note;
      } else {
        if (updatedKey === "title") {
          note.title = updatedValue;
          return note;
        } else {
          note.description = updatedValue;
          return note;
        }
      }
    });

    this.setState({ notes: updatedNotes });
  };

  onSearch = (text) => {
    const textLowerCase = text.toLowerCase();
    const updatedNotes = this.state.notes.map((note) => {
      if (!textLowerCase) {
        note.doesMatchSearch = true;
        return note;
      } else {
        const title = note.title.toLowerCase();
        const description = note.description.toLowerCase();

        const titleMatch = title.includes(textLowerCase);
        const descriptionMatch = description.includes(textLowerCase);

        const searchMatch = titleMatch || descriptionMatch;
        note.doesMatchSearch = searchMatch;
        return note;
      }
    });

    this.setState({ notes: updatedNotes, searchText: textLowerCase });
  };

  componentDidUpdate() {
    const savedNotesString = JSON.stringify(this.state.notes);
    localStorage.setItem("savedNotes", savedNotesString);
  }

  componentDidMount() {
    const savedNoteString = localStorage.getItem("savedNotes");
    if (savedNoteString) {
      const savedNotes = JSON.parse(savedNoteString);
      this.setState({ notes: savedNotes });
    }
  }

  render() {
    return (
      <div>
        <Header
          onSearch={this.onSearch}
          searchText={this.state.searchText}
          addNote={this.addNote}
        />
        <NotesList
          removeNote={this.removeNote}
          onType={this.onType}
          notes={this.state.notes}
        />
      </div>
    );
  }
}

export default App;
