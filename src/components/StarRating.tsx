import { Star } from "lucide-react";
import { useState } from "react";

interface StarRatingProps {
  initialRating?: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
}

export function StarRating({ initialRating = 0, onRatingChange, readonly = false }: StarRatingProps) {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (value: number) => {
    if (readonly) return;
    setRating(value);
    onRatingChange?.(value);
  };

  const currentRating = hoverRating || rating;

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          type="button"
          onClick={() => handleClick(value)}
          onMouseEnter={() => !readonly && setHoverRating(value)}
          onMouseLeave={() => !readonly && setHoverRating(0)}
          disabled={readonly}
          className={`transition-all ${!readonly && 'hover:scale-110 cursor-pointer'} ${readonly ? 'cursor-default' : ''}`}
        >
          <Star
            className="h-5 w-5 transition-colors"
            fill={value <= currentRating ? '#fbbf24' : 'none'}
            stroke={value <= currentRating ? '#f59e0b' : '#d1d5db'}
            strokeWidth={2}
          />
        </button>
      ))}
    </div>
  );
}
