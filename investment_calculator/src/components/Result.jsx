import { calculateInvestmentResults, formatter } from '../util/investment.js'


export default function Result({ inputData }) {
    const investmentResults = calculateInvestmentResults(inputData)
    console.log("Testing things out", investmentResults)
    return (
        <table id="result">
            <thead>
                <tr>
                    <th>Year</th>
                    <th>Investment Value</th>
                    <th>Interst (Year)</th>
                    <th>Total Interest</th>
                    <th>Invested Capital</th>
                </tr>
            </thead>
            <tbody>
                
                    {
                        investmentResults.map(result => {
                            const totalInterest = result.valueEndOfYear - result.annualInvestment * result.year
                            const totalAmountInvested = result.valueEndOfYear - totalInterest
                            return <tr key={result.year}>
                                <td>{result.year}</td>
                                <td>{formatter.format(result.valueEndOfYear)}</td>
                                <td>{formatter.format(result.interest)}</td>
                                <td>{formatter.format(totalInterest)}</td>
                                <td>{formatter.format(totalAmountInvested)}</td> 
                            </tr>
                        })
                    }
       
            </tbody>
        </table>
    )
}