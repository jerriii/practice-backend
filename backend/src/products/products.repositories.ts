import Product from "./products.model";
import { IProduct } from "./products.interface";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { NotFoundError } from "../error";

export class ProductRepository {
  async create(productData: IProduct): Promise<IProduct> {
    try {
      const product = new Product(productData);
      return await product.save();
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      if (error instanceof Error) {
        throw new Error(`Failed to delete product: ${error.message}`);
      }
      throw new Error(`Failed to delete product: ${String(error)}`);
    }
  }

  async findById(
    id: string,
    options: { lean?: boolean } = { lean: false }
  ): Promise<IProduct | null> {
    const query = Product.findById(id);
    if (options.lean) query.lean();

    const product = await query.exec();
    return product;
  }

  async findAll(
    filter: FilterQuery<IProduct> = {},
    options: {
      skip?: number;
      limit?: number;
      sort?: Record<string, 1 | -1>;
      lean?: boolean;
    } = {}
  ): Promise<IProduct[]> {
    const { skip = 0, limit = 0, sort = {}, lean = false } = options;

    const query = Product.find(filter).skip(skip).limit(limit).sort(sort);

    if (lean) query.lean();

    return await query.exec();
  }

  async updateById(
    id: string,
    update: UpdateQuery<IProduct>,
    options: QueryOptions = { new: true }
  ): Promise<IProduct | null> {
    try {
      const updated = await Product.findByIdAndUpdate(
        id,
        update,
        options
      ).exec();
      if (!updated) {
        throw new NotFoundError(`Product with id ${id} not found`);
      }
      return updated;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      if (error instanceof Error) {
        throw new Error(`Failed to delete product: ${error.message}`);
      }
      throw new Error(`Failed to delete product: ${String(error)}`);
    }
  }

  async deleteById(id: string): Promise<IProduct | null> {
    try {
      const deleted = await Product.findByIdAndDelete(id).exec();
      if (!deleted) {
        throw new NotFoundError(`Product not found`);
      }
      return deleted;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      if (error instanceof Error) {
        throw new Error(`Failed to delete product: ${error.message}`);
      }
      throw new Error(`Failed to delete product: ${String(error)}`);
    }
  }

  // Additional useful methods you might consider:
  async count(filter: FilterQuery<IProduct> = {}): Promise<number> {
    return await Product.countDocuments(filter).exec();
  }

  async exists(filter: FilterQuery<IProduct>): Promise<boolean> {
    const count = await Product.countDocuments(filter).exec();
    return count > 0;
  }
}
