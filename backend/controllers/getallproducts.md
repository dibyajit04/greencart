```markdown
# 🗂️ Pagination in Node.js/MongoDB - Visual Guide

---

## 📖 What is Pagination?

**Pagination** means breaking a large list (like products) into smaller “pages,” so you only see a few items at a time-just like page numbers at the bottom of an online store.

---

## 🛠️ How Pagination Works in Code

### 1. Extract Page and Limit

```
const page = parseInt(req.query.page) || 1;      // Current page number
const limit = parseInt(req.query.limit) || 10;   // Products per page
const skip = (page - 1) * limit;                 // How many to skip
```
- **page**: Which page to show (defaults to 1)
- **limit**: How many products per page (defaults to 10)
- **skip**: How many products to skip (e.g., page 2 skips the first 10)

---

### 2. Query the Database with Pagination

```
const products = await Product.find(query)
    .sort(sortOption)
    .skip(skip)
    .limit(limit);
```
- `.find(query)`: Finds products matching your search/filter.
- `.sort(sortOption)`: Sorts products (if you set sorting).
- `.skip(skip)`: Skips the calculated number of products.
- `.limit(limit)`: Limits results to the page size.

---

### 3. Get Total Count for Pagination Info

```
const total = await Product.countDocuments(query);
```
- Counts **all matching products** (for all pages).

---

### 4. Return Results with Pagination Info

```
return res.status(200).json({
    products,
    pagination: {
        total,                   // Total matching products
        page,                    // Current page number
        pages: Math.ceil(total / limit) // Total pages
    }
});
```
- Returns the products **for the current page** and info about:
  - `total`: Total products
  - `page`: Current page
  - `pages`: Total pages

---

## 📦 Example

If you have 25 products and use `limit=10`:
- **Page 1**: products 1–10
- **Page 2**: products 11–20
- **Page 3**: products 21–25

---

## 🧑‍💻 How to Use Pagination in Postman

### Method 1: Add Directly to the URL

```
http://localhost:8000/api/products?page=2&limit=5
```
- Fetches page 2, 5 products per page.

### Method 2: Use the Params Tab

| KEY   | VALUE |
|-------|-------|
| page  | 2     |
| limit | 5     |

Postman adds these as `?page=2&limit=5` to your URL.

---

## 📝 Summary Table

| Page | Limit | URL Example                                 | What You Get         |
|------|-------|---------------------------------------------|----------------------|
| 1    | 10    | `/api/products?page=1&limit=10`             | Products 1–10        |
| 2    | 5     | `/api/products?page=2&limit=5`              | Products 6–10        |
| 3    | 20    | `/api/products?page=3&limit=20`             | Products 41–60       |

---

## ⚡ TL;DR

> Add `page` and `limit` as query parameters in your Postman request URL or Params tab to paginate your product results.  
> Your backend will return only the products for that page, plus pagination info.

---
```

