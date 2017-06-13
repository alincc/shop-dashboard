import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';;

@Injectable()
export class ToastService {

  public options = {
      position: ["bottom", "left"],
      timeOut: 5000,
      lastOnBottom: true
  }

  private defaultOptions = {
    showProgressBar: true,
    pauseOnHover: false,
    clickToClose: false,
  };

  constructor(private _service: NotificationsService) { }

  success(title: string, message: string, options = {}): void {
    this._service.success(
            title,
            message,
            {
              ...this.defaultOptions,
              ...options,
            },
        );
  }

  info(title: string, message: string, options = {}): void {
    this._service.info(
            title,
            message,
            {
              ...this.defaultOptions,
              ...options,
            },
        );
  }

  alert(title: string, message: string, options = {}): void {
    this._service.alert(
            title,
            message,
            {
              ...this.defaultOptions,
              ...options,
            },
        );
  }

  error(title: string, message: string, options = {}): void {
    this._service.error(
            title,
            message,
            {
              ...this.defaultOptions,
              ...options,
            },
        );
  }

  warn(title: string, message: string, options = {}): void {
    this._service.warn(
            title,
            message,
            {
              ...this.defaultOptions,
              ...options,
            },
        );
  }

}
