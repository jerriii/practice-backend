import { NamedEntity } from "@/types";

interface BrandFilterProps {
    brands: NamedEntity[];
    selectedBrands: NamedEntity[];
    onBrandChange: (brands: NamedEntity[]) => void;
}

const BrandFilter = ({ brands, selectedBrands, onBrandChange }: BrandFilterProps) => {
    return (
        <div>
            <h4 className="font-medium mb-2">Brand</h4>
            <div className="space-y-2">
                {brands.map((brand) => {
                    const isChecked = selectedBrands.some(selected => selected.id === brand.id);
                    return (
                        <div key={brand.id} className="flex items-center">
                            <input
                                type="checkbox"
                                id={`brand-${brand.id}`}
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                checked={isChecked}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        onBrandChange([...selectedBrands, brand]);
                                    } else {
                                        onBrandChange(selectedBrands.filter(b => b.id !== brand.id));
                                    }
                                }}
                            />
                            <label
                                htmlFor={`brand-${brand.id}`}
                                className="ml-2 text-sm text-muted-foreground"
                            >
                                {brand.name}
                            </label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default BrandFilter;
