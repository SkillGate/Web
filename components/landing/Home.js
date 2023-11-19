import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { imageUrl } from '../../constants';
const Homes = () => {

  return (
    <div className="hero">
      <div className="flex-1 pt-36 padding-x">
        <h1 className="hero__title">Empowering Dreams, Building Careers!</h1>

        <p className="hero__subtitle">Discover Your Next Opportunity!</p>

        <div className="flex-align-center space-x-2">
          <Link href="/">
            <a
              className={`btn !p-2 md:!px-4 btn-primary-light flex-align-center gap-x-2 `}
            >
              <span className="hidden md:block">Explore Jobs</span>
            </a>
          </Link>
        </div>
      </div>

      <div className="hero__image-container pt-5">
        <div className="hero__image">
          <Image src={imageUrl.hero} alt="hero" layout='fill' className="object-contain" />
        </div>

        <div className="hero__image-overlay" />
      </div>
    </div>
  );
};

export default Homes;
