import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Dishes() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [dishes, setDishes] = useState([]);
    const [dishId, setDishId] = useState(null);
    const [menus, setMenus] = useState([]);
 
    const [dishName, setDishName] = useState("");
    const [description, setDescription] = useState("");
    const [foto_url, setFoto_url] = useState("");
    const [menuId, setMenuId] = useState("");

    const [updateForm, setUpdateForm] = useState(true);


    useEffect(() => {
        getMenus();
        getDishes();
    }, [])

    function getMenus() {
        fetch("http://127.0.0.1:8000/api/menus")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true); setMenus(result);
                },
            
    (error) => { setIsLoaded(true); setError(error); })
    }

    //--------------------------------------------------
    function getDishes() {
        fetch("http://127.0.0.1:8000/api/dishes")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setDishes(result);
                },
                (error) => { setIsLoaded(true); setError(error); })
    }

    //---------------------------------------------
    function deleteDish(id) {
        fetch("http://127.0.0.1:8000/api/dishes/" + id, { method: 'DELETE' })
            .then((response) => {
                // console.log(response);
                if (response.status === 204) {
                    const remaining = dishes.filter(p => id !== p.id)
                    setDishes(remaining)
                    alert("Dish was deleted successfully");
                }
            });
    }

   //---------------------------------------------------
    function selectDish(id) {

        console.log(id);

        dishes.map((dish) => {
            if (dish.id === id) {
                setDishId(dish.id);
                setDishName(dish.dishName);
                setDescription(dish.description);
                setFoto_url(dish.foto_url);
                setMenuId(dish.menuId);
                // setMenus(menus.length > 0 && menus.find((e) => e.id === dish.menuId).menuName);
                console.log(dish.id, dish.name, dish.description, dish.foto_url, dish.menuId);
            }
        })
        setUpdateForm(false);

    }
    //-------------------------------------
    function updateDish() {
        let item = { dishId, dishName, description, foto_url, menuId}

        console.log(item);
        console.log(dishId);


        fetch("http://127.0.0.1:8000/api/dishes/" + dishId,
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            }).then((result) => {
                result.json()
                .then((resp) => {
                    console.log(resp)
                    alert("Dish was updated successfully");
                    window.location.href = '/dishes';
                    getDishes()

                })
            })
    }
    //-------------------------

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {

        return (
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Dish Name</th>
                            <th>Description</th>
                            <th>Foto</th>
                            <th>Menu Id</th>
                            <th>Menu pavadinimas</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dishes.map(dish => (
                            <tr key={dish.id}>
                                <td>{dish.id}</td>
                                <td>{dish.dishName}</td>
                                <td>{dish.description}</td>
                                <td><img style={{ width: "150px", height: "150px", objectFit: "cover" }} src={dish.foto_url} /></td>
                                <td>{dish.menuId}</td>
                                <td>{menus.length > 0 && menus.find((e) => e.id === dish.menuId).menuName}</td>
                                <td>
                                    <button onClick={() => deleteDish(dish.id)} className="btn btn-danger">Delete</button>
                                    <button onClick={() => selectDish(dish.id)} className="ms-2 btn btn-primary">Update</button>
                                </td>
                            </tr>)
                        )}
                    </tbody>
                </table>
                {!updateForm
                    ? <div className="container">
                        <div className="row justify-content-center mt-5">
                            <div className='col-md-6'>
                                <div className="card">
                                    <div className='card-header'>
                                        <h4>Update Dish
                                            <Link to={'/dishes'} onClick={() => setUpdateForm(true)} className="btn btn-dark btn sm float-end">BACK</Link>
                                        </h4>
                                    </div>
                                    <div className='card-body'>

                                        <div className='form-group mb-3'>
                                            <label>Dish Name</label>
                                            <input type="text" className='form-control' value={dishName} name="name" onChange={(e) => { setDishName(e.target.value) }} p />
                                        </div>

                                        <div className='form-group mb-3'>
                                            <label>Description</label>
                                            <input type="text" className='form-control' value={description} name="description" onChange={(e) => { setDescription(e.target.value) }} />
                                        </div>

                                        <div className='form-group mb-3'>
                                            <label>Foto</label>
                                            <input type="text" className='form-control' value={description} name="description" onChange={(e) => { setDescription(e.target.value) }} />
                                        </div>
 
                                        {/* <div className='form-group mb-3'>
                                            <label >Menu name:</label>
                                            <select name="menuId" onChange={(e) => { setMenuId(e.target.value) }} className="form-select form-select-md mb-5" aria-label=".form-select-sm example">
                                                <option value={menuId}>{menuName}</option>

                                                {menus.map((menu) => (
                                                    <option key={menu.id} value={menu.id}>{menu.menuName}</option>
                                                ))
                                                }
                                            </select>
                                        </div> */} 
                                        <div className='form-group mb-3'>
                                            <button type="subit" onClick={() => updateDish()} className='btn btn-primary'>Update</button>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>
                    : <Link to={'/AddDish'} className="ms-2 btn btn-primary float-end mt-2 mb-2">Add</Link>}
            </div>
        );


    }
}

export default Dishes;
