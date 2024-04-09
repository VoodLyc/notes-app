package notes.backend.service;

import notes.backend.model.Tag;

import java.util.List;

public interface TagService {

    List<Tag> getTags();

    Tag getTag(int id);

    Tag saveTag(Tag tag);

    Tag updateTag(Tag tag);

    void deleteTag(int id);
}
