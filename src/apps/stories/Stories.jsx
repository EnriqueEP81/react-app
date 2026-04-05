import { useEffect } from "react";
import { useState } from "react";


const stories = [
        {
            title: 'React',
            url: 'https://react.dev/',
            author: 'Jordan Walke',
            num_comments: 3,
            points: 4,
            objectID: 0,
        },
        {
            title: 'Redux',
            url: 'https://redux.js.org/',
            author: 'Dan Abramov, Andrew Clark',
            num_comments: 2,
            points: 5,
            objectID: 1,
        },
    ];


const Stories = () =>{

    console.log('Stories renders');

    const [searchTerm, setSearchTerm] = useState(localStorage.getItem('search') || 'React');

    useEffect(() => {
        localStorage.setItem('search', searchTerm),
        [searchTerm]
    });

    const handleSearch = (event) => {
        console.log("handle Search " + event.target.value);
        setSearchTerm(event.target.value);
        //localStorage.setItem('search', event.target.value);
    }

    const searchedStories = stories.filter(story =>
        story.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
          <h1>My stories</h1>
          {
          //<Search onSearch = {handleSearch} search = {searchTerm}/>
          }
          <InputWithLabel  inputId='searchId' inputOnChange={handleSearch} inputType='text' inputValue={searchTerm}>
            <strong>Search:</strong>
          </InputWithLabel>
          <hr/>
          <List list={searchedStories}/>
        </>
    );
}



const InputWithLabel = ({inputId,inputType,inputOnChange, inputValue, children}) => {
    console.log('input with label renders')    ;
    return(
      <>
        <label htmlFor = {inputId}>{children}</label>
        <input id = {inputId} type = {inputType} onChange={inputOnChange} value={inputValue}></input>
      </>
    )
}


const List = ({list}) => {
    console.log('List renders');
    return (
      <ul>
          {list.map((item) =>(
              <Item key={item.objectID} elem={item}/>
          ))}
      </ul>
    );
}

const Item = ({elem:{url, title, author, points, num_comments}}) => {
    return(
        <li>
            <span>
                <a href={url}>{title} </a>
            </span>
            <span>{author} </span>
            <span>{points} </span>
            <span>{num_comments} </span>
        </li>
    );
}

export default Stories;