
import React, {useEffect, useState} from 'react';
import {Button, FormSelect} from 'react-bootstrap';

function App() {

    const [content, setContent] = useState('');
    const [stateCode, setStateCode] = useState(false)

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
        // This is where we append the data to the user handler.
        // We have to decide how we handle that
    }, [content])

    const handleSubmit = (e) => {
        // This handles the text editor submit by changing the state
        setContent(e.target.innerHTML)
    }

    // The edit function
    const edit = (e) => {
        document.execCommand(e, false, null)
    }

    // Edit with input arg
    const editArg = (e, arg) => {
        document.execCommand(e, true, arg)
    }

    // Edit the textbox display state
    const editState = () => {
        let editor = document.getElementById('tTextBox')
        if (stateCode){
            editor.innerHTML = editor.innerText
            setStateCode(false)
        }else{
            editor.innerText = editor.innerHTML
            setStateCode(true)
        }
    }

    return (
    <React.Fragment>
        <div className="d-flex flex-column p-0">
            <Controls stateCode={stateCode} edit={(e)=>edit(e)} editArg={(e, arg)=>editArg(e, arg)} editState={()=>editState()} />
            <TextBox />
        </div>
    </React.Fragment>
    )
}

function TextBox(){

    return (
        <div className="tTextBox container-fluid mt-2 mb-2 rounded p-2 bg-light" id="tTextBox">
        </div>
    )
}

function Controls(props){

    const { stateCode, edit, editArg, editState } = props 

    return (
        <div className="container-fluid mt-2">
        <div className="btn-group">
            <Control execCmd={()=>edit('cut')}><i className="bi bi-scissors"></i></Control>
            <Control execCmd={()=>edit('copy')}><i className="bi bi-clipboard"></i></Control>
            <Control execCmd={()=>edit('paste')}><i className="bi bi-clipboard-check-fill"></i></Control>
        </div>

        <div className="btn-group">
            <Control execCmd={()=>edit('bold')}><i className="bi bi-type-bold"></i></Control>
            <Control execCmd={()=>edit('italic')}><i className="bi bi-type-italic"></i></Control>
            <Control execCmd={()=>edit('underline')}><i className="bi bi-type-underline"></i></Control>
        </div>

        <div className="btn-group">
            <Control execCmd={()=>edit('justifyLeft')}><i className="bi bi-align-start"></i></Control>
            <Control execCmd={()=>edit('justifyCenter')}><i className="bi bi-align-center"></i></Control>
            <Control execCmd={()=>edit('justifyRight')}><i className="bi bi-align-end"></i></Control>
        </div>

        <div className="btn-group">
            <Control execCmd={()=>edit('indent')}><i className="bi bi-align-end"></i></Control>
            <Control execCmd={()=>edit('outdent')}><i className="bi bi-align-start"></i></Control>
        </div>

        <div className="btn-group">
            <Control execCmd={()=>edit('insertOrderedList')}><i className="bi bi-list-ol"></i></Control>
            <Control execCmd={()=>edit('insertUnorderedList')}><i className="bi bi-list-ul"></i></Control>
        </div>

        <div className="btn">
            <small><i>BackColor:</i></small>
            <input type="color" name="" id="" onChange={(e)=>editArg('backColor', e.target.value)} />
            <small><i>ForeColor:</i></small>
            <input type="color" name="" id="" onChange={(e)=>editArg('foreColor', e.target.value)} />
        </div>

        <FormSelect onChange={(e)=>editArg('fontName', e.target.value)} size='sm'>
            <option value="Arial">Arial</option>
            <option value="Comic Sans M">Comic Sans MS</option>
            <option value="Courier">Courier</option>
            <option value="Georgia">Georgia</option>
            <option value="Tahoma">Tahoma</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Verdana">Verdana</option>
        </FormSelect>

        <FormSelect onChange={(e)=>editArg('fontSize', e.target.value)} size='sm' defaultValue={null}>
            <option value={null}>FontSize</option>
            <option value="1rem">1</option>
            <option value="2rem">2</option>
            <option value="3rem">3</option>
            <option value="4rem">4</option>
            <option value="5rem">5</option>
        </FormSelect>

        <FormSelect onChange={(e)=>editArg('formatBlock', e.target.value)} size='sm' >
            <option value={null}>Header</option>
            <option value='H1'>H1</option>
            <option value='H2'>H2</option>
            <option value='H3'>H3</option>
            <option value='H4'>H4</option>
            <option value='H5'>H5</option>
        </FormSelect>

        <Button size='sm' onClick={()=>editArg('createLink', prompt('Paste the link url:'))} className='m-1'><i className="bi bi-link"></i></Button>

        <Button size='sm' onClick={()=>editState()}>
            <i className={(stateCode) ? "bi bi-body-text" : "bi bi-code"}></i>
        </Button>

        </div>
    )
}

function Control(props){

    return(
        <Button variant='primary' size='sm' onClick={()=>props.execCmd(props.type)} className='bn'>{props.children}</Button>
    )
}

export default App
