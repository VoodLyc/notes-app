package notes.backend.repository;

import notes.backend.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface NoteRepository extends JpaRepository<Note, Integer> {
    List<Note> findByActive(boolean active);

    @Query("SELECT DISTINCT n FROM Note n JOIN n.tags t WHERE t IN :tags")
    List<Note> findByTags(List<Integer> tags);
}
