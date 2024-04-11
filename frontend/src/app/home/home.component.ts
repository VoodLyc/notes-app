import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from '../shared/components/side-menu/side-menu.component';
import { NoteEditorComponent } from '../note/note-editor/note-editor.component';
import { Note } from '../shared/model/note.model';
import { Subject, takeUntil } from 'rxjs';
import { NoteService } from '../shared/service/note.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SideMenuComponent, NoteEditorComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  title = 'Notes';
  selectedNote: Note = { id: -1, title: "", content: "", active: true, tags: [] };
  ngUnsubscribe: Subject<void> = new Subject();
  
  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.noteService.getSelectedNote().pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(
      (note: Note) => {
        this.selectedNote = note;
      }
    );
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
