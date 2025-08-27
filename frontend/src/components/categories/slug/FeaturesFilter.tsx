import { NamedEntity } from "@/types";

interface FeaturesFilterProps {
    features: NamedEntity[];
    selectedFeatures: NamedEntity[];
    onFeaturesChange: (features: NamedEntity[]) => void;
}

const FeaturesFilter = ({ features, selectedFeatures, onFeaturesChange }: FeaturesFilterProps) => {
    return (
        <div>
            <h4 className="font-medium mb-2">Features</h4>
            <div className="space-y-2">
                {features.map((feature) => (
                    <div key={feature.id} className="flex items-center">
                        <input
                            type="checkbox"
                            id={`feature-${feature.id}`}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            checked={selectedFeatures.includes(feature)}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    onFeaturesChange([...selectedFeatures, feature]);
                                } else {
                                    onFeaturesChange(selectedFeatures.filter((name) => name.id !== feature.id));
                                }
                            }}
                        />
                        <label
                            htmlFor={`feature-${feature.id}`}
                            className="ml-2 text-sm text-muted-foreground"
                        >
                            {feature.name}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FeaturesFilter
