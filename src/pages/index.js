import { NextSeo } from 'next-seo';
import Image from 'next/image';
import Link from 'next/link';
import "@/styles/home.css";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";


export default function HomePage({ categories,topRatedStores,featuredStores,topOnlineStores }) {
    
    const getHeading = (title) => {
        if (!title) return "";
    
        // Check for percentage discount (e.g., "40% OFF")
        const percentMatch = title.match(/(\d+)%/);
        if (percentMatch) {
            return `${percentMatch[1]}% OFF`;
        }
    
        // Check for dollar discount (e.g., "$40 OFF")
        const dollarMatch = title.match(/\$(\d+)/);
        if (dollarMatch) {
            return `$${dollarMatch[1]} OFF`;
        }
    
        // Check for "Free Shipping"
        if (/free shipping/i.test(title)) {
            return "Free Shipping";
        }
    
        return "";
    };

    return (
        <>
            <NextSeo
                title="SaveRight - Best Coupons & Deals"
                description="Find the best coupons, deals, and discounts for top brands"
            />

            {/* Home Banner Section */}
            {/* Home Banner Section with react-responsive-carousel */}
            <section className='homeImageBanner'>
               <a href="#"> <img src="/images/saving-right-banner.png" alt="#" /></a>
            </section>
            <section className="homeBanner">
                <div className="container">
                    <Carousel
                        showArrows={true}
                        showStatus={false}
                        showThumbs={false}
                        infiniteLoop={true}
                        autoPlay={true}
                        interval={5000}
                        stopOnHover={true}
                        swipeable={true}
                        dynamicHeight={false}
                        emulateTouch={true}
                        className="banner-carousel"
                    >
                        {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                            <div key={num} className="banner-slide">
                                <Link href="#">
                                    <Image
                                        src={`/images/banner-${num}.jpg`}
                                        alt={`Banner ${num}`}
                                        width={1200}
                                        height={400}
                                        className="img-fluid"
                                        priority={num === 1} // Only prioritize first image
                                    />
                                </Link>
                            </div>
                        ))}
                    </Carousel>
                </div>
            </section>

            {/* Explore Categories Section */}
            <section className="container-fluid categories-box">
                <div className="container">
                    <h2>Explore categories</h2>
                    <div className="row">
                        {categories.data.map((category, index) => (
                            <div key={index} className="col-lg-3 col-md-6 col-sm-6 category-item">
                                <div className="category-brand container">
                                    <div className="d-flex justify-content-center align-items-center text-align-center">
                                        <Link href={`category/${category.Slug}`}>
                                            <span>   <Image
                                                width={50}
                                                height={50}
                                                src={category.Image?.url ? process.env.NEXT_PUBLIC_IMAGE_URL + category.Image?.url : "/images/default-placeholder.png"}
                                                alt={category.Title || "Category"}
                                            /></span>
                                            {category.Title}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="more-btn">
                        <Link href="/category" className="btn btn-primary">Explore More</Link>
                    </div>
                </div>
            </section>

            <section className='newCat'>
                <div className="container">
                    <h2 className='secHeading'>Explore Category</h2>
                    <div className="row">
                        <div className="col-lg-2 col-md-6 mb-3">
                            <a className="catItem" href=''>
                                <div className="imageBox">
                                    <img src="./images/pharmacy.png" alt="category" />
                                </div>
                                <div className="catTitle">
                                    Pharmacy
                                </div>
                            </a>
                        </div>
                        <div className="col-lg-2 col-md-6 mb-3">
                            <a className="catItem" href=''>
                                <div className="imageBox">
                                    <img src="./images/pharmacy.png" alt="category" />
                                </div>
                                <div className="catTitle">
                                    Pharmacy
                                </div>
                            </a>
                        </div>
                        <div className="col-lg-2 col-md-6 mb-3">
                            <a className="catItem" href=''>
                                <div className="imageBox">
                                    <img src="./images/pharmacy.png" alt="category" />
                                </div>
                                <div className="catTitle">
                                    Pharmacy
                                </div>
                            </a>
                        </div>
                        <div className="col-lg-2 col-md-6 mb-3">
                            <a className="catItem" href=''>
                                <div className="imageBox">
                                    <img src="./images/pharmacy.png" alt="category" />
                                </div>
                                <div className="catTitle">
                                    Pharmacy
                                </div>
                            </a>
                        </div>
                        <div className="col-lg-2 col-md-6 mb-3">
                            <a className="catItem" href=''>
                                <div className="imageBox">
                                    <img src="./images/pharmacy.png" alt="category" />
                                </div>
                                <div className="catTitle">
                                    Pharmacy
                                </div>
                            </a>
                        </div>
                        <div className="col-lg-2 col-md-6 mb-3">
                            <a className="catItem" href=''>
                                <div className="imageBox">
                                    <img src="./images/pharmacy.png" alt="category" />
                                </div>
                                <div className="catTitle">
                                    Pharmacy
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <section className='pplBrands'>
                <div className="container">
                    <h2 className='secHeading'>Most Popular Brands</h2>
                    <div className="row">
                        <div className="col-lg-3 col-md-6 mb-3">
                            <a className="pplItem" href=''> 
                                <div className="pplImg">
                                    <img src="./images/kiwi.png" alt="kiwi" />
                                </div>
                                <div className='pplTitle'>
                                    Get Rewards and much more
                                </div>
                                <div className='btn'>
                                    UP TO 60% OFF
                                </div>
                            </a>
                        </div>
                        <div className="col-lg-3 col-md-6 mb-3">
                            <a className="pplItem" href=''> 
                                <div className="pplImg">
                                    <img src="./images/kiwi.png" alt="kiwi" />
                                </div>
                                <div className='pplTitle'>
                                    Get Rewards and much more
                                </div>
                                <div className='btn'>
                                    UP TO 60% OFF
                                </div>
                            </a>
                        </div>
                        <div className="col-lg-3 col-md-6 mb-3">
                            <a className="pplItem" href=''> 
                                <div className="pplImg">
                                    <img src="./images/kiwi.png" alt="kiwi" />
                                </div>
                                <div className='pplTitle'>
                                    Get Rewards and much more
                                </div>
                                <div className='btn'>
                                    UP TO 60% OFF
                                </div>
                            </a>
                        </div>
                        <div className="col-lg-3 col-md-6 mb-3">
                            <a className="pplItem" href=''> 
                                <div className="pplImg">
                                    <img src="./images/kiwi.png" alt="kiwi" />
                                </div>
                                <div className='pplTitle'>
                                    Get Rewards and much more
                                </div>
                                <div className='btn'>
                                    UP TO 60% OFF
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <section className='topCouponCode'>
                <div className="container">
                    <h2 className='secHeading'>Today's Top Coupon Codes</h2>
                    <div className="row">
                        <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
                            <a className='codeItem' href=''>
                                <div className='codeHeader'>
                                    Amazon Offer
                                        
                                </div>
                                <div className='codeFooter'>
                                     <div className="imgBox">
                                        <img src="./images/amazon-home.png" alt="" />
                                     </div>
                                     <div className="off">
                                            Up to 10% off
                                      </div>
                                </div>
                            </a>
                        </div>
                        <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
                            <a className='codeItem' href=''>
                                <div className='codeHeader'>
                                    Amazon Offer
                                        
                                </div>
                                <div className='codeFooter'>
                                     <div className="imgBox">
                                        <img src="./images/amazon-home.png" alt="" />
                                     </div>
                                     <div className="off">
                                            Up to 10% off
                                      </div>
                                </div>
                            </a>
                        </div>
                        <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
                            <a className='codeItem' href=''>
                                <div className='codeHeader'>
                                    Amazon Offer
                                        
                                </div>
                                <div className='codeFooter'>
                                     <div className="imgBox">
                                        <img src="./images/amazon-home.png" alt="" />
                                     </div>
                                     <div className="off">
                                            Up to 10% off
                                      </div>
                                </div>
                            </a>
                        </div>
                        <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
                            <a className='codeItem' href=''>
                                <div className='codeHeader'>
                                    Amazon Offer
                                        
                                </div>
                                <div className='codeFooter'>
                                     <div className="imgBox">
                                        <img src="./images/amazon-home.png" alt="" />
                                     </div>
                                     <div className="off">
                                            Up to 10% off
                                      </div>
                                </div>
                            </a>
                        </div>
                        <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
                            <a className='codeItem' href=''>
                                <div className='codeHeader'>
                                    Amazon Offer
                                        
                                </div>
                                <div className='codeFooter'>
                                     <div className="imgBox">
                                        <img src="./images/amazon-home.png" alt="" />
                                     </div>
                                     <div className="off">
                                            Up to 10% off
                                      </div>
                                </div>
                            </a>
                        </div>
                        <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
                            <a className='codeItem' href=''>
                                <div className='codeHeader'>
                                    Amazon Offer
                                        
                                </div>
                                <div className='codeFooter'>
                                     <div className="imgBox">
                                        <img src="./images/amazon-home.png" alt="" />
                                     </div>
                                     <div className="off">
                                            Up to 10% off
                                      </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Top Rated Stores Section */}
            <section className="topRatedStore">
                <div className="container">
                    <h2>Top Rated Stores</h2>
                    <div className="row">
                        {topRatedStores.data.map((store, index) => (
                            <div key={index} className="col-lg-2 col-md-3 col-sm-6">
                                <Link href={`/stores/${store.Slug}`} className="toprated">
                                    <div className="topratedTop">
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${store.store_image.url}`}
                                            alt={store.Title}
                                            width={150}
                                            height={60}
                                        />
                                    </div>
                                    <div className="topRatedBottom">
                                        <div className="storeName">
                                            <span>{store.Coupons[0].coupon_type}</span>
                                            <span>{store.Title}</span>
                                        </div>
                                        <div className="discount">
                                        {getHeading(store.Coupons[0].Title)}
                                        </div>
                                        <div className="description">
                                        {store.Coupons[0].Title}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Stores Section */}
            <section className="container-fluid featured-store">
                <div className="container">
                    <h2>Featured Stores</h2>
                    <div className="row row-cols-2">
                        {featuredStores.data.map((store, index) => (
                            <div key={index} className="col-lg-2 col-md-3 col-sm-6 featured-box">
                                <div className="featured-item">
                                    <Link href="{`/stores/${store.Slug}`}">
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${store.store_image.url}`}
                                            alt={store.Title}
                                            width={150}
                                            height={100}
                                        />
                                    </Link>
                                    <Link href="{`/stores/${store.Slug}`}" className="store-name">{store.Title}</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="d-flex">
                        <div className="more-btn ms-auto">
                            <Link href="/stores" className="btn btn-primary">Explore More</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Top Online Stores Section */}
            <section className="online-store">
                <div className="container">
                    <h2>Top Online Stores</h2>
                    <div className="row row-cols-2">
                        {topOnlineStores.data.map((store, index) => (
                            <div key={index} className="col-lg-2 col-md-4 col-sm-6">
                                <Link href={`/stores/${store.Slug}`} className="pickedStore">
                                    <div className="imgBox">
                                        <Image
                                           src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${store.store_image.url}`}
                                           alt={store.Title}
                                            width={120}
                                            height={60}
                                        />
                                    </div>
                                    <div className="dealCout">
                                        {store.Coupons.length} Deals
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="d-flex">
                        <div className="more-btn ms-auto">
                            <Link href="/stores" className="btn btn-primary">Explore More</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trending Blog Section */}
            <section className="container-fluid tranding">
                <div className="container">
                    <div className="row tranding-blog">
                        <h2>Trending Blogs</h2>
                        {[
                            {
                                title: 'List Of Amazon Upcoming Sale July 2023 | Prime Day Sale 50% OFF on...',
                                image: 'amazzon-sale.webp',
                                date: '5-Aug-2023'
                            },
                            {
                                title: 'Latest Apple Student Discount 2023 | Steps to Claim This Offer and...',
                                image: 'apple.webp',
                                date: '5-Aug-2023'
                            },
                            {
                                title: 'Yulu Bike Price And Rental Charges | Find All Details To Book Now...',
                                image: 'yulu-bike.webp',
                                date: '5-Aug-2023'
                            },
                            {
                                title: 'Top 10 Hotel Booking Sites In India | Why You Should Choose Them?..',
                                image: 'top-10-hotel-booking.webp',
                                date: '5-Aug-2023'
                            },
                            {
                                title: 'Emirates Student Offer | Details On Various Discount, T&C And More...',
                                image: 'student-offer.webp',
                                date: '5-Aug-2023'
                            },
                            {
                                title: 'Woodland Heels For Ladies: Catch The Latest Deals On Exclusive Designs...',
                                image: 'Woodland-Heels-For-Ladies.jpg.webp',
                                date: '5-Aug-2023'
                            },
                            {
                                title: 'Buy Jiobook Online: Get Details Of Price, Specifications, & Best Offers...',
                                image: 'Buy-jiobook-online.jpg.webp',
                                date: '5-Aug-2023'
                            },
                            {
                                title: 'Croma Republic Day Sale |Avail Of The Latest Bank Offers, Discount On...',
                                image: 'croma-republic-day-sale.jpg.webp',
                                date: '5-Aug-2023'
                            },
                        ].map((blog, index) => (
                            <div key={index} className="col-lg-3 col-md-6 col-sm-12 blog-box">
                                <div className="blog-item shadow-sm">
                                    <Link href="/blog-details">
                                        <Image
                                            src={`/images/${blog.image}`}
                                            alt={blog.title}
                                            width={300}
                                            height={200}
                                        />
                                    </Link>
                                    <Link href="/blog-details"><p>{blog.title}</p></Link>
                                    <span className="date">{blog.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="more-btn">
                        <Link href="/all-blogs" className="btn btn-primary">More Blogs</Link>
                    </div>
                </div>
            </section>
        </>
    );
}

export async function getStaticProps() {
    // Fetch all store categories
    const categoryRes = await fetch(`https://admin.savesright.com/api/store-categories?pagination[pageSize]=8`);
    const categoryData = await categoryRes.json();

    // Fetch stores for each home_option
    const topRatedRes = await fetch(`https://admin.savesright.com/api/stores?pagination[pageSize]=18&filters[home_options][$eq]=Top Rated Stores&populate=*`);
    const featuredRes = await fetch(`https://admin.savesright.com/api/stores?pagination[pageSize]=18&filters[home_options][$eq]=Featured Stores&populate=*`);
    const topOnlineRes = await fetch(`https://admin.savesright.com/api/stores?pagination[pageSize]=18&filters[home_options][$eq]=Top Online Stores&populate=*`);

    // Parse JSON responses
    const [topRatedData, featuredData, topOnlineData] = await Promise.all([
        topRatedRes.json(),
        featuredRes.json(),
        topOnlineRes.json(),
    ]);

    return {
        props: {
            categories: categoryData || [],
            topRatedStores: topRatedData || [],
            featuredStores: featuredData || [],
            topOnlineStores: topOnlineData || [],
        },
        revalidate: 10, // ISR - revalidate every 10 seconds
    };
}
