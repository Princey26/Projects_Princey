import { useState, useEffect } from "react"
import HomeBooks from "./HomeBooks";

export default function HomeTop5() {
    const [data, setData] = useState();
    const [Category, setCategory] = useState([]);
    const [handleSplit, setHandleSplit] = useState({});

    useEffect(() => {
        fetch("http://localhost:8000/comment/comment", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(fetchdata => fetchdata.json())
            .then(fecthnow => {

                // setComment(fecthnow);
                // console.log(fecthnow)
                let temp_arr = [];
                let comment_object = {};
                fecthnow.forEach(element => {
                    if (!temp_arr.includes(element.Category)) {
                        comment_object[element.Category] = [];
                        temp_arr.push(element.Category)
                    }
                });
                setCategory(temp_arr);
                let arr = [];
                fecthnow.forEach(element => {
                    // if(userInfo.category.includes(element.Category)){
                    arr.push(element.BookId);
                    // console.log(element.Category);
                    let temp = [...comment_object[element.Category], element]
                    comment_object[element.Category] = temp;
                    // } 
                });
                
                temp_arr.forEach(element => {
                    let books = comment_object[element];
                    let res = {};
                    books.forEach(element => {
                        if(!res[element.BookId]){
                            res[element.BookId] = 0;
                        }
                        ++res[element.BookId];
                    });
                    
                    let p = [];
                    let t = [];
                    for (let i = 0; i < books.length; ++i) {
                        if(!t.includes(books[i].BookId)){
                            p.push([books[i], res[books[i].BookId]])
                            t.push(books[i].BookId);
                        }
                        
                    }
                    
                    p.sort(function(a,b){return b[1] - a[1]})
                    
                    let new_array = [];
                    if(p.length > 5){
                        for(let i=0; i<5; i++){
                            new_array.push(p[i][0])
                        }
                    }
                    else{
                        
                        for(let i=0; i<p.length; i++){
                            new_array.push(p[i][0])
                        }
                    }
                    comment_object[element] = new_array;
                });

                setHandleSplit(comment_object);
                
            }).catch(err => console.log(err))
    }, [])


    return (
        <>
            <hr />
            {Category !== undefined && Category.length !== 0 && (Category.map((value, index) => {
                return (
                    <div>
                        {(handleSplit[value] !== undefined && handleSplit[value].length !== 0) ? <h3 className="text-center"> Top books in {value}</h3> : null}
                        <div className="container-fluid mb-5">
                            <div className="row">
                                <div className="clo-10 mx-auto">
                                    <div className="row">
                                        
                                            <div className="row gy-4">

                                                {/* {console.log(handleSplit[value])} */}
                                                {handleSplit[value] !== undefined && handleSplit[value].length !== 0 && (handleSplit[value].map((val, ind) => {
                                                    {/* { console.log(val) } */}
                                                    return (
                                                        <HomeBooks
                                                            key={ind}
                                                            indenity={ind}
                                                            commentAll={val}
                                                        />
                                                    )

                                                }))}
                                            </div>
                                        </div>
                                    </div>
                                
                            </div>
                        </div>
                    </div>)
            }))}
        </>
    )
}