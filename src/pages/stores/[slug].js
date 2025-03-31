import Head from 'next/head';
import Coupon from '../../components/coupon';
import "@/styles/store.css";
import moment from 'moment';
import dynamic from "next/dynamic";
import  {useState, useEffect } from 'react'
const RatingBox = dynamic(() => import('@/components/ratingbox'),
    {
        ssr: false,
    });
export default function StorePage({ store }) {
  

  const [activeCouponsType, setActiveCouponsType] = useState("All");

  const totalOffers = store.data.Coupons.length;
  const activeCoupons = store.data.Coupons.filter(
    (coupon) => coupon.coupon_type === "Code"
  ).length;
  const freeShipping = store.data.Coupons.some((coupon) =>
    coupon.Title.toLowerCase().includes("free shipping")
  )
    ? 1
    : 0;
  const bestOffer = store.data.Coupons.reduce((best, coupon) => {
    const match = coupon.Title.match(/(\d+)% Off/);
    const discount = match ? parseInt(match[1], 10) : 0;
    return discount > best.discount ? { text: coupon.Title, discount } : best;
  }, { text: "No Offer", discount: 0 }).text;
  return (
    <>
      <Head>
        <title>{store.data.Title}</title>
        <meta name="description" content={store.data.seo.metaDescription} />
      </Head>

      <section>
        <div className="container">
          <div className="affiDisc">
            <p>savesright may earn a commission when you use coupons on this page. <a href="/affiliate-disclosure">Learn More</a></p>
          </div>
          <div className="breadcrumb">
            <ul>
              <li><a href="/">savesright.com</a> &gt;</li>
              <li>{store.data.Title} coupon code</li>
            </ul>
            <div className="storeCat">
              <a href={`/category/${store.data.store_category.Slug}`}>{store.data.store_category.Title}</a>
            </div>
          </div>
        </div>
      </section>
      <section className='storeContent'>
          <div className="container">
              <div className="couponsection">
                <div className="contentBox">
                  <div className="storeHeader row row-cols-2">
                    <div className="header-content col-8 p-0">
                      <h1>{store.data.store_h1}</h1>
                      <h2 className="dealAvl">8 Coupons &amp; 1 Deal available</h2>
                      <p>Flat 40% OFF at Google Workspace Kow</p>
                    </div>
                    <aside className="col-4">
                      <div className="header-thumb">
                        <div className="header-store-thumb">
                          <a rel="nofollow" target="_blank" title={store.data.Title} href={store.data.affiliate_url}>
                            <img 
                              width="128" 
                              height="128" 
                              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${store.data.store_image.url}`}
                              className="attachment-wpcoupon_small_thumb size-wpcoupon_small_thumb" 
                              alt={`${store.data.Title} Logo`}
                            />
                          </a>
                        </div>
                        <div className="star-rating stars">
                          <RatingBox key={'store_' + store.id} store_id={store.data.id} store_title={store.data.Title} />
                        </div>
                      </div>
                    </aside>
                  </div>
                </div>
              </div>
          </div>
      </section>
     

      <section className="couponSection">
        <div className="container">
          <div className="row">
            <div className="p-0">
              
              <div className="store-listing listCoupns">
              {store.data.Coupons
  .filter(coupon => {
    if (activeCouponsType === 'All') return true;
    if (activeCouponsType === 'Code') return coupon.coupon_type === 'Code';
    if (activeCouponsType === 'Sale') return coupon.coupon_type === 'Sale';
    return true;
  })
  .map((coupon,index) => (
    <Coupon 
      key={coupon.id}
      expiryDate={coupon.expiry_date}
      index={index}
      coupon={coupon}
      storeImage={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${store.data.store_image.url}`}
      storeName={store.data.Title}
      affiliateUrl={store.data.affiliate_url}
      homeUrl={store.data.home_url}
      storeSlug={store.data.Slug}
      storeId={store.data.id}
    />
  ))
}
              </div>
              <div className='testHistory'>
                  <h2 className='sidebarHeading'>{store.data.Title} Coupon Code Test History</h2>
                  <div className="row">
                    <div className="col-md-6 mb-3 p-1 gap-5">
                        <div className='historyItem'>
                            <div className="historyHeader">
                                <span>20% OFF</span>
                                <span className='code'>SCOOP20</span>
                                <span>Tested 1 month ago</span>
                            </div>
                            <div className='historyImg'>
                                <a href="#"><img src="/images/history-img.webp" alt="history" /></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mb-3 p-1">
                        <div className='historyItem'>
                            <div className="historyHeader">
                                <span>20% OFF</span>
                                <span className='code'>SCOOP20</span>
                                <span>Tested 1 month ago</span>
                            </div>
                            <div className='historyImg'>
                                <a href="#"><img src="/images/history-img.webp" alt="history" /></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mb-3 p-1">
                        <div className='historyItem'>
                            <div className="historyHeader">
                                <span>20% OFF</span>
                                <span className='code'>SCOOP20</span>
                                <span>Tested 1 month ago</span>
                            </div>
                            <div className='historyImg'>
                                <a href="#"><img src="/images/history-img.webp" alt="history" /></a>
                            </div>
                        </div>
                    </div>
                  </div>
              </div>
              <div className='about-store'>
                <h4 className="sidebarHeading">About {store.data.Title}</h4>
                <div dangerouslySetInnerHTML={{ __html: store.data.store_description }} />
              </div>
              <div className="faq-section" dangerouslySetInnerHTML={{ __html: store.data.extra_info }}>
              </div>
              <div className="couponOffer summary-container">
                  <h4 class="sidebarHeading">Coupon Summary for {store.data.Title}</h4>
                  <table border="1" cellspacing="0" cellpadding="0">
                      <thead>
                          <tr>
                              <th width="20%">Deal</th>
                              <th width="60%">Title</th>
                              <th width="20%">Coupon</th>
                          </tr>
                      </thead>
                      <tbody>
                      {store.data.Coupons.map((coupon) => {
      const dealMatch = coupon.Title.match(/(\d+% Off)/);
      const dealText = dealMatch ? dealMatch[0] : "Special Offer";
      return (
        <tr key={coupon.id} className="border">
          <td className="p-2 border">{dealText}</td>
          <td className="p-2 border">{coupon.Title}</td>
          <td className="p-2 border">
            {coupon.coupon_code ? (
              <span className="bg-blue-500 text-white px-2 py-1 rounded">
                {coupon.coupon_code}
              </span>
            ) : (
              <span className="text-red-500">Hot Deal 🔥</span>
            )}
          </td>
        </tr>
      );
    })}
                      </tbody>
                  </table>
              </div>
              <div className='relatedStr'>
                <h4 className="sidebarHeading">Related Store</h4>
                <div className="topStore mb-4">
                    <ul>
                        <li><a href="/taketoys.hk">Take Toys HK</a></li>
                        <li><a href="/smbsm-coupons">SMBSM</a></li>
                        <li><a href="/dakimakurastore-coupons">Dakimakura Store</a></li>
                        <li><a href="/histipp-coupons">His Tipp</a></li>
                    </ul>
                </div>
              </div>
              <section className="whyTrustus">
                <div className="container">
                  <div className="row justify-content-center">
                      <h2>Why Trust Us?</h2>
                      <div className="row">
                          <div className="col-md-6">
                            <div className="founder">
                              <div className="img">
                                <img src="/images/founder-2.webp" height="60" width="60" alt="founder" />
                              </div>
                              <div className="name">
                                  <p>Shivam Dubey CA <a href="https://www.linkedin.com/in/ca-shivam-dubey-7a8a65261/?originalSubdomain=in" target="_blank" title="Connect on LinkedIn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="24" height="24" fill="#0077B5"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path></svg></a></p>
                                  <span>Founder &amp; CEO charteredone</span>
                              </div>
                            </div>
                            <div className="founderNote">
                              <p>
                                Over 10,000 businesses have trusted us to handle their registration and compliance needs, ensuring they operate smoothly and in accordance with Indian laws and regulations. For over six years, we’ve been committed to making the process of starting and managing a business straightforward and transparent. Your trust is our top priority.
                              </p>
                              <p>
                                Our platform is built and maintained by a team of Chartered Accountants and compliance experts, combining the latest technology with our extensive knowledge of Indian business regulations. Every day, we help businesses register, file taxes, and maintain compliance with local and national laws.
                              </p>
                              <p>
                                We understand the frustration of dealing with legal paperwork and complex regulatory requirements, and we’re dedicated to providing accurate and reliable services. We ensure your business stays compliant with the latest laws, so you can focus on growing your business. We are fully transparent about our services and fees, making sure you know exactly how we help and what you’re paying for.
                              </p>
                            </div>
                          </div>
                          <div className="col-md-6">
                        <div className="ourExpert">
                          <h3>Meet CharteredOne Experts</h3>   
                          <div className="expertPara">
                            <p>
                              We put significant effort into keeping our platform updated with the latest regulations. Our team regularly reviews and verifies compliance updates, and we rely on feedback from clients like you to continuously improve our services. 
                            </p>
                            <p>
                              If you notice anything that isn’t right, you can report the issue to us, and we’ll address it promptly.
                            </p>
                          
                          </div> 
                          <div className="listExpert">
                              <ul>
                                  <li>
                                      <small> <img src="/images/co-founder.webp" alt="expert" height="30" width="30" /> Rudersh Dubey</small> <span className="exp">6 Years Experience</span>
                                  </li>
                                  <li>
                                    <small> <img src="/images/lawyer.webp" alt="expert" height="30" width="30" />Pankaj Upadhyay</small> <span className="exp">15 Years Experience</span>
                                  </li>
                                  <li>
                                    <small> <img src="/images/lawyer-1.webp" alt="expert" height="30" width="30" />Prince Mishra</small> <span className="exp">8 Years Experience</span>
                                  </li>
                                  <li>
                                    <small> <img src="/images/ca-amir.webp" alt="expert" height="30" width="30" /> Amir Ihsan</small> <span className="exp">3 Years Experience</span>
                                  </li>
                                  <li>
                                    <small> <img src="/images/hr.webp" alt="expert" height="30" width="30" /> Manish Tripathi</small> <span className="exp">5 Years Experience</span>
                                  </li>
                              </ul>
                          </div>                
                        </div>
                          </div>
                      </div>
                  </div>
                </div>
              </section>
              <div className="offerToday">
                  <h4 className='sidebarHeading'>Today's Offer for {store.data.Title}</h4>
                  <table>
                      <tbody>
                      <tr>
    <td className="p-2">🛍️ Total Offers</td>
    <td className="p-2 text-right font-medium">{totalOffers}</td>
  </tr>
  <tr>
    <td className="p-2">🏷️ Active Coupon Codes</td>
    <td className="p-2 text-right font-medium">{activeCoupons}</td>
  </tr>
  <tr>
    <td className="p-2">🛒 Free Shipping</td>
    <td className="p-2 text-right font-medium">{freeShipping}</td>
  </tr>
  <tr>
    <td className="p-2">🔥 Best Offer</td>
    <td className="p-2 text-right font-medium">{bestOffer}</td>
  </tr>
                      </tbody>
                  </table>
              </div>
            </div>
          </div>
        </div>
                 
      </section>
    </>
  );
}

