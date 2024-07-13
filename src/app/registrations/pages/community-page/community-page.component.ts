import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Observable, catchError, filter, of, switchMap, tap } from 'rxjs';

import { CommunitiesService } from '@communities/communities.service';
import { CountryCode } from '@locations/enums/country-codes';
import { CreateAddress } from '@locations/interfaces/create-address.interface';
import { CreateCommunity } from '@communities/interfaces/create-community.interface';
import { Location } from '@locations/interfaces/location.interface';
import { LocationsService } from '@locations/locations.service';
import { PatternUtils } from '@shared/validators/pattern-utils';
import { SpanishSubRegions } from '@locations/enums/spanish-regions';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './community-page.component.html',
  styleUrl: './community-page.component.scss'
})
export class CommunityPage implements OnInit {

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly locationsService = inject(LocationsService);
  private readonly communitiesService = inject(CommunitiesService)

  public citiesSignal = signal<Location[]>([]);
  public communityForm!: FormGroup;
  public subregions = SpanishSubRegions;

  private isEditMode = false;
  private communityId?: string;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.createCommunityForm();
    this.route.params.pipe(
      filter(params => !!params['id']),
      tap((params) => {
        this.isEditMode = true;
        this.communityId = params['id']
      })
    ).subscribe();
    this.loadCommunity();
    this.handleSubregionChange().subscribe();
  }

  onSubmit() {
    if (this.communityForm.invalid) {
      this.communityForm.markAllAsTouched();
      return;
    }

    const createAddress = this.buildAddress();
    const address: CreateCommunity = {
      address: createAddress
    }

    if (this.isEditMode) {
      this.communitiesService.updateCommunity(this.communityId!, address).pipe(
        filter(updated => !!updated),
        switchMap(() => this.router.navigate(['/dashboard']))
      ).subscribe();
    } else {
      this.communitiesService.createCommunity(address).pipe(
        filter(created => !!created),
        switchMap(() => this.router.navigate(['/dashboard']))
      ).subscribe();
    }
  }

  handleSubregionChange(): Observable<Location[]> {
    return this.communityForm.get('subregion')!.valueChanges.pipe(
      switchMap((subregion: string) =>
        this.locationsService.getCitiesBySubregionCode(subregion).pipe(
          tap(cities => this.citiesSignal.set(cities)),
          catchError(() => of([])),
        )
      )
    )
  }

  isNotValidField(field: string): boolean {
    const control = this.communityForm.get(field);
    if (!control) return false;
    return control.touched && control.invalid;
  }

  keepOrder = (a: any, b: any): any => {
    return a;
  }

  private createCommunityForm(): void {
    this.communityForm = this.fb.group({
      street: [
        '',
        Validators.required,
      ],
      streetNumber: [
        '',
        [
          Validators.required,
        ]
      ],
      postalCode: [
        '',
        [
          Validators.required,
          Validators.pattern(PatternUtils.spanishPostalCode)
        ]
      ],
      subregion: [
        null,
        [
          Validators.required,
        ]
      ],
      city: [
        null,
        [
          Validators.required
        ]
      ],
    });
  }

  private buildAddress(): CreateAddress {
    const createAddress: CreateAddress = {
      ...this.communityForm.value,
      city: Number(this.communityForm.value.city),
      country: CountryCode.ES
    };
    return createAddress;
  }

  private loadCommunity(): void {
    this.communitiesService.getCommunityById(this.communityId!).pipe(
      tap(({ address }) => {
        this.communityForm.patchValue(address);
        this.communityForm.patchValue({ subregion: address.subregion.code })
      }),
      switchMap(({ address }) => this.locationsService.getCitiesBySubregionCode(address.subregion.code).pipe(
        tap(cities => this.citiesSignal.set(cities)),
        tap(() => this.communityForm.patchValue({ city: address.city.code })),
        catchError(() => of([])),
      )),
    ).subscribe();
  }
}
