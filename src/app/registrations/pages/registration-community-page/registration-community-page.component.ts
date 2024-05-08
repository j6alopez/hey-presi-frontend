import { CommonModule } from '@angular/common';
import { Component, OnInit, Signal, computed, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../../../auth/services/auth.service';
import { City } from '../../../locations/interfaces/city.interface';
import { LocationsService } from '../../../locations/locations.service';
import { SpanishSubRegions } from '../../../locations/enums/spanish-regions';
import { CommunitiesService } from '../../../communities.service';
import { Address } from '../../../locations/interfaces/address.interface';
import { CommunityRegistrationForm } from '../../interfaces/community-form.interface';
import { RegistrationService } from '../../registation.service';
import { filter, switchMap } from 'rxjs';

@Component({
  selector: 'registration-community-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './registration-community-page.component.html',
  styleUrl: './registration-community-page.component.scss'
})
export class RegistrationCommunityPage implements OnInit {

  private readonly router = inject(Router);
  private readonly LocationsService = inject(LocationsService);
  private readonly registrationService = inject(RegistrationService);

  public citiesSignal!: Signal<City[]>;
  public communityForm: FormGroup;
  public subregions = SpanishSubRegions;


  constructor(private formBuilder: FormBuilder) {
    this.communityForm = this.formBuilder.group({

      street: [
        'Calle de test',
        [
          Validators.required,
        ]
      ],
      streetNumber: [
        "11",
        [
          Validators.required,
        ]
      ],
      postalCode: [
        "08304",
        [
          Validators.required,
        ]
      ],
      subregion: [
        null,
        [
          Validators.required
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
      return this.LocationsService.cities();
    })
  }

  onSubmit() {
    if (this.communityForm.invalid) {
      this.communityForm.markAllAsTouched();
      return;
    }

    const communityRegistration: CommunityRegistrationForm = this.communityForm.value as CommunityRegistrationForm;
    this.registrationService.registerCommunity(communityRegistration).pipe(
      filter(created => created),
      switchMap(() => this.registrationService.registerUnit())
    ).subscribe(() => {
      this.router.navigate(['/registrations', 'successful'], { queryParams: { community: this.registrationService.communityCode } });
      this.registrationService.clean()
    });

  }

  onSubregionChange(event: any) {
    const subregion: string = event.target.value;
    if (!subregion) return;
    this.LocationsService.getCitiesBySubregionCode(subregion)
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
}

