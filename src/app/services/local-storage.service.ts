import {Injectable} from '@angular/core';
import {Competitor} from '../models/competitor';

@Injectable({providedIn: 'root'})

export class LocalStorageService {

  static getCompetitors(): Competitor[] {
    const data = JSON.parse(localStorage.getItem('tournament'));
    return data.tournament.competitors;
  }

  static getTeamCount(): number {
    const data = JSON.parse(localStorage.getItem('tournament'));
    return data.tournament.teams_count;
  }

  static getTreesCount(): number {
    const data = JSON.parse(localStorage.getItem('tournament'));
    return data.tournament.trees_count;
  }

  static setCompetitors(competitors): void {
    const data = JSON.parse(localStorage.getItem('tournament'));
    data.tournament.competitors = competitors;
    localStorage.setItem('tournament', JSON.stringify(data.tournament));
  }

  static setTeamCount(teams_count): void {
    const data = JSON.parse(localStorage.getItem('tournament'));
    data.tournament.teams_count = teams_count;
    localStorage.setItem('tournament', JSON.stringify(data.tournament));
  }

  static setTreesCount(trees_count): void {
    const data = JSON.parse(localStorage.getItem('tournament'));
    data.tournament.trees_count = trees_count;
    localStorage.setItem('tournament', JSON.stringify(data.tournament));
  }


}
