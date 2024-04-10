package notes.backend.controller;

import notes.backend.model.Tag;
import notes.backend.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tags")
public class TagController {
    @Autowired
    private TagService tagService;

    @GetMapping
    public ResponseEntity<List<Tag>> getTags() {
        return new ResponseEntity<List<Tag>>(this.tagService.getTags(), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<Tag> getTag(@PathVariable int id) {
        return new ResponseEntity<Tag>(this.tagService.getTag(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Tag> saveTag(@RequestBody Tag tag) {
        return new ResponseEntity<Tag>(this.tagService.saveTag(tag), HttpStatus.CREATED);
    }

    @PutMapping("{id}")
    public ResponseEntity<Tag> updateTag(@RequestBody Tag tag, @PathVariable int id) {
        tag.setId(id);
        return new ResponseEntity<Tag>(this.tagService.updateTag(tag), HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteTag(@PathVariable int id) {
        tagService.deleteTag(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
