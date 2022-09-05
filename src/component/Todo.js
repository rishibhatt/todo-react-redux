import React, { useState } from 'react'
import { addTodo, deleteTodo, removeTodo } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { GrAdd } from 'react-icons/gr';
import { MdDeleteForever, MdAdd } from 'react-icons/md';


import './todo.css'
const Todo = () => {
    const [inputData, setInputData] = useState('');
    const [error,setError] = useState(false);
    const list = useSelector((state) => state.todoReducers.list);
    const dispatch = useDispatch();


    const handleSubmit = (e) => {

        e.preventDefault();
        if(inputData.length == 0)
        {
            setError(true);
        }
        else
        {
            dispatch(addTodo(inputData), setInputData(''));
            setError(false);

        }


    }
    return (
        <>

            <h1 className='text-white text-4xl text-center mt-20'>To Do List </h1>
            
            <div className='container mt-20 mx-auto grid gap-4 relative  justify-items-center    md:mx-auto'>
               
               {error?<label className='bg-white text-red-600 mt-1 absolute'>Field can't be empty</label>:''}
                    <span className='add-btn absolute mt-12 text-2xl ml-64  p-1 rounded-lg  md:right-auto' onClick={handleSubmit}><MdAdd /></span>
                    <input type="text" className='add-item h-12 rounded-full w-max mt-10 p-3 pl-0 text-center focus:outline-none focus:ring focus:ring-teal-300 ' placeholder='✍🏻 Add items..' value={inputData} onChange={(event) => setInputData(event.target.value)} />
                

                {list.map((element) => {
                    return (
                        <div className='list-con rounded-full p-3 bg-teal-300 flex flex-row' key={element.id}>
                            <h3 className='data'>
                                {element.data}
                            </h3>
                            <MdDeleteForever className='deleteBtn text-black rounded-lg text-3xl ' onClick={(id) => dispatch(deleteTodo(element.id))} />
                        </div>


                    )

                })}
            </div>

            {
                list.length != 0?<div>
                <button className='remove-all absolute p-3 text-white font-extrabold hover:bg-white hover:text-red-600 bg-red-600' onClick={() => dispatch(removeTodo())}>Remove all</button>
            </div> :''
            }

            



        </>
    )
}

export default Todo