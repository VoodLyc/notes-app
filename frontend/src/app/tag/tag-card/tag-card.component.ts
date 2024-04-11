import { Component, Input, OnInit } from '@angular/core';
import { Tag } from '../../shared/model/tag.model';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { TagService } from '../../shared/service/tag.service';
import { CommonModule } from '@angular/common';
import { Observable, of, switchMap } from 'rxjs';
import { PrintValidationErrorComponent } from '../../shared/components/print-validation-error/print-validation-error.component';

@Component({
  selector: 'app-tag-card',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, PrintValidationErrorComponent],
  templateUrl: './tag-card.component.html',
  styleUrl: './tag-card.component.css'
})
export class TagCardComponent implements OnInit {
  @Input() tag: Tag = {id: -1, name: "dwdwd"};
  tagForm: FormGroup = new FormGroup({});

  constructor(private tagService: TagService) {}

  ngOnInit(): void {
    this.tagForm = new FormGroup({
      "name": new FormControl(this.tag.name, [Validators.required, Validators.maxLength(20)])
    });
    this.tagForm.get('name')?.statusChanges.subscribe(
      () => {
        console.log(this.tagForm.get('name'))
        console.log(this.tagForm.get('name')?.status);
        console.log(this.tagForm.get('name')?.errors);
      }
    )
  }

  onSubmit(): void {
    this.saveTag();
  }

  saveTag(): void {
    this.tag.name = this.tagForm.value["name"];
    this.tagService.saveTag(this.tag).subscribe(
      (tag : Tag) => {
        this.tag.id = tag.id;
        this.tagService.fetchTags();
      }
    )
  }

  deleteTag(): void {
    this.tagService.deleteTag(this.tag.id).subscribe(
      () => {
        this.tagService.fetchTags();
      }
    )
  }

}