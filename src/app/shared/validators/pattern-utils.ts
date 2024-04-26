export class PatternUtils {

  private constructor() {
    throw new Error("This class is not meant to be instantiated");
  }

  public static date: string = '^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$'
  public static email: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  public static firstNameAndLastname: string = '^[a-zA-Z]+ [a-zA-Z]+(?: [a-zA-Z]+)*$';
  public static onlyLetters: string = '^[a-zA-Z]+$';
  public static onlyNumbers: string = '^[1-9]\d*$';
  public static spanishPhone: string = '^[679][0-9]{8}$';
  
}
