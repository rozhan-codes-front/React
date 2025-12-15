export default function StarRating({ value }) {
    const fullStars = Math.floor(value);
    const hasHalf = value - fullStars >= 0.5;

    return (
        <div className="flex gap-0.5 text-[#ce5316]">
            {Array.from({ length: fullStars }).map((_, index) => (
                <span key={`full-${index}`} className="material-icons">
          star
        </span>
            ))}
            {hasHalf && (
                <span className="material-icons" key="half">
          star_half
        </span>
            )}
        </div>
    );
}