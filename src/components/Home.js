
import Notes from "./Notes"



function Home(props) {
  
  return (
    <>
    <div className='container'>
      
    <Notes displayAlert={props.displayAlert}/>
    </div>
    </>
  )
}

export default Home