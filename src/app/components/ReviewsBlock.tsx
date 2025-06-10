"use client";

import DOMPurify from "isomorphic-dompurify";

import { Review } from "../types/types";

interface ReviewsBlockProps {
  reviews: Review[];
}


export default function ReviewsBlock({ reviews }: ReviewsBlockProps) {
  return (
    <section className="reviews-block">
      <div className="reviews-list">
        {reviews.length > 0 ? (
          reviews.map((review: Review) => (
            <div
              key={review.id}
              className="review"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(review.text),
              }}
            />
          ))
        ) : (
          <p className="review-loader">Отзывы пока не загружены.</p>
        )}
      </div>
    </section>
  );
}
