import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { EndPointApi } from '../_helpers/endpointapi';
import { Plugin } from '../_models/plugin';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class PluginService {

    @Output() onPluginsChanged: EventEmitter<any> = new EventEmitter();
v
    private endPointConfig: string = EndPointApi.getURL();

    constructor(private http: HttpClient,
        private translateService: TranslateService,
        private toastr: ToastrService) { 

    }
    
    getPlugins() {
        return this.http.get<Plugin[]>(this.endPointConfig + '/api/plugins');
    }

    installPlugin(plugin: Plugin) {
        return new Observable((observer) => {
            if (environment.serverEnabled) {
                let header = new HttpHeaders({ 'Content-Type': 'application/json' });
                this.http.post<any>(this.endPointConfig + '/api/plugins', { headers: header, params: plugin }).subscribe(result => {
                    observer.next();
                    this.onPluginsChanged.emit();
                }, err => {
                    console.log(err);
                    observer.error(err);
                });                
            } else {
                observer.next();
            }
        });
    }

    removePlugin(plugin: Plugin) {
        return new Observable((observer) => {
            if (environment.serverEnabled) {
                let header = new HttpHeaders({ 'Content-Type': 'application/json' });
                this.http.delete<any>(this.endPointConfig + '/api/plugins', { headers: header, params: {param:  plugin.name} }).subscribe(result => {
                    observer.next();
                    this.onPluginsChanged.emit();
                }, err => {
                    console.log(err);
                    observer.error(err);
                });                
            } else {
                observer.next();
            }
        });
    }

    // getUsers(user: any): Observable<any> {
    //     let header = new HttpHeaders({ 'Content-Type': 'application/json' });
    //     let params = user;
    //     return this.http.get<any>(this.endPointConfig + '/api/users', { headers: header, params: params });
    // }

    // setUser(user: User) {
    //     return new Observable((observer) => {
    //         if (environment.serverEnabled) {
    //             let header = new HttpHeaders({ 'Content-Type': 'application/json' });
    //             this.http.post<any>(this.endPointConfig + '/api/users', { headers: header, params: user }).subscribe(result => {
    //                 observer.next();
    //             }, err => {
    //                 console.log(err);
    //                 this.notifySaveError();
    //                 observer.error(err);
    //             });                
    //         } else {
    //             observer.next();
    //         }
    //     });
    // }

    // removeUser(user: User) {
    //     return new Observable((observer) => {
    //         if (environment.serverEnabled) {
    //             let header = new HttpHeaders({ 'Content-Type': 'application/json' });
    //             this.http.delete<any>(this.endPointConfig + '/api/users', { headers: header, params: {param: user.username} }).subscribe(result => {
    //                 observer.next();
    //             }, err => {
    //                 console.log(err);
    //                 this.notifySaveError();
    //                 observer.error(err);
    //             });                
    //         } else {
    //             observer.next();
    //         }
    //     });
    // }

    //#region Notify
    // private notifySaveError() {
    //     let msg = '';
    //     this.translateService.get('msg.users-save-error').subscribe((txt: string) => { msg = txt });
    //     this.toastr.error(msg, '', {
    //         timeOut: 3000,
    //         closeButton: true,
    //         disableTimeOut: true
    //     });
    // }
    //#endregion
}