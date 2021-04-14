import React from 'react'
import { Line } from 'react-chartjs-2'

const UserChart = () => {
    

    function getToday() {
        let today = new Date()

        let year = today.getFullYear()
        let month = today.getMonth() >= 10 ? today.getMonth() : `0${today.getMonth()}`
        let date = today.getDate() >= 10 ? today.getDate() : `0${today.getDate()}`

        return `${year}${month}${date}`
    }

    
    
    

    return (
        <Line
            data={{
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            }}
            options={{ maintainAspectRatio: false }}
        />
    )
}

export default UserChart