export async function getStaticPaths() {
  const res = await fetch('https://admin.savesright.com/api/stores');
  const stores = await res.json();

  const paths = stores.data.map(store => ({
    params: { slug: store.Slug },
  }));

  return { paths, fallback: "blocking" };
}


export async function getStaticProps({ params }) {
  // 1. Fetch the current store by slug
  const storeRes = await fetch(
    `https://admin.savesright.com/api/stores/${params.slug}`
  );
  const storeData = await storeRes.json();
  const store = storeData.data // Get the first (and only) store matching the slug

  // 2. If store exists, fetch related stores from the same category
  var relatedStores = [];
  if (store && store.store_category) {
    const categoryId = store.store_category.id;
    const relatedRes = await fetch(
      `https://admin.savesright.com/api/stores?filters[store_category][id][$eq]=${categoryId}&fields[0]=Title&fields[1]=Slug&pagination[limit]=4&filters[Slug][$not]=${params.slug}`
    );
    const relatedData = await relatedRes.json();
    relatedStores = relatedData.data.map(store => ({
      Title: store.Title,
      Slug: store.Slug
    }));
  }

    // 3. Process the store data with your replacement logic
    if (store) {
      // Get related store links (limit to 2, exclude current store)
      const store_names = relatedStores
        .filter(f => f.id !== store.id)
        .slice(0, 2)
        .map(item => `<a href="/${item.Slug}">${item.Title}</a>`);
  
      // Get first coupon code (if exists)
      const firstCouponCode = store.Coupons?.filter(x => x.coupon_type === 'Code')[0]?.coupon_code || "";
      const firstCouponTitle = store.Coupons?.[0]?.Title || "";
  
      // Process store description
      if (store.store_description) {
        storeData.data.store_description = store.store_description
          .replaceAll("%%storename%%", store.Title)
          .replaceAll("%pe­rcentage% off", firstCouponTitle)
          .replaceAll("%percentage% off", firstCouponTitle)
          .replaceAll("%pe­rcentage% Off", firstCouponTitle)
          .replaceAll("%percentage% Off", firstCouponTitle)
          .replaceAll("%pe­rcentage% OFF", firstCouponTitle)
          .replaceAll("%percentage% OFF", firstCouponTitle)
          .replaceAll("%pe­rcentage%", firstCouponTitle)
          .replaceAll("%percentage%", firstCouponTitle)
          .replace(/XXX/g, firstCouponCode)
          .replace(/XX/g, store.Coupons?.length || 0)
          .replaceAll("%%currentmonth%%", moment().format('MMMM'))
          .replaceAll("%%curre­ntmonth%%", moment().format('MMMM'))
          .replaceAll("%%currentyear%%", moment().format('YYYY'))
          .replaceAll("currentyear%%", moment().format('YYYY'))
          .replaceAll(
            /%%categorystore%% and %%categorystore%%|%categorystore%, %categorystore%, and %categorystore%|%categorystore%, %categorystore%|%categorystore% and %categorystore%|%%categorystore%%, %%categorystore%%|%categorystore%, %categorystore%, %categorystore%|%categorystore% %categorystore%, %categorystore%|%categorystore% %categorystore% %categorystore%|%categorystore% %categorystore% and %categorystore%/gi, 
            store_names.join(", ")
          );
      }
  
      // Process extra info
      if (store.extra_info) {
        storeData.data.extra_info = store.extra_info
          .replace(/XXX/g, firstCouponCode)
          .replace(/XX/g, store.Coupons?.length || 0);
      }
  
      if (store.store_h1) {
        storeData.data.store_h1 = store.store_h1
          .replace(/Storename/g, store.Title)
          .replace(/XXX/g, firstCouponCode)
          .replace(/CouponCount/g, store.Coupons?.length)
          .replace(/%percentage%/g, firstCouponTitle)
          .replace(/%%Year%%/g, moment().format('YYYY'))
          .replace(/\d{4}/, moment().format('YYYY')); // Replace any 4-digit year
      }
  
      // Process SEO metaTitle
      if (store.seo?.metaTitle) {
        storeData.data.seo.metaTitle = store.seo.metaTitle
          .replace(/Storename/g, store.Title)
          .replace(/XXX/g, firstCouponCode)
          .replace(/CouponCount/g, store.Coupons?.length)
          .replace(/%percentage%/g, firstCouponTitle)
          .replace(/%%Year%%/g, moment().format('YYYY'))
          .replace(/\d{4}/, moment().format('YYYY')); // Replace any 4-digit year
      }
  
    
    }
  return {
    props: {
      store: storeData || null
    },
  };
}