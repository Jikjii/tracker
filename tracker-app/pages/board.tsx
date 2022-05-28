import React, { useState, useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'
import { Row } from 'react-bootstrap'

import BoardSection from '../components/BoardSection'

const AllTasksQuery = gql`
    query {
        tasks {
            id
            title
            description
            status
        }
    }
`

const Board = () => {
    const { data, loading, error } = useQuery(AllTasksQuery, {
        onCompleted: data => {
            console.log(data)
        }
    })

    const sections: Array<String> = ['Backlog', 'In-Progress', 'Review', 'Done']

    if(loading) return <p>Loading...</p>
    if(error) return <p>Error</p>

    return (
        <div className="pt-3 h-100 d-flex flex-column">
            <Row>
                <h1>Project Title</h1>
            </Row>
            <div className="board-container d-flex flex-row flex-grow-1">
                <BoardSection
                    title='Backlog'
                    tasks={data.tasks}
                />
            </div>
        </div>
    )
}

export default Board