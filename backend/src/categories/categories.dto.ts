import { ICategory, ICategoryKeyValue } from "./categories.interface";

export class CategoriesDto {
  id: string;
  name: string;
  slug: string;
  description?: string;
  categoryImage: string;
  productCount: number;
  isActive: boolean;
  constructor(props: ICategory) {
    this.id = props._id.toString();
    this.name = props.name;
    this.description = props.description;
    this.slug = props.slug;
    this.categoryImage = props.categoryImage;
    this.productCount = props.productCount ?? 0;
    this.isActive = props.isActive;
  }

  static mapList(categories: ICategory[]): CategoriesDto[] {
    return categories.map((category) => new CategoriesDto(category));
  }

  static keyValueMap(categories: ICategory[]): Array<ICategoryKeyValue> {
    return categories.map((category) => ({
      name: category.name,
      value: category._id.toString(),
    }));
  }
}
