import { CommonModule } from '@angular/common';
import { Component, OnInit, Signal, computed, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { filter, tap } from 'rxjs';

import { LocationsService } from '../../../locations/locations.service';

import { SpanishSubRegions } from '../../../locations/enums/spanish-regions';
import { Location } from '../../../locations/interfaces/location.interface';
import { PatternUtils } from '../../../shared/validators/pattern-utils';
import { CommunitiesService } from '../../../communities/communities.service';
import { CreateCommunity } from '../../../communities/interfaces/create-community.interface';
import { CreateAddress } from '../../../locations/interfaces/create-address.interface';
import { CountryCode } from '../../../locations/enums/country-codes';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './community-page.component.html',
  styleUrl: './community-page.component.scss'
})
export class CommunityPage implements OnInit {

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly locationsService = inject(LocationsService);
  private readonly communitiesService = inject(CommunitiesService)

  public citiesSignal!: Signal<Location[]>;
  public communityForm: FormGroup;
  public subregions = SpanishSubRegions;

  private isEditMode: boolean = false;
  private communityId?: string;

  constructor(private formBuilder: FormBuilder) {
    this.communityForm = this.formBuilder.group({

      street: [
        '',
        [
          Validators.required,
        ]
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

  ngOnInit(): void {
    this.citiesSignal = computed(() => {
      return this.locationsService.cities();
    })
    console.log('aaa');
    console.log(this.subregions);
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.isEditMode = true;
        this.communityId = params.get('id')!;
        this.communitiesService.getCommunityById(this.communityId).subscribe(community => {
          if (community) {
            this.communityForm.patchValue(community.address);
          }
        });
      }
    });
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
    this.communitiesService.createCommunity(address).pipe(
      filter(created => !!created),
      tap(() => this.router.navigate(['/dashboard']))
    ).subscribe();

  }

  onSubregionChange(event: any) {
    const subregion: string = event.target.value;
    if (!subregion) return;
    this.locationsService.getCitiesBySubregionCode(subregion)
      .subscribe(
        () => {
          this.communityForm.get('city')?.setValue(null)
        },
      );
  }

  isNotValidField(field: string): boolean {
    const control = this.communityForm.get(field);
    if (!control) return false;
    return control.touched && control.invalid;
  }

  private buildAddress(): CreateAddress {
    const createAddress: CreateAddress = {
      ...this.communityForm.value,
      city: Number(this.communityForm.value.city),
      country: CountryCode.ES
    };
    return createAddress;
  }

  keepOrder = (a: any, b: any) : any => {
    return a;
  }
}
