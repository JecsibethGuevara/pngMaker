import React, {useState} from 'react';

import 'react-resizable/css/styles.css';
import Button from '@mui/material/Button';
import Draggable, { DraggableCore } from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import Container from '@mui/material/Container';
import html2canvas from 'html2canvas';


let editorModes = {
  SELECT : 'select',
  RESIZE : 'resize',
  SENDUP: 'sendUp',
  SENDOWN : 'sendDown'
}

const Item = (props)  =>{ 
  const [selected, setSelected] = useState(props.selected)
  const [undraggable , setUndraggable] = useState(true)
  const [resizable, setResizable] = useState(true)
  const [zIndex, setZIndex] = useState(props.zIndex)
  const [width, setWidth] = useState(80);
  const [height, setHeight] = useState(80);
  console.log(selected, props.id)
    let style
  if (selected){
     style ={
        padding: "1rem",
        position: 'absolute',
        backgroundImage: `url(${props.image})`,
        position: 'absolute', 
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'fill',
        maskImage: `url(${props.image})`,
        maskMode: 'alpha',
        maskPosition: 'center',
        maskSize: 'cover',
        zIndex: zIndex, 
        border: '1px solid black'
      }
  }else{
     style ={
        padding: "1rem",
        position: 'absolute',
        backgroundImage: `url(${props.image})`,
        position: 'absolute', 
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'fill',
        maskImage: `url(${props.image})`,
        maskMode: 'alpha',
        maskPosition: 'center',
        maskSize: 'cover',
        zIndex: zIndex
      }
  } 
  const handleResize = (event, { size }) => {
    if(props.mode == 'resize'){
      setUndraggable(true) 
      setWidth(size.width);
      setHeight(size.height);

    }
  }
  const handleSelect = () =>{
    if(props.mode === 'select'){
      setUndraggable(!undraggable) 
      console.log(selected)
    }
  }
  const sendUp = () =>{
    setZIndex(zIndex + 100)
  }
  const sendDown = () =>{
    setZIndex(zIndex - 100)
  }
  
  const handleClick = () =>{
    if(selected && props.mode == 'select'){
      console.log('select Mode')
      setResizable(true)
      handleSelect()
    } else if (selected && props.mode == 'resize'){
    //   setUndraggable(true) 
      setResizable(false)
      handleResize()
    } else if (selected && props.mode == 'sendUp'){
      sendUp()
    }else if (selected && props.mode == 'sendDown'){
      sendDown()
    }
    // if(props.mode == 'select'){
    //   setResizable(false)
    //   handleSelect()
    // }else if(props.mode == 'resize'){
    //   setResizable(false)
    //   setSelected(true)
    // }
  }
  
  return(
    
    <Draggable disabled={undraggable}>
      <ResizableBox  height={height} onResizeStart={() =>{setUndraggable(true)} } onResizeEnd={() => {setUndraggable(false)}} onClick={()=>{handleClick()}} width={width}  onResize={handleResize} style={style} />
    </Draggable>

  )
}

const  App = () => {
  const [currentMode, setCurrentMode] = useState(editorModes.SELECT)

  const [items, setItems] = useState([

    {id: 'item1',
     key: 1,
     image: 'imageOne.png',
     zIndex : 10,
     selected: false
    },
    {id: 'item2',
     key: 2,
     image: 'imageTwo.png',
     zIndex : 10,
     selected: false
    }
    
  ])

  const handleClick = (num) =>{
    console.log(items) 
    items[num].selected = !items[num].selected
    console.log(items) 
  }
                
  const  Menu = () =>{

    function saveAsImage() {
      const element = document.querySelector('.canvas');
      html2canvas(element, {
        backgroundColor: 'transparent'
      }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'my-image.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
    const onSelect =  () =>{
      setCurrentMode(editorModes.SELECT)
      console.log(currentMode)
    }
    const onResize =  () =>{
      setCurrentMode(editorModes.RESIZE)
      console.log(currentMode)
    }
    const onSendUp =  () =>{
      setCurrentMode(editorModes.SENDUP)
      console.log(currentMode)
    }
    const onSendDown=  () =>{
      setCurrentMode(editorModes.SENDOWN)
      console.log(currentMode)
    }
   
    return(
      <div>
        <ul>
          <Button onClick={onSelect} variant="outlined" style={{marginRight: '10px'}}>Select</Button>
          <Button onClick={onSendUp} variant="outlined" style={{marginRight: '10px'}}>Send Up</Button>
          <Button onClick={onSendDown} variant="outlined"style={{marginRight: '10px'}}>Send Down</Button>
          <Button onClick={saveAsImage} variant="outlined" style={{marginRight: '10px'}}>Save PNG</Button>
        </ul>
      </div>
    )
  } 
  
  return (
    <div className="all">
      <h1>PNG Maker</h1>
      <div className='canvas' style={{width: '500px', height: '500px', backgroundColor: 'transparent', position: 'relative'}}>
        <Item onClick={handleClick(0)} selected={items[0].selected} mode={currentMode} key={items[0].key} image={items[0].image} zIndex={items[0].zIndex}/>
        <Item onClick={handleClick(1)} selected={items[1].selected} mode={currentMode} key={items[1].key} image={items[1].image} zIndex={items[1].zIndex}/>

      </div>
      <Menu/>
    </div>
   
  );


};



export default App;