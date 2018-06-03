import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Tournament } from './tournament';
import { TOURNAMENTS } from './mock/mock-tournaments';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class TournamentService{

  constructor(private messageService: MessageService) { }

  getTournaments(): Observable<Tournament[]> {
    // TODO: send the message _after_ fetching the tournamentses
    this.messageService.add('TournamentService: fetched tournaments');
    return of(TOURNAMENTS);
  }
}
