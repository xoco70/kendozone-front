import {Component, OnInit, ViewChild} from '@angular/core';
import {DropzoneComponent, DropzoneConfigInterface, DropzoneDirective} from 'ngx-dropzone-wrapper';
import {GRADES} from '../../mock/mock-grades';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {COUNTRIES} from '../../mock/mock-countries';
import {environment} from '../../../environments/environment';
import {AuthenticationService} from '../../services/authentication.service';
import {LocalStorageService} from '../../services/local-storage.service';
import {NavService} from '../../services/nav.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  generalDataForm: FormGroup;
  public type = 'component';
  grades = GRADES;
  countries = COUNTRIES;
  public disabled = false;
  user: User;
  config: any;
  message: string;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private auth: AuthenticationService,
              private data: NavService) {
  }

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
  private submitted = false;

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.generalDataForm.invalid) {
      return;
    }

    this.loading = true;
    // I use localTournament not to send the whole object
    // I still don't know if I have a Eloquent like in Angular
    this.user.name = this.f.name.value;
    this.user.firstname = this.f.firstname.value;
    this.user.lastname = this.f.lastname.value;
    this.user.country_id = this.f.country_id.value;
    this.user.grade_id = this.f.grade_id.value;

    this.userService.update(this.user)
      .pipe(first())
      .subscribe(
        user => {
          this.loading = false;
        },
        error => {
          this.loading = false;
        });
  }

  get f() {
    return this.generalDataForm.controls;
  }

  public resetDropzoneUploads(): void {
    if (this.type === 'directive' && this.directiveRef) {
      this.directiveRef.reset();
    } else if (this.type === 'component' && this.componentRef && this.componentRef.directiveRef) {
      this.componentRef.directiveRef.reset();
    }
  }

  getUser(): User {
    this.loading = true;
    this.userService.getUser() // this.slug
      .subscribe(user => {
        // console.log(data);
        this.user = user;
        this.config.url = environment.apiUrl + 'users/' + this.user.slug + '/avatar';
        this.generalDataForm = this.formBuilder.group({
            name: [this.user.name, Validators.required],
            firstname: [''],
            lastname: [''],
            grade_id: [''],
            country_id: ['']
          },
        );
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
    const currentUser = this.auth.currentUser();
    currentUser.avatar = args[1];
    LocalStorageService.setUser(currentUser);
    this.user.avatar = args[1];
  }

  ngOnInit(): void {
    this.data.setTitle('Profile');
    this.data.currentMessage.subscribe(message => this.message = message);
    this.getUser();
  }
}
