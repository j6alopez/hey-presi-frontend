import { FormControl } from "@angular/forms";
import { Location } from "@locations/interfaces/location.interface";
import { SpanishSubRegion } from "@locations/enums/spanish-subregion";

export interface CommunityForm {
  street: FormControl<string | null>;
  streetNumber: FormControl<string | null>;
  postalCode: FormControl<string | null>;
  subregion: FormControl<SpanishSubRegion | null>;
  city: FormControl<Location | null>;
}
