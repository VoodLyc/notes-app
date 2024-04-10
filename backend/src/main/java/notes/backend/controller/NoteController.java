package notes.backend.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import notes.backend.model.Note;
import notes.backend.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notes")
@Tag(name = "Note")
public class NoteController {

    @Autowired
    private NoteService noteService;

    @GetMapping
    public ResponseEntity<List<Note>> getNotes() {
        return new ResponseEntity<List<Note>>(noteService.getNotes(), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<Note> getNote(@PathVariable int id) {
        return new ResponseEntity<Note>(noteService.getNote(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Note> saveNote(@Valid @RequestBody Note note) {
        return new ResponseEntity<Note>(noteService.saveNote(note), HttpStatus.CREATED);
    }

    @PutMapping("{id}")
    public ResponseEntity<Note> updateNote(@PathVariable int id, @Valid @RequestBody Note note) {
        note.setId(id);
        return new ResponseEntity<Note>(noteService.updateNote(note), HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteNote(@PathVariable int id) {
        noteService.deleteNote(id);
        return new ResponseEntity<HttpStatus>(HttpStatus.NO_CONTENT);
    }

    @GetMapping(value = "/filter", params = "active")
    public ResponseEntity<List<Note>> findByActive(@RequestParam boolean active) {
        return new ResponseEntity<List<Note>>(noteService.findByActive(active), HttpStatus.OK);
    }

    @GetMapping(value ="/filter", params = "tags")
    public ResponseEntity<List<Note>> finByTags(@RequestParam List<Integer> tags) {
        return new ResponseEntity<List<Note>>(noteService.finByTags(tags), HttpStatus.OK);
    }
}
