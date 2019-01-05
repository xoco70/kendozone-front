import {Component, OnInit, ViewChild} from '@angular/core';
import {DropzoneComponent, DropzoneConfigInterface, DropzoneDirective} from 'ngx-dropzone-wrapper';
import {GRADES_PROFILE} from '../../mock/mock-grades';
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
  grades = GRADES_PROFILE;
  countries = COUNTRIES;
  public disabled = false; // Check if necesary
  user: User;
  message: string;

  constructor(private navbar: NavService,
              private userService: UserService,
              private formBuilder: FormBuilder,
              private auth: AuthenticationService) {
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
  // private federations: any;
  // private associations: any;
  // private clubs: any;
  private submitted = false;


  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.generalDataForm.invalid) {
      return;
    }

    this.navbar.setLoading(true);
    // I use localTournament not to send the whole object
    // I still don't know if I have a Eloquent like in Angular
    console.log(this.f);
    this.user.name = this.f.name.value;
    this.user.firstname = this.f.firstname.value;
    this.user.lastname = this.f.lastname.value;
    this.user.country_id = this.f.country_id.value;
    this.user.grade_id = this.f.grade_id.value;
    console.log(this.user);
    this.userService.update(this.user)
      .pipe(first())
      .subscribe(
        user => {
          this.config.url = environment.apiUrl + '/users/' + this.user.slug + '/avatar';
          this.navbar.setLoading(false);
        },
        error => {
          this.navbar.setLoading(false);
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

  getUser(): void {
    this.navbar.setLoading(true);
    this.userService.getUser() // this.slug
      .subscribe(user => {
        this.user = user;
        this.config.url = environment.apiUrl + '/users/' + this.user.slug + '/avatar';
        this.generalDataForm = this.formBuilder.group({
            name: [this.user.name, Validators.required],
            firstname: [this.user.firstname],
            lastname: [this.user.lastname],
            grade_id: [this.user.grade_id],
            country_id: [this.user.country_id]
          },
        );
        this.navbar.setLoading(false);
      }, err => {
        this.navbar.setLoading(false);
      });
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
    setTimeout(() => {
      this.getUser();
    });
    this.navbar.setTitle('Profile');


    this.generalDataForm = this.formBuilder.group({
        name: ['', Validators.required],
        firstname: [''],
        lastname: [''],
        grade_id: [''],
        country_id: ['']
      },
    );
  }
}
