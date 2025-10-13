import { useState } from 'react'
import './App.css'

function App() {
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");

  const ops = ['/', '*', '+', '-', '.'];

  const updateCalc = (value) => {
    if (
      (ops.includes(value) && calc === '') || 
      (ops.includes(value) && ops.includes(calc.slice(-1)))
    ) {
      return;
    }

    setCalc(calc + value);

    if (!ops.includes(value)) {
      setResult(eval(calc + value).toString());
    }
  }

  const calculate = () => {
    setCalc(eval(calc).toString());
  }

  const deleteLast = () => {
    if (calc === '') {
      return;
    }

    const value = calc.slice(0, -1);
    setCalc(value);
    
    try {
      setResult(value ? eval(value).toString() : '');
    } catch {
      setResult('');
    }
  }

  const clear = () => {
    setCalc('');
    setResult('');
  }

  return (
    <div className="calculator">
      <div className="display">
        <span className="result">{result ? result : '0'}</span>
        <span className="calc">{calc || '0'}</span>
      </div>

      <div className="operators">
        <button onClick={() => updateCalc('/')}>/</button>
        <button onClick={() => updateCalc('*')}>×</button>
        <button onClick={() => updateCalc('+')}>+</button>
        <button onClick={() => updateCalc('-')}>-</button>
        <button onClick={deleteLast}>DEL</button>
        <button onClick={clear}>C</button>
      </div>

      <div className="digits">
        {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0, '.'].map((digit) => (
          <button 
            key={digit} 
            onClick={() => updateCalc(digit.toString())}
          >
            {digit}
          </button>
        ))}
        <button onClick={calculate} className="equals">=</button>
      </div>
    </div>
  )
}

export default App