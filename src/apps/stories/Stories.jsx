import { useEffect } from "react";
import { useState } from "react";
import { useReducer } from "react";

const initialStories = [
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

const getAsyncStoriesWithDelay = () => {
    return new Promise((resolve) => {
        setTimeout (
            () => resolve({data: {stories:initialStories}}),
            2000
        )
    } );
}

const storiesReducer = (state, action) => {
    if (action.type === 'SET_STORIES') {
        return action.payload; 
    } else if (action.type === 'REMOVE_STORY'){
        return state.filter(
            (story) => story.objectID !== action.payload.objectID
        );
    } else {
        throw new Error();
    }
}


const Stories = () => {

    const [searchTerm, setSearchTerm] = useState(localStorage.getItem('search') || 'React');

    const [stories, dispatchStories] = useReducer(storiesReducer,[]);

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);


    useEffect(() => {
        localStorage.setItem('search', searchTerm),
        [searchTerm]
    });

    useEffect(()=>{
        setIsLoading(true);
        getAsyncStoriesWithDelay()
            .then((result) => {
                //setStories(result.data.stories);
                dispatchStories({
                    type: 'SET_STORIES',
                    payload: result.data.stories,
                })
                setIsLoading(false);
            })
            .catch(() => {
                setIsError(true);
            });
    },[]);

    const handleSearch = (event) => {
        console.log("handle Search " + event.target.value);
        setSearchTerm(event.target.value);
    }

    const searchedStories = stories.filter(story =>
        story.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDeleteItem = (item) => {
        dispatchStories({
            type: 'REMOVE_STORY',
            payload: item,
        });
    }

    return (
        <>
            <h1>My stories</h1>
            <InputWithLabel  inputId='searchId' inputOnChange={handleSearch} inputType='text' inputValue={searchTerm}>
                <strong>Search:</strong>
            </InputWithLabel>
            <hr/>
            {isError && <p>Something went wrong ... </p>}
            {isLoading ? (
                <p>Is Loading ... </p>) : (
                    <List list={searchedStories} onDeleteItem={handleDeleteItem}/>
                )}
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


const List = ({list, onDeleteItem}) => {
    console.log('List renders');
    return (
      <ul>
          {list.map((item) =>(
            <>
              <Item key = {item.objectID} elem = {item} onDeleteItem = {onDeleteItem}/>
            </>
          ))}
      </ul>
    );
}

const Item = ({elem, onDeleteItem}) => {
    return(
        <li>
            <span>
                <a href={elem.url}>{elem.title} </a>
            </span>
            <span>{elem.author} </span>
            <span>{elem.points} </span>
            <span>{elem.num_comments} </span>
            <span>
              <button onClick={() => onDeleteItem(elem)}>Remove Item</button>
            </span>
        </li>
    );
}

export default Stories;