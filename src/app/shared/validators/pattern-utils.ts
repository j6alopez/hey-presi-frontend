export class PatternUtils {

  private constructor() {
    throw new Error("This class is not meant to be instantiated");
  }

  public static date: RegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
  public static email: RegExp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  public static firstNameAndLastname: RegExp = /^[a-zA-Z]+ [a-zA-Z]+(?: [a-zA-Z]+)*$/;
  public static onlyLetters: RegExp = /^[a-zA-Z]+$/;
  public static onlyNumbers: RegExp = /^[1-9]\d*$/;
  public static spanishPhone: RegExp = /^[679][0-9]{8}$/;
  //At least one number, one uppercase letter, one lowercase letter
  public static password: RegExp = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d)/;
  
  public static uuidV4: RegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

}
