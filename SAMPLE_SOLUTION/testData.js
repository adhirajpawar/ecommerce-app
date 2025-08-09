// Test data for ProductCard component assessment

export const sampleProducts = [
    {
        id: "1",
        name: "Premium Cotton T-Shirt",
        price: 29.99,
        originalPrice: 39.99,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
        variants: [
            { id: "s-red", size: "S", color: "Red", stock: 5 },
            { id: "m-blue", size: "M", color: "Blue", stock: 0 },
            { id: "l-green", size: "L", color: "Green", stock: 12 }
        ],
        isOnSale: true,
        discountPercentage: 25
    },
    {
        id: "2",
        name: "Wireless Bluetooth Headphones",
        price: 89.99,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
        variants: [
            { id: "black", size: "One Size", color: "Black", stock: 8 },
            { id: "white", size: "One Size", color: "White", stock: 3 }
        ],
        isOnSale: false,
        discountPercentage: 0
    },
    {
        id: "3",
        name: "Leather Crossbody Bag",
        price: 45.50,
        originalPrice: 65.00,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
        variants: [
            { id: "brown", size: "Medium", color: "Brown", stock: 0 },
            { id: "black", size: "Medium", color: "Black", stock: 2 }
        ],
        isOnSale: true,
        discountPercentage: 30
    },
    {
        id: "4",
        name: "Smart Fitness Watch",
        price: 199.99,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
        variants: [
            { id: "silver-42", size: "42mm", color: "Silver", stock: 15 },
            { id: "black-42", size: "42mm", color: "Black", stock: 7 },
            { id: "silver-38", size: "38mm", color: "Silver", stock: 0 }
        ],
        isOnSale: false,
        discountPercentage: 0
    },
    {
        id: "5",
        name: "Organic Cotton Hoodie",
        price: 59.99,
        originalPrice: 79.99,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
        variants: [
            { id: "s-gray", size: "S", color: "Gray", stock: 1 },
            { id: "m-gray", size: "M", color: "Gray", stock: 0 },
            { id: "l-gray", size: "L", color: "Gray", stock: 4 }
        ],
        isOnSale: true,
        discountPercentage: 25
    },
    {
        id: "6",
        name: "Portable Bluetooth Speaker",
        price: 34.99,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
        variants: [
            { id: "blue", size: "Standard", color: "Blue", stock: 0 },
            { id: "red", size: "Standard", color: "Red", stock: 0 },
            { id: "black", size: "Standard", color: "Black", stock: 0 }
        ],
        isOnSale: false,
        discountPercentage: 0
    }
];

// Edge case products for testing
export const edgeCaseProducts = [
    {
        id: "edge-1",
        name: "This is a very long product name that should be truncated properly to fit within the card layout without breaking the design",
        price: 19.99,
        originalPrice: null,
        image: "https://invalid-image-url-that-will-fail.com/image.jpg",
        variants: [],
        isOnSale: false,
        discountPercentage: 0
    },
    {
        id: "edge-2",
        name: "Product with no variants",
        price: 99.99,
        originalPrice: 129.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
        variants: null,
        isOnSale: true,
        discountPercentage: 23
    },
    {
        id: "edge-3",
        name: "Product with missing data",
        price: null,
        originalPrice: null,
        image: "",
        variants: [
            { id: "default", size: "One Size", color: "Default", stock: 1 }
        ],
        isOnSale: false,
        discountPercentage: 0
    }
];

// Loading state simulation
export const simulateLoading = (delay = 2000) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(sampleProducts);
        }, delay);
    });
};

// Error state simulation
export const simulateError = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error('Failed to load products'));
        }, 1000);
    });
};
