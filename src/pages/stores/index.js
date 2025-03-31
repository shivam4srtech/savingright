import { useState, useEffect } from "react";
import Link from "next/link";
import "@/styles/a-z.css";
import { NextSeo } from "next-seo";

export default function Stores({ allStores }) {
  const [groupedStores, setGroupedStores] = useState({});
  const [pageNumbers, setPageNumbers] = useState({});
  const [displayedStores, setDisplayedStores] = useState({});
  const [hasMore, setHasMore] = useState({});
  const itemsPerPage = 10; // Number of stores to show per letter before "Load More"

  const alphabets = ["0-9", ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i))];

  // Initialize data structures on component mount
  useEffect(() => {
    const groups = {};
    const initialPageNumbers = {};
    const initialDisplayedStores = {};
    const initialHasMore = {};

    // Initialize for all letters
    alphabets.forEach(letter => {
      groups[letter] = [];
      initialPageNumbers[letter] = 1;
      initialDisplayedStores[letter] = [];
      initialHasMore[letter] = false;
    });

    // Group stores by first letter
    allStores.forEach(store => {
      const firstChar = store.Title.charAt(0).toLowerCase();
      const letter = /[a-z]/.test(firstChar) ? firstChar : "0-9";
      groups[letter]?.push(store);
    });

    // Set initial displayed stores and hasMore state
    alphabets.forEach(letter => {
      initialDisplayedStores[letter] = groups[letter]?.slice(0, itemsPerPage) || [];
      initialHasMore[letter] = (groups[letter]?.length || 0) > itemsPerPage;
    });

    setGroupedStores(groups);
    setPageNumbers(initialPageNumbers);
    setDisplayedStores(initialDisplayedStores);
    setHasMore(initialHasMore);
  }, [allStores]);

  const handleLoadMore = (letter) => {
    if (!hasMore[letter]) return;

    const nextPage = pageNumbers[letter] + 1;
    const startIndex = (nextPage - 1) * itemsPerPage;
    const newStores = groupedStores[letter]?.slice(startIndex, startIndex + itemsPerPage) || [];
    
    setDisplayedStores(prev => ({
      ...prev,
      [letter]: [...prev[letter], ...newStores]
    }));

    setPageNumbers(prev => ({
      ...prev,
      [letter]: nextPage
    }));

    setHasMore(prev => ({
      ...prev,
      [letter]: (groupedStores[letter]?.length || 0) > (nextPage * itemsPerPage)
    }));
  };

  const calculateCoupons = (store) => {
    if (!store.Coupons || !Array.isArray(store.Coupons)) return "";
  
    const deals = store.Coupons.filter(coupon => coupon.coupon_type === "Sale").length;
    const codes = store.Coupons.filter(coupon => coupon.coupon_code && coupon.coupon_code.trim() !== "").length;
  
    let result = [];
    if (deals > 0) result.push(`${deals} deal${deals > 1 ? 's' : ''}`);
    if (codes > 0) result.push(`${codes} code${codes > 1 ? 's' : ''}`);
  
    return result.join(" & ");
  };

  return (
    <>
      <NextSeo
        title="All Stores for 2025"
        description="Here you will find the latest coupon codes and deals for top brands. Get huge discounts on everyday essentials and luxury items with our updated promo codes. We ensure you get the best discount codes for online shopping! "
      />
      <section className="allStorePage">
        <div className="container">
          <div className="storeBox">
            <div className="alpha-store">
              <h1 className="text-center">All Stores</h1>
              <div>
                <p className="all_list">
                  {alphabets.map((c) => (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        const target = document.querySelector(`#alpha${c.toUpperCase()}`);
                        if (target) {
                          window.scrollTo({
                            top: target.offsetTop - 30,
                            behavior: "smooth",
                          });
                        }
                      }}
                      className="getStore"
                      aria-label={`Scroll to ${c.toUpperCase()} section`}
                      key={c}
                    >
                      {c.toUpperCase()}
                    </button>
                  ))}
                </p>
              </div>

              {alphabets.map((c) => (
                <div className="storeList" id={`alpha${c.toUpperCase()}`} key={c}>
                  {displayedStores[c]?.length > 0 ? (
                    <>
                      <ul>
                        {displayedStores[c].map((store) => (
                          <li key={store.id}>
                            <Link href={`/stores/${store.Slug}`}>
                              {store.Title}
                              <span>{calculateCoupons(store)}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      {hasMore[c] && (
                        <div className="loadMoreCoupon text-center">
                          <button
                            onClick={() => handleLoadMore(c)}
                            className="load-more-btn"
                          >
                            Load More
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="no-data-message" style={{ textAlign: "center" }}>
                      No stores available for {c.toUpperCase()}.
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  try {
    // Fetch all stores at once (no pagination)
    const response = await fetch(
      'https://admin.savesright.com/api/stores?fields[0]=Title&fields[1]=Slug&populate[Coupons]=*&pagination[pageSize]=4000' // Adjust pageSize as needed
    );
    const { data } = await response.json();

    return {
      props: {
        allStores: data || [],
      },
      revalidate: 60 * 60, // Revalidate every hour
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        allStores: [],
      },
      revalidate: 60 , // Revalidate every hour even if error
    };
  }
}