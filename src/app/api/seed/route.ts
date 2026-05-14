import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import ProductCategory from '@/models/ProductCategory';
import Batch from '@/models/Batch';

const seedCategories = [
  { category_name: 'Hạt Mắc Ca', positioning: '1' },
  { category_name: 'Mật Ong', positioning: '2' },
  { category_name: 'Trái Cây Sấy', positioning: '3' },
  { category_name: 'Quà Tặng', positioning: '4' },
];

const seedProducts = [
  {
    name: "Macadamia Nứt Vỏ Cao Cấp",
    desc: "Size Jumbo 25-30mm, rang mộc",
    price: 350000,
    image: "/images/macadamia.png",
    images: ["/images/macadamia.png", "/images/hero.png"],
    category: "Hạt Mắc Ca",
    tag: "Bán Chạy",
    rating: 5.0,
    reviews: 128,
    benefits: [
      "Giàu Omega-3 và Omega-6 tốt cho tim mạch",
      "Chứa nhiều chất chống oxy hóa",
      "Hỗ trợ giảm cân và tiêu hóa khỏe mạnh",
      "Tốt cho phụ nữ mang thai và trẻ em",
    ],
    nutrition: {
      calories: "718 kcal",
      fat: "76g",
      protein: "8g",
      carbs: "14g",
    }
  },
  {
    name: "Mật Ong Hoa Cà Phê",
    desc: "100% nguyên chất tự nhiên",
    price: 280000,
    image: "/images/honey.png",
    images: ["/images/honey.png", "/images/hero.png"],
    category: "Mật Ong",
    tag: "Hữu Cơ",
    rating: 4.9,
    reviews: 84,
    benefits: [
      "Tăng cường hệ miễn dịch",
      "Giảm ho, làm dịu cổ họng",
      "Cung cấp năng lượng tự nhiên",
    ],
    nutrition: {
      calories: "304 kcal",
      fat: "0g",
      protein: "0.3g",
      carbs: "82g",
    }
  },
  {
    name: "Chuối Laba Sấy Dẻo",
    desc: "Không thêm đường, giữ trọn vị",
    price: 120000,
    image: "/images/dried_fruits.png",
    images: ["/images/dried_fruits.png"],
    category: "Trái Cây Sấy",
    tag: "Mới",
    rating: 4.8,
    reviews: 56,
    benefits: [
      "Nguồn cung cấp Kali dồi dào",
      "Hỗ trợ tiêu hóa",
      "Đồ ăn vặt lành mạnh",
    ],
    nutrition: {
      calories: "346 kcal",
      fat: "1.8g",
      protein: "3.9g",
      carbs: "88g",
    }
  },
  {
    name: "Hộp Quà Tặng Phú Quý",
    desc: "Bộ sưu tập 4 loại nông sản cao cấp",
    price: 1250000,
    image: "/images/tet_box.png",
    images: ["/images/tet_box.png"],
    category: "Quà Tặng",
    tag: "Giới Hạn",
    rating: 5.0,
    reviews: 210,
    benefits: [
      "Món quà ý nghĩa dịp Lễ Tết",
      "Thiết kế sang trọng, đẳng cấp",
      "Hội tụ tinh hoa nông sản Việt",
    ],
    nutrition: {
      calories: "-",
      fat: "-",
      protein: "-",
      carbs: "-",
    }
  },
  {
    name: "Xoài Sấy Dẻo Chua Ngọt",
    desc: "Hương vị nhiệt đới tự nhiên",
    price: 145000,
    image: "/images/dried_fruits.png",
    images: ["/images/dried_fruits.png"],
    category: "Trái Cây Sấy",
    rating: 4.7,
    reviews: 42,
    benefits: [
      "Chứa nhiều Vitamin C",
      "Giúp đẹp da",
    ],
    nutrition: {
      calories: "319 kcal",
      fat: "0.8g",
      protein: "2.5g",
      carbs: "83g",
    }
  },
  {
    name: "Mật Ong Rừng Tràm",
    desc: "Hương thơm đặc trưng, đậm đà",
    price: 310000,
    image: "/images/honey.png",
    images: ["/images/honey.png"],
    category: "Mật Ong",
    tag: "Đặc Sản",
    rating: 4.9,
    reviews: 115,
    benefits: [
      "Kháng khuẩn tự nhiên",
      "Tốt cho dạ dày",
    ],
    nutrition: {
      calories: "304 kcal",
      fat: "0g",
      protein: "0.3g",
      carbs: "82g",
    }
  }
];

