import { useState, useEffect } from 'react';
import { Rating } from 'react-simple-star-rating';

export default function RatingBox({ store_id,store_title }) {
  const [ratingData, setRatingData] = useState({
    average: 0,
    count: 0,
    distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  });
  const [userRating, setUserRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Load initial rating data and user's previous rating
  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await fetch(`https://admin.savesright.com/api/stores/${store_id}/ratings`);
        const data = await response.json();
        console.log(data)
        if (!data.error) {
          setRatingData({
            average: data.average || 0,
            count: data.count || 0,
            distribution: data.distribution || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
          });
        }
      } catch (error) {
        console.error('Error fetching ratings:', error);
      }
    };

    fetchRatings();

    // Check if user already rated
    if (typeof window !== 'undefined') {
      const savedRating = localStorage.getItem(`${store_id}_rating`);
      if (savedRating) {
        setUserRating(Number(savedRating));
        setHasRated(true);
      }
    }
  }, [store_id]);

  const handleRating = (rate) => {
    if (!hasRated) {
      setUserRating(rate);
    }
  };

  const handleSubmit = async () => {
    if (userRating === 0) {
      alert("Please select a rating first!");
      return;
    }
  
    try {
      const response = await fetch('/api/ratings/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          storeId: store_id,
          rating: userRating
        })
      });
  
      const result = await response.json();
  
      if (result.success) {
        // Update local state
        const newDistribution = { ...ratingData.distribution };
        newDistribution[userRating] += 1;
        
        const newCount = ratingData.count + 1;
        const newAverage = (
          (parseFloat(ratingData.average) * ratingData.count + userRating) / 
          newCount
        ).toFixed(1);
  
        setRatingData({
          average: newAverage,
          count: newCount,
          distribution: newDistribution
        });
  
        localStorage.setItem(`${store_id}_rating`, userRating.toString());
        setHasRated(true);
        
        const modal = bootstrap.Modal.getInstance(document.getElementById('giveRating'));
        modal?.hide();
        setModalOpen(false);
      }
    } catch (error) {
      console.error("Rating submission failed:", error);
    }
  };

  const openRatingModal = async () => {
    await setModalOpen(true);
    new bootstrap.Modal(document.getElementById('giveRating')).show();
  };

  const closeRatingModal = async () => {
  await  setModalOpen(false);
    if (!hasRated) setUserRating(0);
  };

  return (
    <>
      <div className="stars" onClick={openRatingModal}>
        <Rating
          readonly={true}
          size={20}
          initialValue={Number(ratingData.average)}
          transition={true}
          allowFraction={true}
        />
      </div>
      <div className="ratings">
        <p>
          {ratingData.average} <span>({ratingData.count} Ratings)</span>
        </p>
        <button className="rate-btn"  onClick={openRatingModal}>Rate this store</button>
      </div>

      {modalOpen && (
        <div className="modal fade" id="giveRating" tabIndex={-1} aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header" style={{ justifyContent: "space-between" }}>
                <h5 className="modal-title">
                  {hasRated ? "Thanks For Your Rating!" : `Rate ${store_title}`}
                </h5>
                <button
                  type="button"
                  className="btn btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={closeRatingModal}
                />
              </div>
              <div className="modal-body text-center">
                <Rating
                  readonly={hasRated}
                  size={35}
                  onClick={handleRating}
                  initialValue={userRating}
                  transition={true}
                  allowFraction={false}
                />
                <div className="storeBtn">
                  {!hasRated && (
                    <button className="btn btn-primary" onClick={handleSubmit}>
                      Submit
                    </button>
                  )}
                  <button 
                    className="btn btn-secondary" 
                    data-bs-dismiss="modal"
                    onClick={closeRatingModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}