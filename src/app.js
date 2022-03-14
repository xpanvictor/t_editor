
import React, {useEffect, useState, useRef} from 'react';
import {Button, ButtonGroup} from 'react-bootstrap';

function App() {

    const [content, setContent] = useState('');

    // Make the text box editable on component mount
    useEffect(()=>{
        makeEditable()

        return(()=>{console.log('Component gone')})
    }, [])

    const makeEditable = () => {
        let editor = document.getElementById('tTextBox')
        editor.contentEditable = true
        editor.addEventListener('focusout', (e)=>{
            handleSubmit(e)
        })
    } 

    // So we test and use the data from the  text-box api
    useEffect(()=>{
        console.log(content)
    }, [content])

    const handleSubmit = (e) => {
        // This handles the text editor submit by changing the state
        console.log(e.target)
        setContent(e.target.innerHTML)
    }

    return (
    <React.Fragment>
        <div className="d-flex flex-column">
            <Control />
            <TextBox />
            <div className="alert">
                { content }
            </div>
            {/* <ButtonGroup>
                <Button onClick={handleSubmit}>Submit</Button>
            </ButtonGroup> */}
        </div>
    </React.Fragment>
    )
}

function TextBox(){

    return (
        <div className="tTextBox container mt-2 mb-2 rounded p-1 bg-secondary" id="tTextBox">

        </div>
    )
}

function Control(props){
    return (
        <div className="container-fluid mt-2">
        <ButtonGroup variant='primary' className='mr-1'>
            <Button><i className="bi bi-scissors"></i></Button>
            <Button><i className="bi bi-clipboard"></i></Button>
        </ButtonGroup>
        <ButtonGroup variant='primary' className='mr-1'>
            <Button><i className="bi bi-align-start"></i></Button>
            <Button><i className="bi bi-align-center"></i></Button>
            <Button><i className="bi bi-align-end"></i></Button>
        </ButtonGroup>
        </div>
    )
}

export default App
