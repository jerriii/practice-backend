class ProductServices {
    private readonly baseUrl:string;
    constructor() {
        this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
    }
    static getProductsBySlugAndQueryEndpoint(slug:string, page = 1, limit = 8, queryString:string): string {
        return `/products/${slug}?page=${page}&limit=${limit}&${queryString}`;
    }
    getProductsBySlugAndQuery = async <T>(slug:string, page = 1, limit = 8, queryString:string):Promise<T> => {
        const url = `${this.baseUrl}${ProductServices.getProductsBySlugAndQueryEndpoint(slug, page, limit, queryString)}`;
        const response = await fetch(url);
        return response.json();
    }
}

export default new ProductServices();