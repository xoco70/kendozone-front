import {Injectable} from '@angular/core';
import {Grade} from '../models/grade';
import {GRADES} from '../mock/mock-grades';

@Injectable({providedIn: 'root'})

export class GradeService {

  static all(): Grade[] {

    return GRADES;
  }


}
