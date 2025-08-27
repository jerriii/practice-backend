import { Star } from "lucide-react";

const RatingFilter = ({ ratings, onRatingChange }: { ratings: number[]; onRatingChange: (ratings: number[]) => void }) => {
    return (
        <div>
            <h4 className="font-medium mb-2">Ratings</h4>
            <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center">
                        <input
                            type="checkbox"
                            id={`rating-${rating}`}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            checked={ratings.includes(rating)}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    onRatingChange([...ratings, rating]);
                                } else {
                                    onRatingChange(ratings.filter(r => r !== rating));
                                }
                            }}
                        />
                        <label
                            htmlFor={`rating-${rating}`}
                            className="ml-2 text-sm text-muted-foreground flex items-center"
                        >
                            {Array.from({ length: rating }).map((_, i) => (
                                <Star
                                    key={i}
                                    className="h-3 w-3 fill-primary text-primary"
                                />
                            ))}
                            {Array.from({ length: 5 - rating }).map((_, i) => (
                                <Star
                                    key={i}
                                    className="h-3 w-3 text-muted-foreground"
                                />
                            ))}
                            <span className="ml-1">& Up</span>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RatingFilter
