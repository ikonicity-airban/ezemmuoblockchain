import React, { useEffect } from 'react'
import { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import axios from 'axios';

const BlogEdit = () => {

    const [blogdata, setBlogdata] = useState({})
    const location = useLocation()
    const {state} = location
    const [editorstate, setEditorstate] = useState()
    const [isError, setIsError] = useState('')
    const [base64, setBase64] = useState('')
    // const user = localStorage.getItem('data')
    // const [data, setData] = useState(JSON.parse(user))
    const [selectedValue, setSelectedValue] = useState()
    const [sub, setSub] = useState(true)


    
    const [isBlog, setIsBlog] = useState('')
    console.log(state)


    useEffect(()=>{
        axios.get(`https://ezemmuoblockchain-5.onrender.com/blogs/${state}`)
        .then(response => {
            console.log('blog added')
            console.log(response.data.blog)
            setBlogdata(response.data.blog)
            // setIsBlog('Blog edited Successfully')
        })
        .catch(err => {
            console.log(err)
        })
        setSub(true)
    },[])

    useEffect(()=>{
        setEditorstate(blogdata.body)
    }, [blogdata])


    function handleChange(e) {
        setBlogdata({
            ...blogdata,
            [e.target.name]: e.target.value,
        })

    }
    
    function handleimage(e){
        const file = e.target.files[0]
        const reader = new FileReader();
        reader.onloadend = () =>{
         const convertedString = reader.result;
         setBase64(convertedString)
        }
        reader.readAsDataURL(file)
     }

    function handleSelect (e){
        setSelectedValue(e.target.value)
    }

    const updatedBlog = {
        id: state,
        title: blogdata.title,
        snippet: blogdata.snippet,
        image: blogdata.image,
        author: blogdata.author,
        categories: selectedValue,
        readMins: blogdata.mins,
        body: editorstate,
        tagOne: blogdata.tagOne,
        tagTwo: blogdata.tagTwo,
        tagThree: blogdata.tagThree,
        tagFour: blogdata.tagFour,
        tagFive: blogdata.tagFive,
        tagSix: blogdata.tagSix
    }

    function handleSubmit(e) {
        e.preventDefault()
        setSub(false)
        console.log('prevented')
        axios.put(`https://ezemmuoblockchain-5.onrender.com/api/blogs/${state}`, updatedBlog)
            .then(response => {
                console.log('blog added')
                console.log(response.data)
                setBlogdata(response.data)
                setSub(true)
                setIsBlog('Blog edited Successfully')
            })
            .catch(err => {
                console.log(err)
                setSub(true)
                setIsError('Could not upload Blog at the moment')
            })
    }

  

    console.log(blogdata)

  return (
    <>
    {
        blogdata._id &&  <div className='blogForm'>
        <h1>
            Edit Blog
        </h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='title'>
                    Title:
                    <input
                        required={true}
                        type='text'
                        name='title'
                        value={blogdata.title}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div>
                    <label htmlFor='image'>
                        Image:
                        <input
                            required={true}
                            type='file'
                            name='image'
                            onChange={handleimage}
                        />
                    </label>
                </div>
            <div>
                <label htmlFor='snippet'>
                    Snippet:
                    <input
                        required={true}
                        type='text'
                        name='snippet'
                        value={blogdata.snippet}
                        onChange={handleChange}
                        placeholder='maximum of 200 characters'
                    />
                </label>
            </div>
            <div className='tags'>
                <label htmlFor='tag1'>
                    Tag 1:
                    <input
                        required={true}
                        type='text'
                        name='tagOne'
                        value={blogdata.tagOne}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor='tag2'>
                    Tag 2:
                    <input
                        required={true}
                        type='text'
                        name='tagTwo'
                        value={blogdata.tagTwo}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor='tag3'>
                    Tag 3:
                    <input
                        required={true}
                        type='text'
                        name='tagThree'
                        value={blogdata.tagThree}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor='tag4'>
                    Tag 4:
                    <input
                        type='text'
                        name='tagFour'
                        value={blogdata.tagFour}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor='tag5'>
                    Tag 5:
                    <input
                        type='text'
                        name='tagFive'
                        value={blogdata.tagFive}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor='tag6'>
                    Tag 6:
                    <input
                        type='text'
                        name='tagSix'
                        value={blogdata.tagSix}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div>
                <label htmlFor='author'>
                    Author:
                    <input
                        required={true}
                        type='text'
                        name='author'
                        value={blogdata.author}
                        readOnly = {true}
                        // onChange={handleChange}
                    />
                </label>
            </div>
            <div>
                    <label htmlFor='categories'>
                        Categories:
                       <select value={selectedValue} onChange={handleSelect}>
                        <option value='Education'>Education</option>
                        <option value='Technology'>Technology</option>
                        <option value='Blockchain'>Blockchain</option>
                        <option value='Cryptocurrency'>Cryptocurrency</option>
                        <option value='Featured'>Featured</option>
                        <option value='Tutorials'>Tutorials</option>
                        <option value='Reviews'>Reviews</option>
                        <option value='Coding/Dev'>Coding/Dev</option>
                        <option value='Productivity'>Productivity</option>
                       </select>
                    </label>
                </div>
            <div>
                <label htmlFor='mins'>
                    Read Mins:
                    <input
                        required={true}
                        type='text'
                        name='mins'
                        value={blogdata.readMins}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div>
                <p className='blogBody'>Body :</p>
                <ReactQuill
                    value={editorstate}
                    onChange={setEditorstate}
                    modules={{
                        toolbar: [
                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                            ['bold', 'italic', 'underline', 'strike'],
                            ['link', 'image', 'video'],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                            ['blockquote', 'code-block'],
                            [{ 'script': 'sub' }, { 'script': 'super' }],
                            [{ 'indent': '-1' }, { 'indent': '+1' }],
                            [{ 'direction': 'rtl' }],
                            [{ 'size': ['small', false, 'large', 'huge'] }],
                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                            [{ 'color': [] }, { 'background': [] }],
                            [{ 'font': [] }],
                            [{ 'align': [] }],
                            ['clean']
                        ]
                    }}
                />
            </div>
            <strong> <Link to={`/blog/${blogdata.title.split('').join('-')}`}>{isBlog}</Link> </strong>
            <strong>{isError}</strong>
            <button type='submit' disabled ={ sub ? false : true} >{sub ? 'Submit' : 'Loading...'}</button>
        </form>
    </div>
    }
    
    </>
  )
}

export default BlogEdit