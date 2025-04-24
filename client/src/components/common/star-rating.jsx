import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

function StarRatingComponent({ rating, handleRatingChange }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = star <= rating;

        return (
          <Button
            key={star}
            onClick={handleRatingChange ? () => handleRatingChange(star) : undefined}
            variant="outline"
            size="icon"
            className={`p-2 rounded-full transition-all duration-200 border 
              ${isActive ? "hover:bg-green-100" : "hover:bg-green-100"}
              ${isActive ? "text-white" : "text-yellow-500"}
            `}
          >
            <StarIcon
              className={`w-5 h-5 transition-colors duration-200 
                ${isActive ? "fill-yellow-500 text-yellow-500" : " text-yellow-500"}
              `}
            />
          </Button>
        );
      })}
    </div>
  );
}

export default StarRatingComponent;