export async function GET() {
  try {
    await dbConnect();
    await ProductCategory.deleteMany({});
    const categories = await ProductCategory.insertMany(seedCategories);
    const categoryMap = new Map(categories.map((category) => [category.category_name, category._id]));

    await Batch.deleteMany({});
    await Product.deleteMany({});
    const productsToInsert = seedProducts.map((product) => ({
      ...product,
      categoryId: categoryMap.get(product.category),
    }));

    const products = await Product.insertMany(productsToInsert);

    const productMap = new Map(products.map((product) => [product.name, product]));
    const batchSeeds = [
      {
        productName: 'Macadamia Nứt Vỏ Cao Cấp',
        batchId: 'B-2025-05-MAC',
        productionDate: '2025-05-01',
        expirationDate: '2026-05-01',
        farmInfo: {
          name: 'Dak Nong Heritage Estate',
          location: 'Tuy Duc, Đắk Nông',
          farmerName: 'Nguyễn Văn Lâm',
          harvestMethod: 'Hand-selected, sun-dried',
        },
      },
      {
        productName: 'Mật Ong Hoa Cà Phê',
        batchId: 'B-2025-05-HNY',
        productionDate: '2025-05-03',
        expirationDate: '2026-05-03',
        farmInfo: {
          name: 'Buon Ma Thuot Apiary',
          location: 'Cư Mgar, Đắk Lắk',
          farmerName: 'Trần Thị Mai',
          harvestMethod: 'Cold-filtered, low heat',
        },
      },
      {
        productName: 'Chuối Laba Sấy Dẻo',
        batchId: 'B-2025-05-FRT',
        productionDate: '2025-05-04',
        expirationDate: '2026-01-04',
        farmInfo: {
          name: 'Lam Dong Drying House',
          location: 'Đức Trọng, Lâm Đồng',
          farmerName: 'Lê Quốc Bảo',
          harvestMethod: 'Low-temperature dehydration',
        },
      },
      {
        productName: 'Hộp Quà Tặng Phú Quý',
        batchId: 'B-2025-05-GFT',
        productionDate: '2025-05-05',
        expirationDate: '2026-05-05',
        farmInfo: {
          name: 'HiAn Gift Atelier',
          location: 'Ea Hleo, Đắk Lắk',
          farmerName: 'Nguyễn Thị Hoa',
          harvestMethod: 'Curated multi-source packing',
        },
      },
    ];

    const batchesToInsert = batchSeeds
      .map((batch) => {
        const product = productMap.get(batch.productName);
        if (!product) return null;

        return {
          batchId: batch.batchId,
          productId: product._id,
          productionDate: batch.productionDate,
          expirationDate: batch.expirationDate,
          farmInfo: batch.farmInfo,
          logisticsTimeline: [
            { event: 'Harvest', date: batch.productionDate, location: batch.farmInfo.location, description: 'Raw materials collected' },
            { event: 'Processing', date: batch.productionDate, location: batch.farmInfo.name, description: 'Sorted and packaged' },
            { event: 'QA', date: batch.productionDate, location: 'HiAn Quality Lab', description: 'Quality verified' },
          ],
          multimediaUrls: [product.image],
          labTestPdfs: [],
          status: 'Approved',
          qa_status: 'Passed',
          origin_region: batch.farmInfo.location,
        };
      })
      .filter(Boolean);

    const batches = await Batch.insertMany(batchesToInsert);
    await Promise.all(
      batches.map((batch) => Product.updateOne({ _id: batch.productId }, { $addToSet: { batchIds: batch._id } }))
    );
    
    return NextResponse.json({ 
      success: true, 
      message: "Database seeded successfully",
      count: products.length,
      products,
      batches,
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { success: false, message: "Error seeding database", error: (error as Error).message },
      { status: 500 }
    );
  }
}
