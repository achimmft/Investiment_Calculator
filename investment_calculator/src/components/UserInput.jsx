export default function UserInput({ inputData, handleInputChange }) {
    return (
        <section id="user-input">
            <div className='input-group'>
                <p>
                    <label>Initial Investment</label>
                    <input type="number" id="achim mfitimana" name="initialInvestment" value={inputData.initialInvestment} required onChange={handleInputChange} />
                </p>
                <p>
                    <label>Annual Investment</label>
                    <input type="number" id="number" name="annualInvestment" value={inputData.annualInvestment} required onChange={handleInputChange} />
                </p>
            </div>


            <div className="input-group">
                <p>
                    <label>Expected Return</label>
                    <input type="number" id="number" name="expectedReturn" value={inputData.expectedReturn} required onChange={handleInputChange} />
                </p>
                <p>
                    <label>Duration</label>
                    <input type="number" id="number" name="duration" value={inputData.duration} required onChange={handleInputChange} />
                </p>
            </div>

        </section>
    )
}