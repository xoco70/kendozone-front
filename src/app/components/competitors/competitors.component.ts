import {Component, Input, OnInit} from '@angular/core';
import {CompetitorService} from '../../services/competitor.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Tournament} from '../../models/tournament';
import {Competitor} from '../../models/competitor';
import {first} from 'rxjs/operators';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddCompetitorsModalComponent} from '../modals/add-competitors-modal/add-competitors-modal.component';
import {TreeService} from '../../services/tree.service';
import {ToastrService} from 'ngx-toastr';
import {LocalStorageService} from '../../services/local-storage.service';
import {NavService} from '../../services/nav.service';

@Component({
  selector: 'app-competitors',
  templateUrl: './competitors.component.html',
  styleUrls: ['./competitors.component.scss']
})
export class CompetitorsComponent implements OnInit {
  public tournament: Tournament;
  tournamentSlug: string;
  @Input() loading;

  constructor(private navbar: NavService,
              private competitorService: CompetitorService,
              public treeService: TreeService,
              private route: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal,
  ) {
    this.tournamentSlug = this.route.snapshot.params.slug;

  }

  open(championshipId) {
    const modalRef = this.modalService.open(AddCompetitorsModalComponent, {size: 'lg', centered: true});
    modalRef.componentInstance.championshipId = championshipId;
    modalRef.result.then((competitors) => {
      this.tournament.championships.find((championship) => championship.id === championshipId).competitors = competitors;
    }, (reason) => {
    });
  }

  all(): void {
    this.navbar.setLoading(true);
    this.competitorService.all(this.tournamentSlug)
      .pipe(first())
      .subscribe(tournament => {
        this.tournament = tournament;
        this.navbar.setLoading(false);
      }, err => {
        this.navbar.setLoading(false);
      });
  }

  generateTree(championship) {
    this.treeService.store(championship)
      .pipe(first())
      .subscribe(
        data => {
          this.navbar.setLoading(false);
          this.router.navigate(['/tournaments', this.tournamentSlug, 'trees']);
        },
        error => {
          this.navbar.setLoading(false);
        });

  }

  delete(competitor: Competitor, championshipIndex: number): void {
    this.navbar.setLoading(true);
    this.tournament.championships[championshipIndex].competitors = this.tournament.championships[championshipIndex].competitors.filter(h => h !== competitor);
    this.competitorService.delete(this.tournamentSlug, competitor).subscribe();
    LocalStorageService.removeCompetitor();
    this.navbar.setLoading(false);
  }


  ngOnInit() {
    this.all();

  }
}
