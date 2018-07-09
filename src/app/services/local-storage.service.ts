import {Injectable} from '@angular/core';
import {Competitor} from '../models/competitor';
import {stringify} from 'querystring';

@Injectable({providedIn: 'root'})

export class LocalStorageService {

  static getCompetitors(): Competitor[] {
    const data = JSON.parse(localStorage.getItem('tournament'));
    return data.tournament.competitors;
  }

  static getTeamsCount(): number {
    return JSON.parse(localStorage.getItem('teams_count'));
  }

  static getTreesCount(): number {
    return JSON.parse(localStorage.getItem('trees_count'));
  }

  static getChampionshipsCount(): number {
    return JSON.parse(localStorage.getItem('championships_count'));
  }

  static getCompetitorsCount(): number {
    return JSON.parse(localStorage.getItem('competitors_count'));
  }

  static setCompetitors(competitors): void {
    const data = JSON.parse(localStorage.getItem('tournament'));
    data.tournament.competitors = competitors;
    localStorage.setItem('tournament', JSON.stringify(data.tournament));
  }

  static setTeamsCount(teams_count): void {
    localStorage.setItem('teams_count', teams_count);
  }

  static setTreesCount(trees_count): void {
    localStorage.setItem('trees_count', trees_count);
  }

  static setChampionshipsCount(championships_count): void {
    localStorage.setItem('championships_count', championships_count);
  }

  static setCompetitorsCount(competitors_count): void {
    localStorage.setItem('competitors_count', competitors_count);
  }


  static addTeam(): void {
    // localStorage.setItem('teams_count', teams_count);
  }

  static removeTeam(): void {
    // localStorage.setItem('trees_count', trees_count);
  }

  static addCompetitors(qty: number): number {
    const num = LocalStorageService.getCompetitorsCount();
    console.log(num);
    console.log(qty);
    localStorage.setItem('competitors_count', (num + qty) + '');
    console.log(num + qty);
    return num + qty;
  }

  static removeCompetitor(): number {
    const num = LocalStorageService.getCompetitorsCount();
    localStorage.setItem('competitors_count', (num - 1) + '');
    return num - 1;
  }


  static addUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }
}
