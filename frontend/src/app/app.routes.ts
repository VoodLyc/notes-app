import { Routes } from '@angular/router';
import { NoteComponent } from './note/note.component';
import { TagComponent } from './tag/tag.component';
import { authGuard } from './shared/guard/auth.guard';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: '/notes', pathMatch: 'full' },
    { path: 'auth', component: AuthComponent },
    { path: 'home', component: HomeComponent, canActivate: [authGuard], children: [
        { path: 'notes', component: NoteComponent },
        { path: 'tags', component: TagComponent },
    ]},
    { path: '**', redirectTo: '/home' }
];