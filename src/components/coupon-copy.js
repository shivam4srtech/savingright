 <div className="coupon-item has-thumb store-listing-item c-type-code coupon-listing-item shadow-box coupon-live">
      <div className="coupon-l-box">
        <div className="store-thumb-link">
          <div className="store-thumb thumb-img">
            <span className="thumb-padding">
              <img
                width="128"
                height="128"
                src={storeImage}
                className="attachment-wpcoupon_medium-thumb size-wpcoupon_medium-thumb"
                alt={storeName}
              />
            </span>
          </div>
          <div className="c-type">
            <span className={coupon.coupon_type === 'Code' ? 'c-code' : 'c-sale'}>
              {coupon.coupon_type === 'Code' ? 'Code' : 'Deal'}
            </span>
          </div>
        </div>

        <div className="coupon-l-body">
          <div className="latest-coupon">
            <h3 className="coupon-title">
              <a title={coupon.Title} rel="nofollow" className="coupon-link" href={affiliateUrl}>
                {coupon.Title}
              </a>
            </h3>
            <div className="coupon-des">
              <p>
                {coupon.Content}
              </p>
            </div>
            {coupon.term_condition != "" &&
              <a className="showTncBox tnc" data-bs-toggle="collapse" data-bs-target={`#${collapseId}`} href="javascript:void(0)" title="Show T &amp; C">Terms &amp; Conditions</a>
            }
          </div>

          <div className="coupon-detail coupon-button-type">
            {coupon.coupon_type === 'Code' ? (
              <a rel="nofollow" onClick={async (e) => {
                await  trackCouponUsage(coupon.id);
                // Set the copied_code in localStorage (no need to await as it's synchronous)
                localStorage.setItem('copied_code', coupon.id);

                // Copy the coupon code to the clipboard
                navigator.clipboard.writeText(coupon.coupon_code).then(() => {
                  //                                        console.log("Coupon code copied to clipboard");
                }).catch((error) => {
                  console.error("Error copying to clipboard: ", error);
                });

                // Open the store's page in a new tab
                window.open(`/stores/${storeSlug}/#c=${coupon.id}`, "_blank");

                // Log the affiliate URL

                // Open the affiliate URL in the same window after a short delay (to ensure proper sequence)
                 setTimeout(() => {
                  window.open(affiliateUrl, "_self");
                 }, 100);  // Delay added to ensure actions don't overlap

              }}
                data-type="code"
                className="coupon-code coupon-button"
                href="javscript:void()">
                <span className="code-text" rel="nofollow">{coupon.coupon_code}</span>
              </a>
            ) : (
              <a rel="nofollow" href="javascript:void(0)" className="coupon-deal coupon-button" onClick={async (e) => {
                await  trackCouponUsage();
                await localStorage.setItem('copied_code', coupon.id)
                window.open(`/${storeSlug}`, "_blank");
                setTimeout(() => {
                  window.open(affiliateUrl, "_self");
                }, 100);
              }}>
                Get Deal <i className="shop icon"></i>
              </a>
            )}

            <div className="user-ratting">
              <div className="coupon-vote" data-tooltip="This worked">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                </svg>
              </div>
              <div className="coupon-vote" data-tooltip="This worked">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM174.6 384.1c-4.5 12.5-18.2 18.9-30.7 14.4s-18.9-18.2-14.4-30.7C146.9 319.4 198.9 288 256 288s109.1 31.4 126.6 79.9c4.5 12.5-2 26.2-14.4 30.7s-26.2-2-30.7-14.4C328.2 358.5 297.2 336 256 336s-72.2 22.5-81.4 48.1zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                </svg>
              </div>
              <div className="coupon-vote" data-tooltip="This worked">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" />
                </svg>
              </div>
            </div>
            <span className="voted-value">100% Success</span>
          </div>
        </div>
      </div>

      <div className="showbox coupon-listing-footer">
      <span className="lastUsed">
  {coupon.last_used_at && !isNaN(coupon.last_used_at) 
    ? `Last used ${formatDistanceToNow(new Date(Number(coupon.last_used_at)), { addSuffix: true })}`
    : ''}
