import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";


export default async function handle(req,res){

    const {method} = req;

    await mongooseConnect();

    if(method ==='GET'){

        if(req.query?.id){
            res.json(await Product.findOne({_id:req.query.id}));

        }else{
            res.json(await Product.find());

        }

    }




    if(method ==='POST'){
       // 先检查并修改 category
        if (req.body.category === "" || req.body.category === '0') {
            req.body.category = null;
        }
        // 然后解构所有变量，此时 req.body.category 已经是更新后的值
        const { title, description, price, images, category } = req.body;

        const productDoc =  await Product.create({

            title,description,price,images,category,


        })

        res.json(productDoc);


    }

    if(method === 'PUT'){

         // 先检查并修改 category
         if (req.body.category === "" || req.body.category === '0') {
            req.body.category = null;
        }
        // 然后解构所有变量，此时 req.body.category 已经是更新后的值
        const { title, description, price, images, category,_id } = req.body;
        
        await Product.updateOne({_id}, {title,description,price,images,category});
        res.json(true);
    }
    

    if(method === 'DELETE'){
        if(req.query?.id){
            await Product.deleteOne({_id:req.query.id});
            res.json(true);
        
        
        }

    }


}