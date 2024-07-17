import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Categories(){   

    const[editedCategory,setEditedCategory] = useState(null); 


    const [name, setName] = useState('');   
    const [parentCategory,setParentCategory] = useState(''); 
    const [categories, saveCategories] = useState([])
    



    useEffect(() =>{

        fetchCategories();


    },[]);

    function fetchCategories(){
        axios.get('/api/categories').then(result =>{
            saveCategories(result.data);

        })
    }


   async function saveCategory(ev){

        ev.preventDefault();  
        const data = { name, parentCategory: parentCategory !== "0" ? parentCategory : null };

        
        if(editedCategory){
            data._id = editedCategory._id
            await axios.put('/api/categories',
                data
            );
            setEditedCategory('');
    
        }else{

            await axios.post('/api/categories',data);
        }

        
        setName('')
        setParentCategory('0'); 
        fetchCategories();


    }


    function editCategory(category){

        setEditedCategory(category);
        setName(category.name);
        setParentCategory(category.parent?._id); 

    }


    return(
        
        <Layout>
            
            <h1> Categories</h1>

            <label>

               {editedCategory ? `Edit category ${editedCategory.name} `: 'Create new category' }


            </label>
            <form onSubmit={saveCategory} className="flex gap-1">

                    <input 

                        className="mb-0" 
                        type="text"  
                        placeholder="Category name"
                        value={name}
                        onChange={ev => setName(ev.target.value)}
                        />

                    <select 
                        className="mb-0" 
                        value={parentCategory}
                        onChange={ev => setParentCategory(ev.target.value)}

                        >
                        
                        <option value="0"> 
                            No parent category    
                            
                        </option>

                        {categories.length > 0 && categories.map(category => (
                            <option value={category._id}>{category.name}



                            </option>

                            ))}


                    </select>

                    <button 
                        type="submit" 
                        className="btn-primary py-1">
                        Save

                    </button>

            </form>

            <table className="basic mt-4">
                <thead>
                    <tr>
                    <td>Category name</td>
                    <td>Parent  category</td>
                    <td></td>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 && categories.map(category => (
                    <tr key={category._id}>
                        <td>{category.name}</td> {/* Also corrected to use category.name instead of categories.name */}
                        <td> {category?.parent?.name}   </td>
                        <td>
                                <button 
                                    onClick={() => editCategory(category)} 
                                    className="btn-primary mr-1"
                                    > 
                                    Edit

                                </button>

                                <button className="btn-primary"> Delete

                                </button>


                        </td>
                    </tr>
                    ))}
                </tbody>
                
                </table>


        </Layout>    
    
    )

}