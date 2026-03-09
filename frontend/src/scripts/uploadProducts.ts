import { supabase } from '../lib/supabase';
import { products } from '../assets/assets';

async function uploadProducts() {
    console.log('🚀 Starting product upload...');

    for (const product of products) {
        // Format product for database
        const dbProduct = {
            _id: product._id,
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image,
            category: product.category,
            sub_category: product.subCategory,
            sizes: product.sizes,
            date: product.date,
            bestseller: product.bestseller
        };

        const { error } = await supabase
            .from('products')
            .insert([dbProduct]);

        if (error) {
            console.error(`❌ Error uploading ${product.name}:`, error.message);
        } else {
            console.log(`✅ Uploaded: ${product.name}`);
        }
    }

    console.log('🎉 Upload complete!');
}

// Run this once
uploadProducts();