# Infigon Frontend Assessment - Product Store & News Feed

A high-performance, responsive e-commerce application built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. This project demonstrates the implementation of server-side data fetching, dynamic routing, and persistent user states.

## 🚀 Live Demo
**https://infigon-frontend-assessment-prajwal.netlify.app/**

---

## ✨ Features

* **Dynamic Data Fetching**: Leverages Next.js **Server Components** to fetch product and news data directly from the API for optimal SEO and performance.
* **Advanced Filtering & Search**: 
    * Real-time search by product title.
    * Category-based filtering.
    * **Price Sorting**: Toggle between "Price: Low to High" and "Price: High to Low".
* **Persistent Favorites**: A robust "Like" system using **LocalStorage**. It includes custom logic to prevent hydration mismatches between server and client.
* **Dynamic Routing**: Individual product detail pages generated using dynamic segments (`/product/[id]`).
* **Production-Ready UI/UX**:
    * **Skeleton Loaders**: Smooth perceived performance using `loading.tsx` and pulsing CSS animations.
    * **Error Boundaries**: Graceful error handling with `error.tsx` including "Retry" and "Contact Admin" options.
    * **Empty States**: Clear user feedback with custom SVG icons when no search results are found.
    * **Responsive Design**: Mobile-first approach using Tailwind CSS grid and flexbox utilities.
    * **Image Optimization**: Using `next/image` for automatic lazy loading and layout stability.

---

## 🛠️ Tech Stack

* **Framework**: Next.js 15 (App Router)
* **Language**: TypeScript (Strict type safety)
* **Styling**: Tailwind CSS
* **API**: Fake Store API

---

## 🏗️ Getting Started

### Prerequisites
* Node.js 18.x or later
* npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone [https://github.com/prajwal-ghadigaonkar/infigon-frontend-assessment.git](https://github.com/prajwal-ghadigaonkar/infigon-frontend-assessment.git)