</span>

        <div className="c-type">
          <span className="exp"> {expiryDate == null ? 'No Expires' : expiryDate}</span>
        </div>
        <a title="This coupon is verified" href="#" className="verifiedCoupon">
          <img src="/images/verified-green-icon.png" width="14" height="14" alt="verified" />
          <span>Verified Coupon</span>
        </a>
      </div>
      {coupon.term_condition != "" &&
        <div id={accordionId} className="accordion">
          <div id={collapseId} className="collapse" aria-labelledby={`heading-${index}`} data-bs-parent={`#${accordionId}`}>
            <div className="card-body">
              <div className="tNcBox">
                <div dangerouslySetInnerHTML={{ __html: coupon.term_condition }} />
              </div>
            </div>
          </div>
        </div>
      }
        <>
                {modalOpen && coupon.coupon_type === "Code" && (
                    <div
                        className="modal fade"
                        id={`getCode${coupon.id}`}
                        tabIndex={-1}
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header" style={{ justifyContent: "space-between" }}>
                                    <h5 className="modal-title" id="exampleModalLabel">
                                        {coupon.title}
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                        onClick={() => setModalOpen(false)}
                                    />
                                </div>
                                <div className="modal-body text-center">
                                    <div className="modal-store-logo">
                                        <a href={affiliateUrl || "#"}>
                                            <img src={storeImage} alt={storeName || "Store"} />
                                        </a>
                                    </div>
                                    <div className="modalCode">
                                        <span>{coupon.coupon_code}</span>
                                    </div>
                                    <div
                                        className="codeCopyBtn"
                                        onClick={() => {
                                            navigator.clipboard.writeText(coupon.coupon_code);
                                            setCopyText("Copied");
                                        }}
                                    >
                                        <button>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={16}
                                                height={16}
                                                fill="currentColor"
                                                className="bi bi-scissors"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M3.5 3.5c-.614-.884-.074-1.962.858-2.5L8 7.226 11.642 1c.932.538 1.472 1.616.858 2.5L8.81 8.61l1.556 2.661a2.5 2.5 0 1 1-.794.637L8 9.73l-1.572 2.177a2.5 2.5 0 1 1-.794-.637L7.19 8.61zm2.5 10a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0m7 0a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0" />
                                            </svg>
                                            {copytext}
                                        </button>
                                    </div>
                                    <div className="storeBtn">
                                        <a href={affiliateUrl || "#"}>
                                            Visit at {homeUrl || "Store"}
                                        </a>
                                    </div>
                                    <div className="isWorked">
                                        <h4>Did this worked?</h4>
                                        <div className="workedbtn">
                                            <a href="javascript:void(0)" onClick={() => setModalOpen(false)}
                                                className="btnVote">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 512 512"
                                                    fill="#0ee032"
                                                    width={16}
                                                    height={16}
                                                >
                                                    <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" />
                                                </svg>
                                                Yes
                                            </a>
                                            <a href="javascript:void(0)" onClick={() => setModalOpen(false)}
                                                className="btnVote">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 512 512"
                                                    fill="#ff5f71"
                                                    width={16}
                                                    height={16}
                                                >
                                                    <path d="M313.4 479.1c26-5.2 42.9-30.5 37.7-56.5l-2.3-11.4c-5.3-26.7-15.1-52.1-28.8-75.2H464c26.5 0 48-21.5 48-48c0-18.5-10.5-34.6-25.9-42.6C497 236.6 504 223.1 504 208c0-23.4-16.8-42.9-38.9-47.1c4.4-7.3 6.9-15.8 6.9-24.9c0-21.3-13.9-39.4-33.1-45.6c.7-3.3 1.1-6.8 1.1-10.4c0-26.5-21.5-48-48-48H294.5c-19 0-37.5 5.6-53.3 16.1L202.7 73.8C176 91.6 160 121.6 160 153.7V192v48 24.9c0 29.2 13.3 56.7 36 75l7.4 5.9c26.5 21.2 44.6 51 51.2 84.2l2.3 11.4c5.2 26 30.5 42.9 56.5 37.7zM32 384H96c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H32C14.3 96 0 110.3 0 128V352c0 17.7 14.3 32 32 32z" />
                                                </svg>
                                                No
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer"></div>
                            </div>
                        </div>
                    </div>
                )}
            </>
            {/**********************************Coupon Pop-Up GET-deal Modal*********************************************** */}
            <>
                {(coupon.coupon_type == "Sale" && modalOpen) &&
                    <div
                        className="modal fade"
                        id={`getDeal${coupon.id}`}
                        tabIndex={-1}
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content" >
                                <div className="modal-header" style={{ justifyContent: "space-between" }}>
                                    <h5 className="modal-title" id="exampleModalLabel">
                                        {coupon.title}
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    />
                                </div>
                                <div className="modal-body text-center">
                                    <div className="modal-store-logo">
                                        <a href="#00">
                                            <img
                                                src={`${storeImage}`}
                                                alt=""
                                            />
                                        </a>
                                    </div>
                                    <div className="modalCode d-flex align-items-center justify-content-center">
                                        <span>
                                            Deal Activated{" "}
                                            <svg
                                                height={25}
                                                width={25}
                                                fill="#0ee032"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 512 512"
                                            >
                                                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                                            </svg>
                                        </span>
                                    </div>
                                    <div className="storeBtn">
                                        <a href={`${affiliateUrl}`}>
                                            Redeem at {homeUrl}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={16}
                                                height={16}
                                                fill="currentColor"
                                                className="bi bi-chevron-double-right"
                                                viewBox="0 0 16 16"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708"
                                                />
                                                <path
                                                    fillRule="evenodd"
                                                    d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708"
                                                />
                                            </svg>
                                        </a>
                                    </div>
                                    <div className="isWorked">
                                        <h4>Did this worked?</h4>
                                        <div className="workedbtn">
                                            <a href="javascript:void(0)" onClick={() => setModalOpen(false)}
                                                className="btnVote">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 512 512"
                                                    fill="#0ee032"
                                                    width={16}
                                                    height={16}
                                                >
                                                    <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" />
                                                </svg>
                                                Yes
                                            </a>
                                            <a href="javascript:void(0)" onClick={() => setModalOpen(false)}
                                                className="btnVote">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 512 512"
                                                    fill="#ff5f71"
                                                    width={16}
                                                    height={16}
                                                >
                                                    <path d="M313.4 479.1c26-5.2 42.9-30.5 37.7-56.5l-2.3-11.4c-5.3-26.7-15.1-52.1-28.8-75.2H464c26.5 0 48-21.5 48-48c0-18.5-10.5-34.6-25.9-42.6C497 236.6 504 223.1 504 208c0-23.4-16.8-42.9-38.9-47.1c4.4-7.3 6.9-15.8 6.9-24.9c0-21.3-13.9-39.4-33.1-45.6c.7-3.3 1.1-6.8 1.1-10.4c0-26.5-21.5-48-48-48H294.5c-19 0-37.5 5.6-53.3 16.1L202.7 73.8C176 91.6 160 121.6 160 153.7V192v48 24.9c0 29.2 13.3 56.7 36 75l7.4 5.9c26.5 21.2 44.6 51 51.2 84.2l2.3 11.4c5.2 26 30.5 42.9 56.5 37.7zM32 384H96c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H32C14.3 96 0 110.3 0 128V352c0 17.7 14.3 32 32 32z" />
                                                </svg>
                                                No
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer"></div>
                            </div>
                        </div>
                    </div>
                }
            </>
    </div>
