import {Component, Input, OnInit} from '@angular/core';
import {Championship} from '../../../models/championship';
import {FlattenPipe, GroupByPipe} from 'ngx-pipes';
import {FightersGroup} from '../../../models/fighters.group';
import {plainToClass} from 'class-transformer';
import {Team} from '../../../models/team';
import {Competitor} from '../../../models/competitor';
import {User} from '../../../models/user';

@Component({
  selector: 'app-single-elimination',
  templateUrl: './single-elimination.component.html',
  styleUrls: ['./single-elimination.component.scss'],
  providers: [GroupByPipe, FlattenPipe]
})
export class SingleEliminationComponent implements OnInit {
  @Input() championship: Championship;
  noRounds: number;
  numFighters: number;
  fighterGroups: FightersGroup[];
  roundSpacing = 40;
  firstRoundGroup: FightersGroup[];
  matchWrapperWidth = 150;
  brackets = [] as any[][];
  private groupWithoutPreliminary: FightersGroup[];

  constructor(
    private groupByPipe: GroupByPipe,
  ) {
  }

  ngOnInit() {
    this.fighterGroups = plainToClass(FightersGroup, this.championship.fighters_groups);
    this.firstRoundGroup = this.fighterGroups.filter(group => group.round === this.championship.settings.hasPreliminary + 1);
    this.groupWithoutPreliminary = this.fighterGroups.filter(group => group.round >= this.championship.settings.hasPreliminary + 1);
    const groupsByRound = this.groupByPipe.transform(this.groupWithoutPreliminary, 'round');

    this.numFighters = this.firstRoundGroup.length * 2;
    this.noRounds = Math.log2(this.numFighters);
    for (let i = 1; i <= this.noRounds; i++) {
      this.brackets[i] = groupsByRound[i].map(group => {
        if (this.championship.category.isTeam) {
          return new Object({
            'playerA': group.teams[0] || new Team('Bye'),
            'playerB': group.teams[1] || new Team('Bye')
          });
        }
        return new Object({
          'playerA': group.competitors[0] || new Competitor(new User('Bye')),
          'playerB': group.competitors[1] || new Competitor(new User('Bye'))
        });
      });
    }
    this.assignPositions();
    // Third place positionning
    if (this.numFighters >= this.championship.settings.preliminaryGroupSize * 2) {
      this.brackets[this.noRounds][1]['matchWrapperTop'] = this.brackets[this.noRounds][0]['matchWrapperTop'] + 100;
    }
  }

  assignPositions() {
    let spaceFactor = 0.5;
    let playerHeightFactor = 1;
    const playerWrapperHeight = 30;


    const matchSpacing = 42;
    const borderWidth = 3;

    this.brackets.forEach((round, roundNumber) => {
      round.forEach((match, matchNumber) => {
        matchNumber = matchNumber + 1; // matchNumber should begin with 1, not 0
        match['matchWrapperTop'] = (((2 * matchNumber) - 1) * (Math.pow(2, roundNumber - 1)) - 1) * ((matchSpacing / 2) + playerWrapperHeight);
        match['matchWrapperLeft'] = (roundNumber - 1) * (this.matchWrapperWidth + this.roundSpacing - 1);
        match['vConnectorLeft'] = Math.floor(match['matchWrapperLeft'] + this.matchWrapperWidth + (this.roundSpacing / 2) - (borderWidth / 2));
        match['vConnectorHeight'] = (spaceFactor * matchSpacing) + (playerHeightFactor * playerWrapperHeight) + borderWidth;
        match['vConnectorTop'] = match['hConnectorTop'] = match['matchWrapperTop'] + playerWrapperHeight;
        match['hConnectorLeft'] = (match['vConnectorLeft'] - (this.roundSpacing / 2)) + 2;
        match['hConnector2Left'] = match['matchWrapperLeft'] + this.matchWrapperWidth + (this.roundSpacing / 2);
        //
        // // Adjust the positions depending on the match number
        //
        if (!(matchNumber % 2)) {
          match['hConnector2Top'] = match['vConnectorTop'] -= (match['vConnectorHeight'] - borderWidth);
        } else {
          match['hConnector2Top'] = match['vConnectorTop'] + (match['vConnectorHeight'] - borderWidth);
        }
      });
      spaceFactor *= 2;
      playerHeightFactor *= 2;
      return;
    });
  }

  getRoundTitles() {
    const semiFinalTitles = ['Semi-Finals', 'Final'];
    const quarterFinalTitles = ['Quarter-Finals', 'Semi-Finals', 'Final'];
    const roundTitle = [
      ['Final'],
      semiFinalTitles,
      semiFinalTitles,
      semiFinalTitles,
      quarterFinalTitles,
      quarterFinalTitles,
      quarterFinalTitles,
    ];
    if (this.numFighters > 8) {
      const roundTitles = ['Quarter-Finals', 'Semi-Finals', 'Final'];
      const tempRounds = [];
      let noTeamsInFirstRound = Math.pow(2, Math.ceil(Math.log(this.numFighters) / Math.log(2)));
      // The minus 3 is to ignore the final, semi final and quarter final rounds

      for (let i = 0; i < this.noRounds - 3; i++) {
        tempRounds.push('Last ' + noTeamsInFirstRound);
        noTeamsInFirstRound /= 2;
      }
      return roundTitles.concat(tempRounds);
    }
    return roundTitle[this.numFighters - 2]; // -2 because roundTitle should begin with an index at 2
  }
}
