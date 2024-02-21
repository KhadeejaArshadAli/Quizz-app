import "./Result.scss";
import { useState,useEffect } from "react";

const Result =({totalQuestions, result , onTryAgain }) =>{
    const [ name , setName]= useState('');
    const [ highScores , sethighScores]= useState([]);
    const [ showScores , setshowScores]= useState(false);
    const handleSave =()=>{
        const score ={
            name, 
            score: result.score
        };
        const newHighScores =[...highScores , score].sort((a,b) => b.score- a.score);
        sethighScores(newHighScores);
        setshowScores(true);
        localStorage.setItem('highScores', JSON.stringify(newHighScores));

    };
    useEffect(()=>{
        sethighScores(JSON.parse(localStorage.getItem("highScores")) || [] );
    },[])
    const handleTryAgain = () =>{
        setshowScores(false);
        sethighScores([]);
        onTryAgain(); 
    }
    return (
        <div className="result">
            <h3>Result</h3>
            <p>
               Total Questions : <span>{totalQuestions}</span>
            </p>
            <p>
               Total Score : <span>{result.score}</span>
            </p>
            <p>
               Correct Answer : <span>{result.correctAnswer}</span>
            </p>
            <p>
               Wrong Answer : <span>{result.wrongAnswers}</span>
            </p>
            <button onClick={onTryAgain}>Try Again</button>
            {!showScores ?<>
            <h3>
                Enter your name below <br/> to save your score!
            </h3>
            <input  placeholder="Your Name" value={name} onChange={(evt) => setName(evt.target.value)}/>
            <button  onClick={handleSave}>
                Save
            </button>
            </> : <>
            <table>
                <tr>
                <th>Ranking</th>
                <th>Name</th>
                <th>Score</th>
                </tr>
               <tbody>
                {highScores.map((highScores,i) => {
                    return(
                        <tr key={`${highScores.score}${highScores.name} ${i}`}>
                        <td>{i +1}</td>
                        <td>{highScores.name} </td>
                        <td>{highScores.score}</td>
                    </tr>

                    )
                })}
              
               </tbody>


            </table>
            </>}
         </div>
    );
}

export default Result;