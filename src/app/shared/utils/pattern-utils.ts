export class PatternUtils {
  private constructor() {
    throw new Error("This class is not meant to be instantiated");
  }
  static date: RegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
  static email: RegExp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  static firstNameAndLastname: RegExp = /^[a-zA-Z]+ [a-zA-Z]+(?: [a-zA-Z]+)*$/;
  static onlyLetters: RegExp = /^[a-zA-Z]+$/;
  static onlyNumbers: RegExp = /^[1-9]\d*$/;
  static spanishPostalCode: RegExp = /^[0-5][0-9]{4}$/;
  static spanishPhone: RegExp = /^[679][0-9]{8}$/;
  //At least one number, one uppercase letter, one lowercase letter
  static password: RegExp = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d)/;

  static noEmptySpaces: RegExp = /^\S+$/;
  static spanishTin: RegExp = /^[0-9]{8}[H]$/;
  
  static uuidV4: RegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

}
