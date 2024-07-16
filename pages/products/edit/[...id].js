import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditProductPage() {
    const router = useRouter();
    const { id } = router.query;
    const [productInfo, setProductInfo] = useState(null);


    useEffect(() => {
       
        if(!id){
            return;
        }
         axios.get('/api/products?id=' + id).then(response => {
            setProductInfo(response.data);
        })
    }, [id]);

    

    return (
        <Layout>
            
            {productInfo ? (
                <div>
                    <h1>Edit Product</h1>
                    <ProductForm {...productInfo}/>

                </div>
            ) : (
                <div>Loading product...</div>
            )}
            
        </Layout>
    );
}
