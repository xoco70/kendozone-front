import {Component, OnInit, ViewChild} from '@angular/core';
import {DropzoneComponent, DropzoneConfigInterface, DropzoneDirective} from 'ngx-dropzone-wrapper';
import {GRADES} from '../../mock/mock-grades';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {Tournament} from '../../models/tournament';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public type = 'component';
  grades = GRADES;
  public disabled = false;
  user: User;

  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null,
    createImageThumbnails: true,
    addRemoveLinks: true
  };

  @ViewChild(DropzoneComponent) componentRef?: DropzoneComponent;
  @ViewChild(DropzoneDirective) directiveRef?: DropzoneDirective;
  private loading = false;
  private federations: any;
  private associations: any;
  private clubs: any;

  constructor(private userService: UserService) {
  }

  public resetDropzoneUploads(): void {
    if (this.type === 'directive' && this.directiveRef) {
      this.directiveRef.reset();
    } else if (this.type === 'component' && this.componentRef && this.componentRef.directiveRef) {
      this.componentRef.directiveRef.reset();
    }
  }

  getUser(): Tournament {
    this.loading = true;
    this.userService.getUser() // this.slug
      .subscribe(data => {
        console.log(data);
        this.user = data['user'];
        this.federations = data['federations'];
        this.associations = data['associations'];
        this.clubs = data['clubs'];
        this.loading = false;
      }, err => {
        this.loading = false;
      });
    return null;
  }

  public onUploadError(args: any): void {
    console.log('onUploadError:', args);
  }

  public onUploadSuccess(args: any): void {
    console.log('onUploadSuccess:', args);
  }

  ngOnInit(): void {
    this.getUser();
  }
}
