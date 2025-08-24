import { CategoryValidator } from "./categories.validator";
import { ProductValidator } from "./products.validator";
import { SubCategoryValidator } from "./subcategories.validator";
import { UserValidator } from "./users.validator";

class Validator {
  private static instance: Validator;
  public category: CategoryValidator;
  public subcategory: SubCategoryValidator;
  public user: UserValidator;
  public product: ProductValidator;

  private constructor() {
    this.category = new CategoryValidator();
    this.subcategory = new SubCategoryValidator();
    this.user = new UserValidator();
    this.product = new ProductValidator();
  }

  public static getInstance(): Validator {
    if (!Validator.instance) {
      Validator.instance = new Validator();
    }
    return Validator.instance;
  }
}

export default Validator.getInstance();
