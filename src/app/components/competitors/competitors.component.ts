import {Component, OnInit} from '@angular/core';
import {CompetitorService} from '../../services/competitor.service';
import {ActivatedRoute} from '@angular/router';
import {Tournament} from '../../models/tournament';
import {Competitor} from '../../models/competitor';
import {first} from 'rxjs/operators';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddCompetitorsModalComponent} from '../modals/add-competitors-modal/add-competitors-modal.component';
import {TreeService} from '../../services/tree.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-competitors',
  templateUrl: './competitors.component.html',
  styleUrls: ['./competitors.component.scss']
})
export class CompetitorsComponent implements OnInit {
  tournament: Tournament;
  public loading = true;
  tournamentSlug: string;

  constructor(private competitorService: CompetitorService,
              public treeService: TreeService,
              private route: ActivatedRoute,
              private modalService: NgbModal,
              private toastr: ToastrService,
  ) {
    this.tournamentSlug = this.route.snapshot.params.slug;

  }

  open(championshipId) {
    const modalRef = this.modalService.open(AddCompetitorsModalComponent, {size: 'lg', centered: true});
    modalRef.componentInstance.championshipId = championshipId;
    modalRef.result.then((data) => {
      this.tournament.championships.find((championship) => championship.id === championshipId).competitors = data.competitors;
    }, (reason) => {
    });
  }

  all(): void {
    this.loading = true;
    this.competitorService.all(this.tournamentSlug)
      .pipe(first())
      .subscribe(tournament => {
        this.tournament = tournament;
        this.loading = false;
      }, err => {
        this.loading = false;
      });
  }

  generateTree(championship) {
    this.treeService.store(championship)
      .pipe(first())
      .subscribe(
        data => {
          this.loading = false;
        },
        error => {
          this.loading = false;
        });

  }

  delete(competitor: Competitor, championshipIndex: number): void {
    this.loading = true;
    // tournament.championships[x].user
    // this.tournament.competitors = this.tournament.competitors.filter(h => h !== competitor);
    this.tournament.championships[championshipIndex].competitors = this.tournament.championships[championshipIndex].competitors.filter(h => h !== competitor);
    this.competitorService.delete(this.tournamentSlug, competitor).subscribe();
    this.loading = false;
  }


  ngOnInit() {

    this.all();

  }
}
