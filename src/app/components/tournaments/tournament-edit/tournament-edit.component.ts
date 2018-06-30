import {AfterViewChecked, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Tournament} from '../../../models/tournament';
import {TournamentService} from '../../../services/tournament.service';
import {ToastrService} from 'ngx-toastr';
import {NgbTabset} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tournament-edit-component',
  templateUrl: './tournament-edit.component.html',
  styleUrls: ['./tournament-edit.component.scss']
})
export class TournamentEditComponent implements OnInit, AfterViewChecked {
  data: any;
  loading: boolean;
  slug: string;
  submitted = false;
  selectedTab: string;


  constructor(private tournamentService: TournamentService,
              private route: ActivatedRoute,
              private toastr: ToastrService) {
    this.slug = this.route.snapshot.params.slug;
    this.route.data.subscribe(d => {
      this.selectedTab = d.name;
    });
  }

  @ViewChild('tabs')
  private tabs: NgbTabset;

  getTournament(): Tournament {
    this.loading = true;
    this.tournamentService.getTournament(this.slug)
      .subscribe(tournament => {
        this.data = tournament;
        localStorage.setItem('tournament', JSON.stringify(tournament));
        localStorage.setItem('test', 'hola');
        this.loading = false;
      }, err => {
        this.loading = false;
      });
    return null;
  }

  ngOnInit() {
    // this.route.params.subscribe(
    //   params => {
    //     this.prospectId = +params['prospectid'];
    //   }
    // );
    this.getTournament();
  }

  ngAfterViewChecked(): void {
    if (this.tabs) {
      this.tabs.select(this.selectedTab);
    }
  }

  onSubmitCategories() {
    this.selectedTab = 'categories';
    console.log(this.data.tournament.categoriesSelected);
    this.submitted = true;

    if (this.data.tournament.categoriesSelected.length === 0) {
      this.toastr.error('You must select at least 1 category'); // TODO translate
      return;
    }

    this.loading = true;

    // this.tournament.
    this.tournamentService.update(this.data.tournament, 'categories')
      .subscribe(
        data => {
          this.data.tournament.championships = data.championships;
          this.loading = false;
        },
        error => {
          this.loading = false;
        });

  }

}
