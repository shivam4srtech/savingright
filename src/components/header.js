'use client'
import Link from "next/link";
import { useEffect, useState } from 'react';
import axios from 'axios';

import ReactSearchBox from "react-search-box";
import { useRouter } from 'next/router';

export default function Header() {
  
    const router = useRouter();

    const [filterdata, setFilterdata] = useState([]);

    function fetchData() {
      axios.get('https://admin.savesright.com/api/stores?fields[0]=Title&fields[1]=Slug&pagination[pageSize]=4000')
        .then(function (response) {
          var d = response.data.data.map(item => { return { key: item.Slug, value: item.Title } })
          setFilterdata(d);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
    }
    return (
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <div className="mobileFlex">
            <button
              className="navbar-toggler order-lg-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <a className="navbar-brand brandLogo" href="/">
              Saves<span>Right</span>
            </a>
            <div className="dummyBox"></div>
          </div>

          <form className="d-flex ms-auto order-lg-2 searchForm">
            
          <ReactSearchBox
                            placeholder="Search Store"
                            value=""
                            className="d-flex navbarSearch"
                            data={filterdata}
                            onFocus={()=>fetchData()}
                            clearOnSelect={true}
                            onSelect={(record) => router.push('/stores/' + record.item.key)}
                            leftIcon={<svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={16}
                                height={16}
                                fill="#2f3c97"
                                className="bi bi-search"
                                viewBox="0 0 20 20"
                            >
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                            </svg>}
                        />
                          <button class="btn btn-outline-success" type="button">Search</button>
           
          </form>

          <div className="collapse navbar-collapse justify-content-center order-lg-1" id="navbarNav">
            <ul className="navbar-nav navLinks">
              <li className="nav-item">
                <a className="nav-link active" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" prefetch={false}
                  href="/stores">
                  Stores
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Blog
                </a>
              </li>
              <li className="nav-item">
              <Link className="nav-link" prefetch={false}
                  href="/category">
                  Category
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  };

