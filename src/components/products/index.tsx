"use client"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import { SwiperOptions } from "swiper/types"

import { Product } from '../product'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { IProduct } from '@/interfaces'
import { useEffect, useState } from 'react'

interface ProductProps {
  products: {
    id: string
    slug: string
    name: string
    price: number
    image: {
      url: string
    }
  }[]
  category: "gamepass" | "account"
}

export function Products({ products, category }: ProductProps) {
  const breakpoints: SwiperOptions["breakpoints"] = {
    1200: {
      slidesPerView: 6,
      spaceBetween: 16,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 16,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 16,
    },
    480: {
      slidesPerView: 3,
      spaceBetween: 16,
    },
    320: {
      slidesPerView: 2,
      spaceBetween: 16,
    },
  }

  return (
    <Swiper
      className='w-full'
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      breakpoints={breakpoints}
    >
      {products.map(product => (
        <SwiperSlide key={product.id}>
          <Product
            product={product}
            category={category}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}