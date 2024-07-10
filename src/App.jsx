import { useState,useCallback ,useEffect,useRef} from 'react'


function App() {
  const [length, setLength] = useState(8);
  const [numAllowed,setNumAllowed]=useState(false);
  const [charAllowed,setCharAllowed]=useState(false);
  const [password,setPassword]=useState("");

  //use of useRef hook:

  const passwordRef=useRef(null)

  const passwordGenerator=useCallback(()=>{
  let pass="";
  let str="ABXDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  
  if(numAllowed)str+="0123456789";
  if(charAllowed)str+="!@#$%^&*()_+{}:<>/";

  for (let i= 0; i < length; i++) {
    let char=Math.floor(Math.random()*str.length+1);
    pass+=str.charAt(char);
  }

  setPassword(pass);

  },[length,numAllowed,charAllowed,setPassword])

  const copyPasswordToClipboard=useCallback(()=>{
    passwordRef.current?.select()    //optimization
    passwordRef.current?.setSelectionRange(0,50)
    window.navigator.clipboard.writeText(password)
  },
  [password])

 useEffect(()=>{
  passwordGenerator()
 },[length,numAllowed,charAllowed,passwordGenerator])

  return (
    <>
    <div className="h-screen w-screen flex justify-center">
      <div className="flex items-center">
        <div className="bg-gray-700 p-3 rounded-xl">
          <h1 className='text-white my-4 text-xl text-center font-semibold '>Password Generator</h1>
          <div className="rounded-lg overflow-hidden my-2 flex justify-center ">
          <input 
          className="outline-none focus:outline-none p-1 cursor-default w-full text-sm"
          placeholder="Password"
          value={password}
          readOnly
          type="text"
          ref={passwordRef}
          />
          <button 
          onClick={copyPasswordToClipboard}
          className="p-1 bg-blue-600 hover:bg-blue-400 px-3 text-white hover:text-black">Copy</button>
          </div>

          <div className="">
            <input 
            type="range"
            min={0}
            max={100} 
            value={length}
            className="cursor-pointer " 
            onChange={(e)=>{setLength(e.target.value)}}
            />
            <label className="text-orange-500 ml-1 mr-2">length:{length}</label>

            <input 
            type="checkbox" 
            defaultChecked={numAllowed}
            id="numberInput"
            onChange={()=>{
              setNumAllowed((prev)=>!prev);
            }}
            />
            <label className="text-orange-500 ml-1 mr-2">Number</label>

            <input 
            type="checkbox" 
            defaultChecked={charAllowed}
            id="charInput"
            onChange={()=>{
              setCharAllowed((prev)=>!prev);
            }}
            />
            <label className="text-orange-500 ml-1 mr-2">Character</label>
          </div>
          
        </div>
      </div>
    </div>
     
    </>
  )
}

export default App
