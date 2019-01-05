import {AfterViewChecked, Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TournamentService} from '../../../services/tournament.service';
import {ToastrService} from 'ngx-toastr';
import {NgbTabset} from '@ng-bootstrap/ng-bootstrap';
import {NavService} from '../../../services/nav.service';

@Component({
  selector: 'app-tournament-edit-component',
  templateUrl: './tournament-edit.component.html',
  styleUrls: ['./tournament-edit.component.scss']
})
export class TournamentEditComponent implements OnInit, AfterViewChecked {
  data: any;
  slug: string;
  submitted = false;
  selectedTab: string;

  constructor(private navbar: NavService,
              private tournamentService: TournamentService,
              private route: ActivatedRoute,
              private toastr: ToastrService) {
    this.slug = this.route.snapshot.params.slug;
    this.route.data.subscribe(d => {
      this.selectedTab = d.name;
    });
  }

  @ViewChild('tabs')
  private tabs: NgbTabset;

  getTournament() {
    this.navbar.setLoading(true);
    this.tournamentService.getTournament(this.slug)
      .subscribe(tournament => {
        this.data = tournament;
        localStorage.setItem('tournament', JSON.stringify(tournament));
        this.navbar.setLoading(false);
      }, err => {
        this.navbar.setLoading(false);
      });
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
    // console.log(this.data.tournament.categoriesSelected);
    this.submitted = true;

    if (this.data.tournament.categoriesSelected.length === 0) {
      this.toastr.error('You must select at least 1 category'); // TODO translate
      return;
    }

    this.navbar.setLoading(true);

    // this.tournament.
    this.tournamentService.update(this.data.tournament, 'categories')
      .subscribe(
        data => {
          this.data.tournament.championships = data.championships;
          this.navbar.setLoading(false);
        },
        error => {
          this.navbar.setLoading(false);
        });

  }

}
