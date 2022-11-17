import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AppRouteEnum } from '@extension/core';
import { LibraryAvailabilityService } from '@extension/services';
import { map, Observable, take, tap } from 'rxjs';

@Injectable()
export class ListGuard implements CanActivate {
    constructor(
        private readonly router: Router,
        private readonly libraryAvailabilityService: LibraryAvailabilityService
    ) {}

    public canActivate(): Observable<boolean> {
        return this.libraryAvailabilityService.check()
            .pipe(
                map(Boolean),
                tap((isAvailable) => this.redirectToErrorPageIfLibraryNotAvailable(isAvailable)),
                take(1)
            );
    }

    private redirectToErrorPageIfLibraryNotAvailable(isAvailable: boolean): void {
        if (!isAvailable) {
            this.router.navigateByUrl(`/${AppRouteEnum.Error}`);
        }
    }
}
