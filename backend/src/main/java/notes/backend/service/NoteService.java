package notes.backend.service;

import notes.backend.model.Note;

import java.util.List;

public interface NoteService {

    List<Note> getNotes();

    Note getNote(int id);

    Note saveNote(Note note);

    Note updateNote(Note note);

    void deleteNote(int id);

    List<Note> findByActive(boolean active);

    List<Note> finByTags(List<Integer> tags);
}
