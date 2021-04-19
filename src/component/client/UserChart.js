import React from 'react'
import { Line } from 'react-chartjs-2'

const UserChart = ({ chartMode, period }) => {
    

    function getDate(std) {
        let year = std.getFullYear()
        let month = std.getMonth() + 1
        let day = std.getDate()

        year = String(year).slice(2)
        month = month >= 10 ? month : `0${month}`
        day = day >= 10 ? day : `0${day}`

        return `${year}년 ${month}월 ${day}일`
    }
    
    function getToday() {
        const date = new Date()

        return getDate(date)
    }

    function lastDays(day) {
        const date = new Date()
        const dayOfDate = date.getDate()

        date.setDate(dayOfDate - day)

        return getDate(date)
    }

    function lastWeeks(week) {
        const date = new Date()
        const dayOfDate = date.getDate()

        date.setDate(dayOfDate - week * 7)

        return getDate(date)
    }

    function lastMonths(month) {
        const date = new Date()
        const monthOfDate = date.getMonth()

        date.setMonth(monthOfDate - month)

        return getDate(date)
    }

    const dataLabels = () => {
        switch(period) {
            case 'day':
                return {labels : [
                    lastDays(5),
                    lastDays(4),
                    lastDays(3),
                    lastDays(2),
                    lastDays(1),
                    getToday()
                    ]
                }
            case 'week':
                return {labels : [
                    lastWeeks(5),
                    lastWeeks(4),
                    lastWeeks(3),
                    lastWeeks(2),
                    lastWeeks(1),
                    getToday()
                    ]
                }
            case 'month':
                return {labels : [
                    lastMonths(5),
                    lastMonths(4),
                    lastMonths(3),
                    lastMonths(2),
                    lastMonths(1),
                    getToday()
                    ]
                }
            default:
                break;
        }
    }

    return (
        <Line
            data={
                dataLabels
                // chartMode === 'rating' ? {labels : ['rat', 'ing']} : {labels: ['rank', 'ing']}
            }
            options={{ maintainAspectRatio: false }}
        />
    )
}

export default UserChart