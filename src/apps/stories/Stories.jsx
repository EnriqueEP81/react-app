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

    const [searchTerm, setSearchTerm] = useState('React');

    const handleSearch = (event) => {
        console.log("handle Search " + event.target.value);
        setSearchTerm(event.target.value);
    }

    const searchedStories = stories.filter(story =>
        story.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
          <h1>My stories</h1>
          <Search onSearch = {handleSearch} search = {searchTerm}/>
          <hr/>
          <List list={searchedStories}/>
        </>
    );
}


const Search = (props) => {
  console.log('Search renders');  
 
  const handleChange = (event) => {
    props.onSearch(event);
  }

  return (
    <>
      <label htmlFor='search'>Search:</label>
      <input id='search' type='text' value={props.search} onChange={handleChange}></input>
      <p>Searching for <strong>{props.search}</strong></p>
    </>

  );
}


const List = (props) => {
    console.log('List renders');
    return (
      <ul>
          {props.list.map((item) =>(
              <Item key={item.objectID} elem={item}/>
          ))}
      </ul>
    );
}

const Item = (props) => {
    return(
        <li>
            <span>
                <a href={props.elem.url}>{props.elem.title} </a>
            </span>
            <span>{props.elem.author} </span>
            <span>{props.elem.points} </span>
            <span>{props.elem.num_comments} </span>
        </li>
    );
}

export default Stories;