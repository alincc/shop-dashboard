import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ConfirmationService as Confirmations } from '@jaspero/ng2-confirmations';
import { ResolveEmit } from '../model/interface';

@Injectable()
export class ConfirmationService {

  constructor(private service: Confirmations) { }

  create(title: string, message: string): Observable<ResolveEmit> {
    return this.service.create(title, message);
  }
}
