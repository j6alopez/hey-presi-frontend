import { Directive, ElementRef, Input, OnInit } from "@angular/core";
import { ValidationErrors } from "@angular/forms";

@Directive({
  selector: "[customLabel]"
})

export class CustomLabelDirective {

  private htmlElement?: ElementRef<HTMLElement>;
  private _errors?: ValidationErrors | null;


  @Input() set errors( value: ValidationErrors | null | undefined ) {
    this._errors = value;
    this.setErrorMessage();
  }

  constructor( private el: ElementRef<HTMLElement> ) {
    this.htmlElement = el;
  }

  setErrorMessage():void {
    if ( !this.htmlElement )return;
    if ( !this._errors ) {
      this.htmlElement.nativeElement.innerText = '';
      return;
    }

    const errors = Object.keys(this._errors);

    if ( errors.includes('required') )  {
      this.htmlElement.nativeElement.innerText = 'Este campo es requerido.';
      return;
    }

    if ( errors.includes('userExists') )  {
      this.htmlElement.nativeElement.innerText = 'El usuario ya existe.';
      return;
    }

    if ( errors.includes('minlength') )  {
      const min = this._errors!['minlength']['requiredLength'];
      const current = this._errors!['minlength']['actualLength'];

      this.htmlElement.nativeElement.innerText = `Mínimo ${current}/${ min } caracteres.`;
      return;
    }

    if ( errors.includes('email') )  {
      this.htmlElement.nativeElement.innerText = 'No tiene formato de correo.';
      return;
    }

  }


}