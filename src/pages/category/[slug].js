import "@/styles/category.css";
import Image from 'next/image'
import _ from 'lodash'
import { NextSeo } from 'next-seo';
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import arrayShuffle from 'array-shuffle';
import moment from "moment";

function Category({ category, stores, categories }) {
    
    const validImageSrc = (image) =>
        image && (image.startsWith("/") || image.startsWith("http"));

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
                title={category.seo?.metaTitle.replaceAll("%%currentyear%%", moment().format('YYYY')) || `${category.Title} Coupons`}
                description={category.seo?.metaDescription.replaceAll("%%currentyear%%", moment().format('YYYY')) || `Best ${category.Title} coupons and deals`}
            />
            <section className="categorySection">
                <div className="container">
                    <div className="top-bar-store-bg">
                        <div className="store-bg-1">
                            <div className="row">
                                <div className="col-lg-3 col-md-6 p-0">
                                    <div className="text-center">
                                        <div className="cat-image-box">
                                            <Image
                                                src={validImageSrc(category.image) ? category.image : "/images/default-placeholder.png"}
                                                className="cat-image"
                                                alt={`${category.Title} coupons`}
                                                width={200}
                                                height={81}
                                            />
                                        </div>
                                        <div className="stars text-center">
                                            {[...Array(5)].map((_, i) => (
                                                <FontAwesomeIcon key={i} icon={faStar} />
                                            ))}
                                            <span> 4.8 (12) Rating</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-5 col-md-6">
                                    <h1>Todays {category.Title} Coupons &amp; Offers</h1>
                                    <div className="divider-line mt-2 mb-2" />
                                    <div className="">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <th>🛍️ Total Offers</th>
                                                    <td>{stores.reduce((count, store) => count + (store.Coupons?.length || 0), 0)}</td>
                                                </tr>
                                                <tr>
                                                    <th>🏷️ Coupon Codes</th>
                                                    <td>{stores.reduce((count, store) => count + (store.Coupons?.filter(x => x.coupon_type === 'Code').length || 0), 0)}</td>
                                                </tr>
                                                <tr>
                                                    <th>🛒 Free Shipping</th>
                                                    <td>{stores.reduce((count, store) => count + (store.Coupons?.filter(x => x.Title?.toLowerCase().includes("shipping")).length || 0), 0)}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-12">
                                    <h1>Similar Categories</h1>
                                    <div className="divider-line mt-2 mb-2" />
                                    <div className="similarCat">
                                        <ul>
                                            {categories
                                                .filter(item => item.id !== category.id)
                                                .slice(0, 4)
                                                .map(item => (
                                                    <li key={item.id}>
                                                        <Link href={`/category/${item.Slug}`}>{item.Title}</Link>
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="subCatBox">
                        <div className="row">
                            {stores.map((store) => (
                                store.Coupons?.map((coupon, index) => (
                                    <div key={`${store.id}-${index}`} className="col-lg-4 col-md-6 col-sm-12 p-1 mb-2">
                                        <div className="storeItem">
                                            <div className="storeInfo">
                                                <div className="storeData">
                                                    <span className="discountValue">{getHeading(coupon.Title)}</span>
                                                    <Link href={`/stores/${store.Slug}`} className="storeUrl">
                                                        {store.Title}
                                                    </Link>
                                                </div>
                                                <div className="storeData">
                                                    <div className="storeImage">
                                                        <Link title={store.Title} href={`/stores/${store.Slug}`}>
                                                            <img
                                                                src={"https://admin.savesright.com/"+store.store_image.url || "/images/default-placeholder.png"}
                                                                alt={coupon.Title}
                                                                title={`${store.Title} coupons`}
                                                            />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="storeData">
                                                <Link href={`/stores//${store.Slug}`} className="storeName">
                                                    <p dangerouslySetInnerHTML={{ __html: coupon.Title }} />
                                                </Link>
                                            </div>
                                            <div className="dealBtnBox">
                                                <div className="flexverify">
                                                    <p title="This coupon is verified" className="verifiedCoupon">
                                                        <Image
                                                            src="/images/verified-green-icon.png"
                                                            width={14}
                                                            height={14}
                                                            alt="verified coupon"
                                                        />
                                                        <span>Verified Deal</span>
                                                    </p>
                                                </div>
                                                <p className="grabDeal">
                                                    <Link href={`/${store.Slug}`}>
                                                        Get Deal
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width={18}
                                                            height={18}
                                                            fill="currentColor"
                                                            className="bi bi-tag"
                                                            viewBox="0 0 16 16"
                                                        >
                                                            <path d="M6 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m-1 0a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0" />
                                                            <path d="M2 1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 1 6.586V2a1 1 0 0 1 1-1m0 5.586 7 7L13.586 9l-7-7H2z" />
                                                        </svg>
                                                    </Link>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export async function getStaticProps({ params }) {
    // Fetch category
    const categoryRes = await fetch(
        `https://admin.savesright.com/api/store-categories?filters[Slug][$eq]=${params.slug}&pagination[pageSize]=4000&populate=*`
    );
    const categoryData = await categoryRes.json();
    const category = categoryData.data[0];

    if (!category) {
        return { notFound: true };
    }

    // Fetch stores for this category
    const storesRes = await fetch(
        `https://admin.savesright.com/api/stores?filters[store_category][Slug][$eq]=${params.slug}&fields[0]=Title&fields[1]=Slug&populate[store_image][fields][0]=url&populate[Coupons]=*&pagination[pageSize]=4000`
    );
    const storesData = await storesRes.json();
    const stores = storesData.data || [];

    // Fetch all categories for similar categories section
    const categoriesRes = await fetch(
        "https://admin.savesright.com/api/store-categories?pagination[pageSize]=4000"
    );
    const categoriesData = await categoriesRes.json();
    const categories = arrayShuffle(categoriesData.data || []);

    return {
        props: {
            category,
            stores,
            categories
        },
        revalidate: 60,
    };
}

export async function getStaticPaths() {
    const res = await fetch('https://admin.savesright.com/api/store-categories');
    const categories = await res.json();

    const paths = categories.data.map((category) => ({
        params: { slug: category.Slug },
    }));

    return { paths, fallback: 'blocking' };
}

export default Category;