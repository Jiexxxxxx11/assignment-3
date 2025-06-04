const products = {
  "stussy01": {
    brand: "STUSSY",
    name: "Beach Shell Wave Dye",
    color: "Black",
    price: 78.95,
    sale: true,
    category: "accessories",
    gender: "man",
    sale: "sale",
    images: [
      "images/product-list/stussyhat.jpg.webp",
      "images/product-list/stussyhat2.webp",
      "images/product-list/stussyhat3.webp",
      "images/product-list/stussyhat4.jpg"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "A lightweight shell hoodie dyed with a unique wave pattern. Breathable and wind-resistant.",
    details: "Material: 100% Nylon. Lining: Polyester mesh. Made in USA.",
    reviews: [
      { user: "Alex", rating: 5, comment: "Great fit and looks amazing!" },
      { user: "Mia", rating: 4, comment: "Nice color but runs slightly small." }
    ]
  },

  "bape01": {
    brand: "A BATHING APE",
    name: "College Tee",
    color: "White",
    price: 199.95,
    sale: false,
    category: "tops",
    gender: ["man", "woman"],
    age: "kids",
    images: [
      "images/product-list/bape.jpg.webp",
      "images/product-list/bape2.webp",
      "images/product-list/bape3.webp",
      "images/product-list/bape4.webp"
    ],
    sizes: ["S", "M", "L", "XL"],
    description: "Classic BAPE logo printed tee. Comfortable and stylish.",
    details: "Material: 100% Cotton. Made in Japan.",
    reviews: []
  },

  "palace01": {
    brand: "PALACE",
    name: "Bribed Tri-Ferg Hood",
    color: "Navy",
    price: 339.95,
    sale: false,
    category: "tops",
    gender: ["man", "woman"],
    images: [
      "images/product-list/palace.webp",
      "images/product-list/palace2.webp",
      "images/product-list/palace3.webp",
      "images/product-list/palace4.webp"
    ],
    sizes: ["S", "M", "L"],
    description: "Palace hoodie featuring the iconic Tri-Ferg logo with contrast stitching.",
    details: "Material: 80% Cotton, 20% Polyester.",
    reviews: [{ user: "Jay", rating: 5, comment: "Looks even better in person." }]
  },

  "carhartt01": {
    brand: "Carhartt WIP",
    name: "Detroit Jacket",
    color: "Brown",
    price: 449.95,
    sale: false,
    category: "tops",
    gender: "man",
    images: [
      "images/product-list/carhartt.jpg",
      "images/product-list/carhartt2.webp",
      "images/product-list/carhartt3.webp",
      "images/product-list/carhartt4.webp"
    ],
    sizes: ["S", "M", "L", "XL"],
    description: "Iconic Carhartt work jacket with a structured fit.",
    details: "Material: 100% Cotton Duck Canvas. Made in USA.",
    reviews: []
  },

  "jordan01": {
    brand: "Air Jordan",
    name: "Air Jordan 11 Retro Low",
    color: "White/Black",
    price: 260.00,
    sale: false,
    category: "shoes",
    gender: "man",
    images: [
      "images/product-list/jordan.jpg",
      "images/product-list/jordan2.jpg",
      "images/product-list/jordan3.jpg",
      "images/product-list/jordan4.jpg"
    ],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12", "US 13"],
    description: "Low-top edition of the legendary Air Jordan 11 silhouette.",
    details: "Patent leather upper with Zoom Air cushioning.",
    reviews: [
      { user: "Lee", rating: 5, comment: "Amazing comfort and retro vibe!" }
    ]
  },

  "stoneisland01": {
    brand: "Stone Island",
    name: "Overshirt",
    color: "Olive",
    price: 869.95,
    sale: false,
    category: "tops",
    gender: "man",
    brand: "stoneisland",
    images: [
      "images/product-list/stoneisland.webp",
      "images/product-list/stoneisland2.webp",
      "images/product-list/stoneisland3.webp",
      "images/product-list/stoneisland4.webp"
    ],
    sizes: ["M", "L", "XL"],
    description: "Stone Island's signature overshirt in garment-dyed cotton.",
    details: "Material: 100% Cotton. Made in Italy.",
    reviews: []
  }
};