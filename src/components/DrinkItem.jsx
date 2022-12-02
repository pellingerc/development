export default function drinkItem(props) {
    function allergies(diet){
        if (diet == ""){
            return 
        }
        else{
            return (<i>Contains {diet}</i>)
        }
    }
    
    return (
        <div>
            <h5 className="drinkName">{props.name}</h5>
            <img className="drinkImage" src={props.image}></img><br></br>
            {allergies(props.allergy)}
            <p>Calories: {props.calories} <br></br>${props.price}</p>
        </div>
    )
}